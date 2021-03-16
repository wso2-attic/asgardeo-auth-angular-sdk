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
import { Hooks } from "../models/asgardeo-spa.models";
import { AsgardeoAuthService } from "../services/asgardeo-auth.service";
import { AsgardeoNavigatorService } from "../services/asgardeo-navigator.service";

@Component({
    selector: "lib-asgardeo-sign-in-redirect",
    template: ""
})
export class AsgardeoSignInRedirectComponent implements OnInit {
    constructor(private auth: AsgardeoAuthService, private navigator: AsgardeoNavigatorService) { }

    ngOnInit(): void {
        this.auth.on(Hooks.SignIn, () => {
            this.navigator.navigateByUrl(this.navigator.getRedirectUrl());
        });

        this.auth.signIn();
    }
}
