/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
module.exports = {
    "root": true,
    "ignorePatterns": [
        "projects/**/*"
    ],
    "overrides": [{
        "files": [
            "*.ts"
        ],
        "parserOptions": {
            "project": [
                "tsconfig.json"
            ],
            "createDefaultProgram": true
        },
        "extends": [
            "plugin:@angular-eslint/ng-cli-compat",
            "plugin:@angular-eslint/ng-cli-compat--formatting-add-on",
            "plugin:@angular-eslint/template/process-inline-templates"
        ],
        "rules": {
            "@typescript-eslint/indent": [
                "error",
                4,
                {
                    "FunctionDeclaration": {
                        "parameters": "first"
                    },
                    "FunctionExpression": {
                        "parameters": "first"
                    },
                    "ObjectExpression": "first",
                    "MemberExpression": 1
                }
            ],
            "@typescript-eslint/quotes": [
                "error",
                "double"
            ],
            "@typescript-eslint/semi": ["error"],
            "@typescript-eslint/dot-notation": [
                "error",
                {
                    "allowPrivateClassPropertyAccess": true
                }
            ],
            "no-shadow": "off",
            "@typescript-eslint/no-shadow": ["error"]
        }
    },
    {
        "files": [
            "*.html"
        ],
        "extends": [
            "plugin:@angular-eslint/template/recommended"
        ],
        "rules": {}
    }
    ]
}
