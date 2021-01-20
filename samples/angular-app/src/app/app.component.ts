/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
    isAuthenticated: boolean;
    isConfigured: boolean;

    constructor(private auth: AsgardeoAuthService) {
        this.isConfigured = this.getClientIdStatus();
        this.isAuthenticated = this.getIsAuthenticated();
    }

    ngOnInit() {
        if (this.isAuthenticated) { this.auth.signIn(); }
    }

    getClientIdStatus() {
        if (authConfig.clientID === "") { this.isConfigured = false; }
        else { return true; }
    }

    getIsAuthenticated() {
        if (sessionStorage.getItem("isInitLogin") === "true") { return true; }
        else { return false; }
    }

    handleLogin() {
        this.auth.signIn().then(() => sessionStorage.setItem("isInitLogin", "true"));
    }

    handleLogout() {
        this.auth.signOut().then(() => sessionStorage.setItem("isInitLogin", "false"));
    }

    userInfo() {
        return this.auth.getUserInfo()["__zone_symbol__value"];
    }

    idToken() {
        return this.auth.getDecodedIDToken()["__zone_symbol__value"];
    }
}

