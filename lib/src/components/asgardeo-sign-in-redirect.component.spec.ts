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

import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { BasicUserInfo } from "../models/asgardeo-spa.models";
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
            signIn: () => Promise.resolve({} as BasicUserInfo),
            isAuthenticated: () => Promise.resolve(true)
        };

        navigatorServiceStub = {
            navigateByUrl: () => Promise.resolve(true),
            getRedirectUrl: () => "fakeRedirectUrl"
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

    it("should be created", () => {
        expect(component).toBeTruthy();
    });

    it("should call signIn", () => {
        const signInSpy = spyOn(authService, "signIn").and.resolveTo({ "username": "fakeUser" } as BasicUserInfo);

        fixture.detectChanges();

        expect(signInSpy).toHaveBeenCalled();
    });

    it("should redirect back after signIn resolves", fakeAsync(() => {
        const getRedirectUrlSpy = spyOn(navigatorService, "getRedirectUrl").and.returnValue("fakeRedirectUrl");
        const navigateByUrlSpy = spyOn(navigatorService, "navigateByUrl");
        spyOn(authService, "isAuthenticated").and.resolveTo(false);

        fixture.detectChanges();
        tick();

        expect(getRedirectUrlSpy).toHaveBeenCalled();
        expect(navigateByUrlSpy).toHaveBeenCalledWith("fakeRedirectUrl");
    }));
});
