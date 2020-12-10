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
import { IdentityClient } from "@asgardio/oidc-js";
import { ASGARDIO_CONFIG } from "../configs/asgardio-config";
import { AsgardioConfigInterface } from "../models/asgardio-config.interface";
import { AsgardioNavigatorService } from "./asgardio-navigator.service";

@Injectable({
    providedIn: "root"
})
export class AsgardioAuthService {
    private auth: IdentityClient;
    constructor(@Inject(ASGARDIO_CONFIG) config: AsgardioConfigInterface, private navigator: AsgardioNavigatorService) {
        if (config) {
            this.auth = IdentityClient.getInstance();
            this.auth.initialize(config)
                .then(() => console.log("Succesfully Initialized"))
                .catch(() => console.warn("Failed to Initialize"));
        }
    }

    signIn() {
        return this.auth.signIn();
    }

    signInWithRedirect(){
        localStorage.setItem("redirectUrl", this.navigator.getUrl());
        this.navigator.navigateByUrl("signin/redirect");
    }
}
