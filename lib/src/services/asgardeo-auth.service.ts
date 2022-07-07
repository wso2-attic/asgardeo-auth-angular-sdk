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

import { from, Observable, Subject } from "rxjs";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import {
    AsgardeoSPAClient,
    AuthClientConfig,
    SPAUtils,
    FetchResponse,
} from "@asgardeo/auth-spa";
import { ASGARDEO_CONFIG } from "../configs/asgardeo-config";
import { AuthAngularConfig, AuthStateInterface } from "../models";
import {
    BasicUserInfo,
    CustomGrantConfig,
    DecodedIDTokenPayload,
    Hooks,
    HttpRequestConfig,
    HttpResponse,
    OIDCEndpoints,
    SignInConfig
} from "../models/asgardeo-spa.models";
import { AsgardeoNavigatorService } from "./asgardeo-navigator.service";
import { AsgardeoAuthStateStoreService } from "./asgardeo-auth-state-store.service";
import { takeUntil } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class AsgardeoAuthService implements OnDestroy {
    public readonly state$ = this.stateStore.state$;
    private auth: AsgardeoSPAClient = AsgardeoSPAClient.getInstance();
    private readonly config: AuthClientConfig<AuthAngularConfig>;
    private subscriptionDestroyer$: Subject<boolean> = new Subject<boolean>();

    constructor(
        @Inject(ASGARDEO_CONFIG)
        private authConfig: AuthClientConfig<AuthAngularConfig>,
        private navigator: AsgardeoNavigatorService,
        private stateStore: AsgardeoAuthStateStoreService
    ) {
        this.config = authConfig;
        this.auth = AsgardeoSPAClient.getInstance();
        this.initializeHooks();
        (async (): Promise<void> => {
            await this.auth.initialize(this.authConfig);
            await this.handleSingleLogoutOnRedirect();
            this.handleAutoLogin()
                .pipe(takeUntil(this.subscriptionDestroyer$))
                .subscribe();
        })();
    }

    /**
     * Runs on service unmount.
     * @remarks Housekeeping logic such as un-subscribing should go here.
     */
    ngOnDestroy(): void {
        this.subscriptionDestroyer$.next(true);
        this.subscriptionDestroyer$.unsubscribe();
    }

    /**
     * Registering a sign-out hook clears user session data internally if there was a successful logout.
     */
    initializeHooks(): void {
        this.auth.on(Hooks.SignOut, ()=>{});
    }

    signIn(
        config?: SignInConfig,
        authorizationCode?: string,
        sessionState?: string
    ): Promise<BasicUserInfo> {
        this.stateStore.setIsLoading(true);

        return this.auth
            .signIn(config, authorizationCode, sessionState)
            .then(async (response: BasicUserInfo) => {
                if (!response) {
                    return;
                }

                if (await this.auth.isAuthenticated()) {
                    this.stateStore.state = {
                        allowedScopes: response.allowedScopes,
                        displayName: response.displayName,
                        email: response.email,
                        isAuthenticated: true,
                        isLoading: false,
                        sub: response.sub,
                        username: response.username
                    };
                }

                return response;
            })
            .catch((error) => Promise.reject(error))
            .finally(() => {
                this.stateStore.setIsLoading(false);
            });
    }

    signInWithRedirect(): Promise<boolean> {
        this.navigator.setRedirectUrl();
        const redirectRoute = this.navigator.getRouteWithoutParams(
            this.authConfig.signInRedirectURL
        );

        return this.navigator.navigateByUrl(redirectRoute);
    }

    signOut(): Promise<boolean> {
        this.stateStore.setIsLoading(true);

        return this.auth
            .signOut()
            .then((response: boolean) => {
                // Reset the state.
                this.stateStore.reset();

                return response;
            })
            .catch((error) => Promise.reject(error))
            .finally(() => {
                this.stateStore.setIsLoading(false);
            });
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
        return this.auth
            .revokeAccessToken()
            .then(() => {
                // Reset the state.
                this.stateStore.reset();

                return true;
            })
            .catch((error) => Promise.reject(error))
            .finally(() => {
                this.stateStore.setIsLoading(false);
            });
    }

    on(
        hook: Hooks,
        callback: (response?: any) => void,
        id?: string
    ): Promise<void> {
        if (hook === Hooks.CustomGrant) {
            return this.auth.on(hook, callback, id as string);
        }

        return this.auth.on(hook, callback);
    }

    requestCustomGrant(
        config: CustomGrantConfig
    ): Promise<FetchResponse<any> | BasicUserInfo> {
        return this.auth.requestCustomGrant(config);
    }

    httpRequest(config: HttpRequestConfig): Promise<HttpResponse<any>> {
        return this.auth.httpRequest(config);
    }

    httpRequestAll(config: HttpRequestConfig[]): Promise<HttpResponse<any>[]> {
        return this.auth.httpRequestAll(config);
    }

    /**
     * This method allows you to sign in silently.
     * First, this method sends a prompt none request to see if there is an active user session in the identity server.
     * If there is one, then it requests the access token and stores it. Else, it returns false.
     *
     * @return {Promise<BasicUserInfo | boolean>} - A Promise that resolves with the user information after signing in
     * or with `false` if the user is not signed in.
     *
     * @example
     *```
     * this.auth.trySignInSilently()
     *```
     */
    public trySignInSilently = async (): Promise<BasicUserInfo | boolean> => {
        this.stateStore.setIsLoading(true);

        return this.auth
            .trySignInSilently()
            .then(async (response: BasicUserInfo | boolean) => {
                if (!response) {
                    return false;
                }

                if (await this.auth.isAuthenticated()) {
                    const basicUserInfo: BasicUserInfo =
                        response as BasicUserInfo;

                    this.stateStore.state = {
                        allowedScopes: basicUserInfo.allowedScopes,
                        displayName: basicUserInfo.displayName,
                        email: basicUserInfo.email,
                        isAuthenticated: true,
                        isLoading: false,
                        sub: basicUserInfo.sub,
                        username: basicUserInfo.username
                    };
                }

                return response;
            })
            .catch((error) => Promise.reject(error))
            .finally(() => {
                this.stateStore.setIsLoading(false);
            });
    };

    /**
     * Handles auto login by trying to exchange tokens if auth params i.e `code` and `session_state` is
     * available in the URL or else, tries to silently login.
     *
     * @private
     * @return {Observable<BasicUserInfo | boolean>}
     */
    private handleAutoLogin(): Observable<BasicUserInfo | boolean> {
        this.stateStore.setIsLoading(true);

        // If `skipRedirectCallback` is not true, check if the URL has `code` and `session_state` params.
        // If so, initiate the sign in. If not, try to login silently.
        if (
            !this.config.skipRedirectCallback &&
            SPAUtils.hasAuthSearchParamsInURL()
        ) {
            return from(this.signIn());
        }

        // This uses the RP iframe to get the session. Hence, will not work if 3rd party cookies are disabled.
        // If the browser has these cookies disabled, we'll not be able to retrieve the session on refreshes.
        return from(this.trySignInSilently());
    }

    /**
     * Handles single logout if a prompt none sign in response is received with an error parameter on the URL.
     *
     * @private
     * @return {Promise<BasicUserInfo | void>}
     */
    private async handleSingleLogoutOnRedirect(): Promise<BasicUserInfo | void> {

        if (SPAUtils.hasErrorInURL()) {
            // The signIn method call will call receivePromptNoneResponse method internally to handle the prompt none
            // response in the single logout flow.
            return this.signIn({callOnlyOnRedirect: true});
        }
    }
}
