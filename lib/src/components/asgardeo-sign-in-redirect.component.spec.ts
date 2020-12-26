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

import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { AsgardeoAuthService } from "../services/asgardeo-auth.service";
import { AsgardeoNavigatorService } from "../services/asgardeo-navigator.service";
import { AsgardeoSignInRedirectComponent } from "./asgardeo-sign-in-redirect.component";

describe("AsgardeoSignInRedirectComponent", () => {
    let component: AsgardeoSignInRedirectComponent;
    let fixture: ComponentFixture<AsgardeoSignInRedirectComponent>;

    let authService: AsgardeoAuthService;
    let authServiceStub: Partial<AsgardeoAuthService>;

    let navigatorService: AsgardeoNavigatorService;
    let navigatorServiceStub: Partial<AsgardeoNavigatorService>;

    beforeEach(async () => {

        authServiceStub = {
            signIn: () => Promise.resolve(),
            isAuthenticated: () => true
        };

        navigatorServiceStub = {
            navigateByUrl: (params) => Promise.resolve(true)
        };

        await TestBed.configureTestingModule({
            declarations: [AsgardeoSignInRedirectComponent],
            providers: [
                {
                    provide: AsgardeoAuthService,
                    useValue: authServiceStub
                },
                {
                    provide: AsgardeoNavigatorService,
                    useValue: navigatorServiceStub
                }
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsgardeoSignInRedirectComponent);
        component = fixture.componentInstance;

        authService = TestBed.inject(AsgardeoAuthService);
        navigatorService = TestBed.inject(AsgardeoNavigatorService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should call signIn if the user is not authenticated", () => {
        const signInSpy = spyOn(authService, "signIn").and.resolveTo("fakeSignIn");
        spyOn(authService, "isAuthenticated").and.returnValue(false);

        fixture.detectChanges();

        expect(signInSpy).toHaveBeenCalled();
    });

    it("should redirect back after signIn resolves", fakeAsync(() => {
        const store = { redirectUrl: "fakeUrl" };
        const getItemSpy = spyOn(sessionStorage, "getItem").and.callFake((key) => store[key]);
        const navigateByURLSpy = spyOn(navigatorService, "navigateByUrl");
        spyOn(authService, "isAuthenticated").and.returnValue(false);

        fixture.detectChanges();
        tick();

        expect(getItemSpy).toHaveBeenCalled();
        expect(navigateByURLSpy).toHaveBeenCalledWith(sessionStorage.getItem("redirectUrl"));
    }));

    it("should redirect back if the user is authenticated", () => {
        const signInSpy = spyOn(authService, "signIn");
        const navigateByURLSpy = spyOn(navigatorService, "navigateByUrl");
        spyOn(authService, "isAuthenticated").and.returnValue(true);

        fixture.detectChanges();

        expect(signInSpy).not.toHaveBeenCalled();
        expect(navigateByURLSpy).toHaveBeenCalled();
    });
});
