import * as path from 'path';

import TSMonorepoJson from "../../config-file-structural-checking/config";
import { syncGenericJSON } from '../sync-generic.json.js';

export async function syncTSConfigLeavesJSON(leafPackages: Set<string>, configJSON: TSMonorepoJson) {
    const tsconfigLeaveJSONFilename = "tsconfig-leaves.json";
    const tsconfigLeavesJSON = {
        files: [],
        references: Array.from(leafPackages)
            .map(dependencyPackageName => ({path: configJSON.packageRoot + '/' + dependencyPackageName}))
    };

    const absoluteTSLeavesConfigJSONPath = path.resolve(".", tsconfigLeaveJSONFilename);
    await syncGenericJSON(absoluteTSLeavesConfigJSONPath, tsconfigLeaveJSONFilename, tsconfigLeavesJSON);
}