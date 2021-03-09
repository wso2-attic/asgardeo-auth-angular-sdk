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
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AsgardeoAuthService, Hooks, Method } from "@asgardeo/auth-angular";
import { Observable } from "rxjs";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    isAuthenticated = false;

    constructor(private auth: AsgardeoAuthService, private http: HttpClient) {
        this.auth.on(Hooks.SignOut, () => {
            console.log("You signed out!!!");
        });
    }

    ngOnInit() {
        this.auth.isAuthenticated().then((status) => {
            this.isAuthenticated = status;
        });
    }

    signIn(): void {
        this.auth.signInWithRedirect();
    }

    signOut(): void {
        this.auth.signOut();
    }

    /* eslint-disable */
    sendHTTPRequest(): Observable<any> {
        const url = "https://localhost:9443/scim2/Me";
        const httpOptions = {
            headers: new HttpHeaders({
                "Accept": "application/json",
                "Content-Type": "application/scim+json",
            })
        };
        return this.http.get(url, httpOptions);
    }

    /* eslint-disable */
    sendHTTPRequestWithSDK(): Promise<any> {
        const requestConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/scim+json",
            },
            method: "GET" as Method,
            url: "https://localhost:9443/scim2/Me"
        };
        return this.auth.httpRequest(requestConfig);
    }

    showHTTPResponse() {
        this.sendHTTPRequest().subscribe((response) => {
            console.log(response);
        });

        // this.sendHTTPRequestWithSDK().then((response) => {
        //     console.log(response);
        // });
    }
}
