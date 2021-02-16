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

import { Component, OnInit } from "@angular/core";
import { AsgardeoAuthService } from "@asgardeo/auth-angular";
import { default as authConfig } from "../config.json";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    isInitLogin: boolean;
    isConfigured: boolean;
    userInfo: any;
    idToken: any;

    constructor(private auth: AsgardeoAuthService) {
        this.isConfigured = this.getClientIdStatus();
        this.isInitLogin = this.getIsInitLogin();
    }

    ngOnInit() {
        if (this.isInitLogin) {
            this.auth.signIn().then(() => {
                this.auth.getBasicUserInfo().then((payload) => {
                    const username = payload?.username?.split('/');

                    if (username.length >= 2) {
                      username.shift();
                      payload.username = username.join('/');
                    }

                    this.userInfo = payload;
                });
                this.auth.getIDToken().then((payload) => this.idToken = this.parseIdToken(payload));
            });
        }
    }

    getClientIdStatus() {
        if (authConfig.clientID === "") {
            return false;
        }
        else {
            return true;
        }
    }

    getIsInitLogin() {
        if (this.checkForDeniedConsentError()) {
            return false;
        }
        else {
            if (sessionStorage.getItem("isInitLogin") === "true") {
                return true;
            }
            else {
                return false;
            }
        }
    }

    getQueryParams() {
        return new URLSearchParams(window.location.search);
    }

    checkForDeniedConsentError() {
        if (this.getQueryParams().get("error_description") === "User denied the consent") {
            return true;
        }
        return false;
    }

    handleLogin() {
        this.auth.signIn().then(() => sessionStorage.setItem("isInitLogin", "true"));
    }

    handleLogout() {
        this.auth.signOut().then(() => sessionStorage.setItem("isInitLogin", "false"));
    }

    parseIdToken(idToken: string) {
        if (!idToken) {
          return;
        }

        if (typeof idToken !== 'string') {
          idToken = JSON.stringify(idToken);
        }

        const idTokenSplit = idToken.split('.');
        const idTokenObject = {
          encoded: [],
          decoded: [],
        };

        idTokenSplit.forEach((element) => {
          idTokenObject.encoded.push(element);
        });

        idTokenObject.decoded.push(JSON.parse(atob(idTokenObject.encoded[0])));
        idTokenObject.decoded.push(JSON.parse(atob(idTokenObject.encoded[1])));

        const sub =
          idTokenObject['decoded'][1] &&
          idTokenObject['decoded'][1]?.sub?.split('/');

        if (sub.length >= 2) {
          sub.shift();
          idTokenObject['decoded'][1].sub = sub.join('/');
        }

        const groups = [];
        idTokenObject['decoded'][1] &&
          idTokenObject['decoded'][1]?.groups?.forEach((group) => {
            const groupArrays = group.split('/');

            if (groupArrays.length >= 2) {
              groupArrays.shift();
              groups.push(groupArrays.join('/'));
            } else {
              groups.push(group);
            }
          });

        if (idTokenObject['decoded'][1]?.groups) {
          idTokenObject['decoded'][1].groups = groups;
        }

        return idTokenObject;
    }
}
