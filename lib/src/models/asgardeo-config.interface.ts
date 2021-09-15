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

import { AuthClientConfig, Config, SPAConfig } from "@asgardeo/auth-spa";

/**
 * SDK client config parameters
 */
export type AsgardeoConfigInterface = AuthClientConfig<Config>;

export interface AuthAngularConfig extends SPAConfig {
    /**
     * The SDK's `AuthProvider` by default is listening to the URL changes to see
     * if `code` & `session_state` search params are available so that it could perform
     * token exchange. This option could be used to override that behaviour.
     */
    skipRedirectCallback?: boolean;
}

export interface AuthStateInterface {
    /**
     * Scopes in the Token.
     */
    allowedScopes: string;
    /**
     * Displayname.
     */
    displayName?: string;
    /**
     * User's email.
     */
    email?: string;
    /**
     * Authenticated state.
     */
    isAuthenticated: boolean;
    /**
     * Are the Auth requests loading.
     */
    isLoading: boolean;
    /**
     * Username.
     */
    username: string;
}
