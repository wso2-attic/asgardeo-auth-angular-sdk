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

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { ASGARDEO_CONFIG } from "../configs/asgardeo-config";
import { AsgardeoConfigInterface } from "../models/asgardeo-config.interface";
import { AsgardeoAuthService } from "../services/asgardeo-auth.service";

@Injectable()
export class AsgardeoAuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AsgardeoAuthService,
        @Inject(ASGARDEO_CONFIG) private authConfig: AsgardeoConfigInterface) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.canAttachToken(request)) {
            return this.auth.getAccessToken()
                .pipe(
                    mergeMap(token => {
                        if (token) {
                            const header = "Bearer " + token;
                            const headers = request.headers.set("Authorization", header);
                            request = request.clone({ headers });
                        }
                        return next.handle(request);
                    }),
                    catchError(_ => next.handle(request)),
                );
        }
        else {
            return next.handle(request);
        }
    }

    private canAttachToken(request: HttpRequest<any>): boolean {
        const url = request.url;
        if (url.startsWith(this.authConfig.serverOrigin)) {
            return true;
        }
        else {
            return false;
        }
    }
}
