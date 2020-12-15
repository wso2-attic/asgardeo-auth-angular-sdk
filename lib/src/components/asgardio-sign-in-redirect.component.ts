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
import { AsgardioAuthService } from "../services/asgardio-auth.service";
import { AsgardioNavigatorService } from "../services/asgardio-navigator.service";

@Component({
    selector: "lib-asgardio-sign-in-redirect",
    template: ""
})
export class AsgardioSignInRedirectComponent implements OnInit {

    constructor(private auth: AsgardioAuthService, private navigator: AsgardioNavigatorService) { }

    ngOnInit(): void {
        if (!this.auth.isAuthenticated) {
            this.auth.signIn().then(() => this.navigator.navigateByUrl(localStorage.getItem("redirectUrl")));
        }
        else {
            this.navigator.navigateByUrl(localStorage.getItem("redirectUrl"));
        }
    }
}
