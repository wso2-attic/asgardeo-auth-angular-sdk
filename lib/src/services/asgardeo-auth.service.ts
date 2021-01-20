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

import { Inject, Injectable } from "@angular/core";
import { AsgardeoSPAClient, BasicUserInfo, DecodedIDTokenPayload, Hooks, OIDCEndpoints } from "@asgardeo/auth-spa";
import { ASGARDEO_CONFIG } from "../configs/asgardeo-config";
import { AsgardeoConfigInterface } from "../models/asgardeo-config.interface";
import { AsgardeoNavigatorService } from "./asgardeo-navigator.service";

@Injectable({
    providedIn: "root"
})
export class AsgardeoAuthService {
    private signInRedirectUrl: string;

    constructor(
        @Inject(ASGARDEO_CONFIG) authConfig: AsgardeoConfigInterface,
        private navigator: AsgardeoNavigatorService,
        private auth: AsgardeoSPAClient) {
        this.auth.initialize(authConfig)
            .then(() => this.signInRedirectUrl = navigator.getRouteWithoutParams(authConfig.signInRedirectURL))
            .catch((error) => console.warn("Failed to Initialize - " + error));

        this.auth.on(Hooks.SignIn, () => {
            sessionStorage.setItem("isAuthenticated", "true");
        });

        this.auth.on(Hooks.SignOut, () => {
            sessionStorage.setItem("isAuthenticated", "false");
        });
    }

    getBasicUserInfo(): Promise<BasicUserInfo> {
        return this.auth.getBasicUserInfo();
    }

    signIn(): Promise<any> {
        return this.auth.signIn();
    }

    signInWithRedirect(): Promise<boolean> {
        this.navigator.setRedirectUrl();
        return this.navigator.navigateByUrl(this.signInRedirectUrl);
    }

    signOut(): Promise<any> {
        return this.auth.signOut();
    }

    revokeAccessToken(): Promise<boolean> {
        return this.auth.revokeAccessToken();
    }

    getOIDCServiceEndpoints(): Promise<OIDCEndpoints> {
        return this.auth.getOIDCServiceEndpoints();
    }

    getDecodedIDToken(): Promise<DecodedIDTokenPayload> {
        return this.auth.getDecodedIDToken();
    }

    getAccessToken(): Promise<string> {
        return this.auth.getAccessToken();
    }

    refreshAccessToken(): Promise<BasicUserInfo> {
        return this.auth.refreshAccessToken();
    }

    isAuthenticated(): Promise<boolean> {
        return this.auth.isAuthenticated();
    }
}
