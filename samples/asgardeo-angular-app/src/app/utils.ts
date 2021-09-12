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
 */

/**
 * Parsed ID Token Interface.
 */
export interface ParsedIDTokenInterface {
    encoded: string[] | any;
    decoded: {
        sub: string;
        groups: string[];
    }[];
}

/**
 * Parses the ID token.
 *
 * @param {string} idToken - ID token as a string.
 * @return {ParsedIDTokenInterface}
 */
export const parseIdToken = (idToken: string): ParsedIDTokenInterface => {

    if (!idToken) {
        return;
    }

    if (typeof idToken !== "string") {
        idToken = JSON.stringify(idToken);
    }

    const idTokenSplitPartials: string[] = idToken.split(".");
    const parsedIdToken: ParsedIDTokenInterface = {
        encoded: [],
        decoded: []
    };

    idTokenSplitPartials.forEach((element: string) => {
        parsedIdToken.encoded.push(element);
    });

    parsedIdToken.decoded.push(JSON.parse(atob(parsedIdToken.encoded[0])));
    parsedIdToken.decoded.push(JSON.parse(atob(parsedIdToken.encoded[1])));

    const sub: string[] = parsedIdToken["decoded"][1] &&
        parsedIdToken["decoded"][1]?.sub?.split('/');

    if (sub.length >= 2) {
        sub.shift();
        parsedIdToken["decoded"][1].sub = sub.join('/');
    }

    const groups: string[] = [];

    parsedIdToken["decoded"][1] && parsedIdToken["decoded"][1]?.groups?.forEach((group) => {
        const groupArrays = group.split('/');

        if (groupArrays.length >= 2) {
            groupArrays.shift();
            groups.push(groupArrays.join('/'));
        } else {
            groups.push(group);
        }
    });

    if (parsedIdToken["decoded"][1]?.groups) {
        parsedIdToken["decoded"][1].groups = groups;
    }

    return parsedIdToken;
}
