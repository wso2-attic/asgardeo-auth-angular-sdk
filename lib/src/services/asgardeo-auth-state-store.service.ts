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

import { Injectable } from "@angular/core";
import { AuthStateInterface } from "../models";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AsgardeoAuthStateStoreService {

    private DEFAULT_STATE: AuthStateInterface = {
        allowedScopes: "",
        displayName: "",
        email: "",
        isAuthenticated: false,
        isLoading: true,
        sub: "",
        username: ""
    };

    // Readonly State BehaviorSubject. Not accessible from outside.
    private readonly _state = new BehaviorSubject<AuthStateInterface>(this.DEFAULT_STATE);

    // Outside can access this readonly state object by subscribing.
    readonly state$ = this._state.asObservable();

    /**
     * Getter for the state.
     * @return {AuthStateInterface}
     */
    public get state(): AuthStateInterface {

        return this._state.getValue();
    }

    /**
     * Setter for the state.
     * @param {AuthStateInterface} newState - New state.
     */
    public set state(newState: AuthStateInterface) {
        this._state.next({
            ...this._state,
            ...newState
        });
    }

    /**
     * Set the Loading state.
     * @param {boolean} isLoading - State.
     */
    public setIsLoading(isLoading: boolean): void {
        this._state.next({
            ...this.state,
            isLoading
        });
    }

    /**
     * Resets the state back to the default.
     */
    public reset(): void {
        this._state.next(this.DEFAULT_STATE)
    }
}
