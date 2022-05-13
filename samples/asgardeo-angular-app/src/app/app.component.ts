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
import {
    AsgardeoAuthService,
    AuthStateInterface,
    BasicUserInfo,
    Hooks
} from "@asgardeo/auth-angular";
import { default as authConfig } from "../config.json";
import { Observable } from "rxjs";
import { ParsedIDTokenInterface, parseIdToken } from "./utils";
import { ActivatedRoute } from "@angular/router";
import {
    AUTHENTICATION_FAILURE_DESCRIPTION,
    AUTHENTICATION_FAILURE_TITLE,
    USER_DENIED_LOGOUT,
} from "./constants/errors";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: [ "./app.component.css" ]
})
export class AppComponent implements OnInit {

    public isClientIDConfigured = !!authConfig.clientID;
    public userInfo: BasicUserInfo;
    public parsedIDToken: ParsedIDTokenInterface;
    public hasErrors: boolean;
    public state$: Observable<AuthStateInterface>;
    public hasLogoutRequestDeniedError = false;
    public hasAuthenticationFailure = false;
    public stateParam: string;
    public errorDescParam: string;
    public logoutRequestDeniedErrorMessage: string;
    public authenticationFailureErrorTitle: string;
    public authenticationFailureErrorDescription: string;

    constructor(private auth: AsgardeoAuthService, private route: ActivatedRoute) {
        this.logoutRequestDeniedErrorMessage = USER_DENIED_LOGOUT;
        this.authenticationFailureErrorTitle = AUTHENTICATION_FAILURE_TITLE;
        this.authenticationFailureErrorDescription = AUTHENTICATION_FAILURE_DESCRIPTION;
        this.route.queryParams.subscribe(params => {
            this.stateParam = params?.state;
            this.errorDescParam = params?.error_description;

            if(this.stateParam && this.errorDescParam) {
                if(this.errorDescParam === "End User denied the logout request") {
                    this.hasLogoutRequestDeniedError = true;
                } else {
                    this.hasAuthenticationFailure = true;
                }
            }
        });
    }

    ngOnInit() {
        this.state$ = this.auth.state$;

        this.auth.state$
            .subscribe(
                (state: AuthStateInterface) => {
                    if (state.isAuthenticated) {
                        this.auth.getBasicUserInfo()
                            .then((user: BasicUserInfo) => {
                                const username: string[] = user?.username?.split("/");

                                if (username) {
                                    if (username.length >= 2) {
                                        username.shift();
                                        user.username = username.join("/");
                                    }

                                    this.userInfo = user;
                                }
                            });

                        this.auth.getIDToken()
                            .then((payload: string) => {
                                this.parsedIDToken = parseIdToken(payload);
                            });
                    }
                },
                (_: Error) => {
                    this.hasErrors = true;
                }
            );

        this.auth.on(Hooks.SignOut, () => {
            this.hasLogoutRequestDeniedError = false;
        });
    }

    handleLogin() {
        this.hasLogoutRequestDeniedError = false;
        this.auth.signIn();
    }

    handleLogout() {
        this.auth.signOut();
    }
}
