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

import { TestBed } from "@angular/core/testing";
import { AsgardeoAuthService } from "../services/asgardeo-auth.service";
import { AsgardeoAuthGuard } from "./asgardeo-auth.guard";

describe("AsgardeoAuthGuard", () => {
    let guard: AsgardeoAuthGuard;

    let authService: AsgardeoAuthService;
    let authServiceStub: Partial<AsgardeoAuthService>;

    beforeEach(() => {
        authServiceStub = {
            isAuthenticated: () => Promise.resolve(true)
        };

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AsgardeoAuthService,
                    useValue: authServiceStub
                }
            ]
        });
        guard = TestBed.inject(AsgardeoAuthGuard);
        authService = TestBed.inject(AsgardeoAuthService);
    });

    it("should be created", () => {
        expect(guard).toBeTruthy();
    });

    it("should return false when canActivate is called if the user is not authenticated ", (async () => {
        spyOn(authService, "isAuthenticated").and.resolveTo(false);

        const result = await guard.canActivate();

        expect(result).toBeFalse();
    }));


    it("should return true when canActivate is called if the user is not authenticated ", (async () => {
        spyOn(authService, "isAuthenticated").and.resolveTo(true);

        const result = await guard.canActivate();

        expect(result).toBeTrue();
    }));

    it("should return false when canActivateChild is called if the user is not authenticated ", (async () => {
        spyOn(authService, "isAuthenticated").and.resolveTo(false);

        const result = await guard.canActivateChild();

        expect(result).toBeFalse();
    }));

    it("should return true when canActivateChild is called if the user is not authenticated ", (async () => {
        spyOn(authService, "isAuthenticated").and.resolveTo(true);

        const result = await guard.canActivateChild();

        expect(result).toBeTrue();
    }));
});
