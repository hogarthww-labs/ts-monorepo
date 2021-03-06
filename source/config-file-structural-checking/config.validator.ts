/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import TSMonorepoJson from './config';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {TSMonorepoJson};
export const TSMonorepoJsonSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "defaultProperties": [
  ],
  "definitions": {
    "PackageConfig": {
      "defaultProperties": [
      ],
      "properties": {
        "extends": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "files": {
          "defaultProperties": [
          ],
          "properties": {
            "edn": {
              "defaultProperties": [
              ],
              "properties": {
                "clojure.edn": {
                }
              },
              "type": "object"
            },
            "ini": {
              "properties": {
              },
              "type": "object"
            },
            "json": {
              "defaultProperties": [
              ],
              "properties": {
                "package.json": {
                  "$ref": "#/definitions/PackageJSON"
                },
                "tsconfig.json": {
                  "$ref": "#/definitions/TSConfigJSON"
                }
              },
              "type": "object"
            },
            "mod": {
              "defaultProperties": [
              ],
              "properties": {
                "go.mod": {
                }
              },
              "type": "object"
            },
            "toml": {
              "defaultProperties": [
              ],
              "properties": {
                "cargo.toml": {
                }
              },
              "type": "object"
            },
            "xml": {
              "defaultProperties": [
              ],
              "properties": {
                "nuget.config": {
                },
                "pom.xml": {
                }
              },
              "type": "object"
            },
            "yaml": {
              "properties": {
              },
              "type": "object"
            }
          },
          "type": "object"
        },
        "package": {
          "enum": [
            true
          ],
          "type": "boolean"
        },
        "skoville": {
          "defaultProperties": [
          ],
          "properties": {
            "autoRestart": {
              "type": "boolean"
            },
            "entry": {
              "type": "string"
            },
            "hot": {
              "type": "boolean"
            },
            "serverAt": {
              "type": "string"
            }
          },
          "required": [
            "autoRestart",
            "hot",
            "serverAt"
          ],
          "type": "object"
        }
      },
      "required": [
        "extends",
        "files",
        "package"
      ],
      "type": "object"
    },
    "PackageConfigJunction": {
      "additionalProperties": {
        "anyOf": [
          {
            "$ref": "#/definitions/PackageConfigJunction"
          },
          {
            "$ref": "#/definitions/PackageConfig"
          }
        ]
      },
      "defaultProperties": [
      ],
      "type": "object"
    },
    "PackageJSON": {
      "defaultProperties": [
      ],
      "properties": {
        "dependencies": {
          "items": {
            "anyOf": [
              {
                "additionalItems": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "string"
                    }
                  ]
                },
                "items": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "string"
                  }
                ],
                "minItems": 2,
                "type": "array"
              },
              {
                "type": "string"
              }
            ]
          },
          "type": "array"
        },
        "devDependencies": {
          "items": {
            "anyOf": [
              {
                "additionalItems": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "string"
                    }
                  ]
                },
                "items": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "string"
                  }
                ],
                "minItems": 2,
                "type": "array"
              },
              {
                "type": "string"
              }
            ]
          },
          "type": "array"
        },
        "optionalDependencies": {
          "items": {
            "anyOf": [
              {
                "additionalItems": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "string"
                    }
                  ]
                },
                "items": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "string"
                  }
                ],
                "minItems": 2,
                "type": "array"
              },
              {
                "type": "string"
              }
            ]
          },
          "type": "array"
        },
        "peerDependencies": {
          "items": {
            "anyOf": [
              {
                "additionalItems": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "string"
                    }
                  ]
                },
                "items": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "string"
                  }
                ],
                "minItems": 2,
                "type": "array"
              },
              {
                "type": "string"
              }
            ]
          },
          "type": "array"
        }
      },
      "type": "object"
    },
    "TSConfigJSON": {
      "defaultProperties": [
      ],
      "properties": {
        "compilerOptions": {
          "defaultProperties": [
          ],
          "properties": {
            "outDir": {
              "type": "string"
            }
          },
          "type": "object"
        }
      },
      "type": "object"
    }
  },
  "properties": {
    "cleanBeforeCompile": {
      "type": "boolean"
    },
    "defaultSubPackageDelimiter": {
      "type": "string"
    },
    "packages": {
      "additionalProperties": {
        "additionalProperties": {
          "anyOf": [
            {
              "$ref": "#/definitions/PackageConfigJunction"
            },
            {
              "$ref": "#/definitions/PackageConfig"
            }
          ]
        },
        "defaultProperties": [
        ],
        "type": "object"
      },
      "defaultProperties": [
      ],
      "type": "object"
    },
    "templates": {
      "additionalProperties": {
        "$ref": "#/definitions/PackageConfig"
      },
      "defaultProperties": [
      ],
      "type": "object"
    },
    "ttypescript": {
      "type": "boolean"
    },
    "version": {
      "type": "string"
    }
  },
  "required": [
    "cleanBeforeCompile",
    "packages",
    "templates",
    "ttypescript",
    "version"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
const rawValidateTSMonorepoJson = ajv.compile(TSMonorepoJsonSchema) as ValidateFunction<TSMonorepoJson>;
export default function validate(value: unknown): TSMonorepoJson {
  if (rawValidateTSMonorepoJson(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(rawValidateTSMonorepoJson.errors, {dataVar: 'TSMonorepoJson'}) +
      '\n\n' +
      inspect(value),
    );
  }
}