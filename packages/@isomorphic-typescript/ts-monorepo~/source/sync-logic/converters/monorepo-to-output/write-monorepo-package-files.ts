import * as path from 'path';
import { MonorepoPackage } from "../../../common/types/monorepo-package";
import { writeJsonAndReportChanges } from "../../writers/json";
import { monorepoPackageToPackageJsonOutput } from './files/package.json';
import { monorepoPakcageToTSConfigJsonOutput } from './files/tsconfig.json';
import { assertDirectoryExistsOrCreate } from '../../../file-system/presence-assertions';
import { ConfigError } from '../../../common/errors';
import { TS_CONFIG_JSON_OUT_DIR, TS_CONFIG_JSON_ROOT_DIR, PACKAGE_JSON_FILENAME, TS_CONFIG_JSON_FILENAME, SUCCESS, Success } from '../../../common/constants';
import * as fs from 'fs';
import { MonorepoPackageRegistry } from '../../../package-dependency-logic/monorepo-package-registry';
import { CachedLatestVersionFetcher } from '../../cached-latest-version-fetcher';
import * as taskEither from 'fp-ts/lib/TaskEither';
import { right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import * as array from 'fp-ts/lib/Array';
import { taskEithercoalesceConfigErrors } from '../../error-coalesce';



export function writeMonorepoPackageFiles(monorepoPackage: MonorepoPackage, monorepoPackageRegistry: MonorepoPackageRegistry,
    latestVersionGetter: CachedLatestVersionFetcher): taskEither.TaskEither<ConfigError[], Success> {
    return pipe(
        [
            assertDirectoryExistsOrCreate(path.join(monorepoPackage.relativePath, TS_CONFIG_JSON_OUT_DIR)),
            assertDirectoryExistsOrCreate(path.join(monorepoPackage.relativePath, TS_CONFIG_JSON_ROOT_DIR))
        ],
        taskEithercoalesceConfigErrors,
        taskEither.chain(() => pipe(
            Object.entries(monorepoPackage.config.files.json), // TODO: support other file types.
            array.map(([jsonFilename, jsonObject]) => {
                // Write templated config files
                const pathToFile = path.join(monorepoPackage.relativePath, jsonFilename);
                const outputObjectTaskEither = 
                    jsonFilename === PACKAGE_JSON_FILENAME ? monorepoPackageToPackageJsonOutput(monorepoPackage, monorepoPackageRegistry, latestVersionGetter) :
                    jsonFilename === TS_CONFIG_JSON_FILENAME ? taskEither.right(monorepoPakcageToTSConfigJsonOutput(monorepoPackage)) :
                    taskEither.right(jsonObject);
                return pipe(
                    outputObjectTaskEither,
                    taskEither.chain(outputObject => writeJsonAndReportChanges(pathToFile, outputObject)),
                    taskEither.chain(outputJsonString => async () => {
                        // By default we copy package.json over to the build folder, for other files, the user will need to explicitly set this in the config.
                        if (jsonFilename === PACKAGE_JSON_FILENAME) {
                            await fs.promises.writeFile(path.resolve(monorepoPackage.relativePath, TS_CONFIG_JSON_OUT_DIR, PACKAGE_JSON_FILENAME), outputJsonString);
                        }
                        return right(SUCCESS);
                    })
                );
            }),
            taskEithercoalesceConfigErrors
        ))
    );
}