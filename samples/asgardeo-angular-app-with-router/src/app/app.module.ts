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
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { JsonFormatterComponent } from "./json-formatter/json-formatter.component";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent,
        JsonFormatterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AsgardeoAuthModule.forRoot(authConfig as AsgardeoConfigInterface)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
