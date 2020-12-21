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

import { ModuleWithProviders, NgModule } from "@angular/core";
import { AsgardioSignInRedirectComponent } from "./components/asgardio-sign-in-redirect.component";
import { ASGARDIO_CONFIG } from "./configs/asgardio-config";
import { AsgardioAuthGuard } from "./guards/asgardio-auth.guard";
import { AsgardioConfigInterface } from "./models/asgardio-config.interface";
import { AsgardioAuthService } from "./services/asgardio-auth.service";

@NgModule({
    declarations: [AsgardioSignInRedirectComponent]
})
export class AsgardioAuthModule {
    static forRoot(config?: AsgardioConfigInterface): ModuleWithProviders<AsgardioAuthModule> {
        return {
            ngModule: AsgardioAuthModule,
            providers: [
                AsgardioAuthService,
                AsgardioAuthGuard,
                {
                    provide: ASGARDIO_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
