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

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AsgardeoAuthModule, AsgardeoConfigInterface } from "@asgardeo/auth-angular";
import { default as authConfig } from "../config.json";
import { AppComponent } from "./app.component";
import { JsonFormatterComponent } from "./json-formatter/json-formatter.component";

@NgModule({
    declarations: [
        AppComponent,
        JsonFormatterComponent
    ],
    imports: [
        BrowserModule,
        AsgardeoAuthModule.forRoot(authConfig as AsgardeoConfigInterface)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
