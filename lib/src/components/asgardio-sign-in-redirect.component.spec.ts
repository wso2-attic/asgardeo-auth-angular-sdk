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
import { AsgardioAuthService } from "../services/asgardio-auth.service";
import { AsgardioNavigatorService } from "../services/asgardio-navigator.service";
import { AsgardioSignInRedirectComponent } from "./asgardio-sign-in-redirect.component";

describe("AsgardioSignInRedirectComponent", () => {
    let component: AsgardioSignInRedirectComponent;
    let fixture: ComponentFixture<AsgardioSignInRedirectComponent>;

    let authService: AsgardioAuthService;
    let authServiceStub: Partial<AsgardioAuthService>;

    let navigatorService: AsgardioNavigatorService;
    let navigatorServiceStub: Partial<AsgardioNavigatorService>;

    beforeEach(async () => {

        authServiceStub = {
            signIn() {
                return Promise.resolve();
            }
        };

        navigatorServiceStub = {
            navigateByUrl(params) {
                return Promise.resolve(true);
            }
        };

        await TestBed.configureTestingModule({
            declarations: [AsgardioSignInRedirectComponent],
            providers: [
                {
                    provide: AsgardioAuthService,
                    useValue: authServiceStub
                },
                {
                    provide: AsgardioNavigatorService,
                    useValue: navigatorServiceStub
                }
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsgardioSignInRedirectComponent);
        component = fixture.componentInstance;

        authService = TestBed.inject(AsgardioAuthService);
        navigatorService = TestBed.inject(AsgardioNavigatorService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should call sign in and redirect back if user is not authenticated", fakeAsync(() => {
        let signInSpy = spyOn(authService, "signIn").and.resolveTo("fakeSignIn");
        let spyNavigateByURL = spyOn(navigatorService, "navigateByUrl");

        authService.isAuthenticated = false;
        fixture.detectChanges();
        tick();

        expect(signInSpy).toHaveBeenCalled();
        expect(spyNavigateByURL).toHaveBeenCalled();
    }));

    it("should redirect back if the user is authenticated", () => {
        let signInSpy = spyOn(authService, "signIn");
        let spyNavigateByURL = spyOn(navigatorService, "navigateByUrl");

        authService.isAuthenticated = true;
        fixture.detectChanges();

        expect(signInSpy).not.toHaveBeenCalled();
        expect(spyNavigateByURL).toHaveBeenCalled();
    });
});
