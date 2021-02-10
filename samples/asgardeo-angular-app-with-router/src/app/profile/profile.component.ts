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

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
    isAuthenticated: boolean;
    userInfo: any;
    idToken: any;

    constructor(private auth: AsgardeoAuthService) { }

    ngOnInit() {
        this.auth.isAuthenticated().then((payload) => {
            this.isAuthenticated = payload;
            if (this.isAuthenticated) {
                this.getUserInfo();
                this.getIdToken();
            }
        });
    }

    getUserInfo() {
        this.auth.getBasicUserInfo().then((payload) => this.userInfo = payload);
    }

    getIdToken() {
        this.auth.getIDToken().then((payload) => this.idToken = this.parseIdToken(payload));
    }

    parseIdToken(idToken: string) {
        if (!idToken) {
            return;
        }

        if (typeof idToken !== "string") {
            idToken = JSON.stringify(idToken);
        }

        const idTokenSplit = idToken.split(".");
        const idTokenObject = {
            encoded: [],
            decoded: []
        };

        idTokenSplit.forEach((element) => {
            idTokenObject.encoded.push(element);
        });

        idTokenObject.decoded.push(JSON.parse(atob(idTokenObject.encoded[0])));
        idTokenObject.decoded.push(JSON.parse(atob(idTokenObject.encoded[1])));

        return idTokenObject;
    }
}
