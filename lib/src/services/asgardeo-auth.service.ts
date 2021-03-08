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

import { Inject, Injectable } from "@angular/core";
import { AsgardeoSPAClient } from "@asgardeo/auth-spa";
import { ASGARDEO_CONFIG } from "../configs/asgardeo-config";
import { AsgardeoConfigInterface } from "../models/asgardeo-config.interface";
import {
    BasicUserInfo,
    CustomGrantConfig,
    DecodedIDTokenPayload,
    Hooks,
    HttpResponse,
    OIDCEndpoints,
    SignInConfig
} from "../models/asgardeo-spa.models";
import { AsgardeoNavigatorService } from "./asgardeo-navigator.service";

@Injectable({
    providedIn: "root"
})
export class AsgardeoAuthService {
    private auth: AsgardeoSPAClient;

    constructor(
        @Inject(ASGARDEO_CONFIG) private authConfig: AsgardeoConfigInterface,
        private navigator: AsgardeoNavigatorService) {
        this.intializeSPAClient();
    }

    signIn(
        config?: SignInConfig,
        authorizationCode?: string,
        sessionState?: string) {
        return this.auth.signIn(config, authorizationCode, sessionState);
    };

    signInWithRedirect(): Promise<boolean> {
        this.navigator.setRedirectUrl();
        const redirectRoute = this.navigator.getRouteWithoutParams(this.authConfig.signInRedirectURL);
        return this.navigator.navigateByUrl(redirectRoute);
    }

    signOut(): Promise<boolean> {
        return this.auth.signOut();
    }

    isAuthenticated(): Promise<boolean> {
        return this.auth.isAuthenticated();
    }

    getBasicUserInfo(): Promise<BasicUserInfo> {
        return this.auth.getBasicUserInfo();
    }

    getAccessToken(): Promise<string> {
        return this.auth.getAccessToken();
    }

    getIDToken(): Promise<string> {
        return this.auth.getIDToken();
    }

    getDecodedIDToken(): Promise<DecodedIDTokenPayload> {
        return this.auth.getDecodedIDToken();
    }

    getOIDCServiceEndpoints(): Promise<OIDCEndpoints> {
        return this.auth.getOIDCServiceEndpoints();
    }

    refreshAccessToken(): Promise<BasicUserInfo> {
        return this.auth.refreshAccessToken();
    }

    revokeAccessToken(): Promise<boolean> {
        return this.auth.revokeAccessToken();
    }

    on(hook: Hooks, callback: (response?: any) => void, id: string): Promise<void> {
        if (hook === Hooks.CustomGrant) {
            return this.auth.on(hook, callback, id);
        }
        return this.auth.on(hook, callback);
    };

    requestCustomGrant(config: CustomGrantConfig): Promise<HttpResponse<any> | BasicUserInfo> {
        return this.auth.requestCustomGrant(config);
    };

    private intializeSPAClient() {
        this.auth = AsgardeoSPAClient.getInstance();
        this.auth.initialize(this.authConfig);
    }
}
