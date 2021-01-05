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

import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ASGARDEO_CONFIG } from "../configs/asgardeo-config";
import { AsgardeoConfigInterface } from "../models/asgardeo-config.interface";
import { AsgardeoAuthService } from "./asgardeo-auth.service";
import { AsgardeoNavigatorService } from "./asgardeo-navigator.service";

describe("AsgardeoAuthService", () => {
    let service: AsgardeoAuthService;
    let config: AsgardeoConfigInterface;

    let navigatorService: AsgardeoNavigatorService;
    let navigatorServiceStub: Partial<AsgardeoNavigatorService>;

    beforeEach(() => {

        navigatorServiceStub = {
            navigateByUrl: (params) => Promise.resolve(true),
            setRedirectUrl: () => "",
            getCurrentRoute: () => "fakeUrl"
        };

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ASGARDEO_CONFIG,
                    useValue: {}
                },
                {
                    provide: AsgardeoNavigatorService,
                    useValue: navigatorServiceStub
                }
            ]
        });

        service = TestBed.inject(AsgardeoAuthService);
        config = TestBed.inject(ASGARDEO_CONFIG);
        navigatorService = TestBed.inject(AsgardeoNavigatorService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
        expect(service["auth"]).toBeDefined();
    });

    it("should catch when auth.initialize throws an error", fakeAsync(() => {
        const initializeSpy = spyOn(service["auth"], "initialize").and.returnValue(Promise.reject("fakeReject"));

        new AsgardeoAuthService(config, navigatorService);

        tick();
        expect(initializeSpy).toHaveBeenCalled();
        expect(service).toBeTruthy();
    }));

    it("should call auth.signIn when signIn is called", () => {
        const signInSpy = spyOn(service["auth"], "signIn");

        service.signIn();

        expect(signInSpy).toHaveBeenCalled();
    });

    it("should navigate the user to signInRedirect component when signInWithRedirect is called", () => {
        const navigateByURLSpy = spyOn(navigatorService, "navigateByUrl");

        service.signInWithRedirect();

        expect(navigateByURLSpy).toHaveBeenCalled();
    });

    it("should store the url in session storage when signInWithRedirect is called", () => {
        const navigateByURLSpy = spyOn(navigatorService, "setRedirectUrl");

        service.signInWithRedirect();

        expect(navigateByURLSpy).toHaveBeenCalled();
    });

    it("should call auth.signOut when signOut is called", () => {
        const signOutSpy = spyOn(service["auth"], "signOut");

        service.signOut();

        expect(signOutSpy).toHaveBeenCalled();
    });

    it("should call auth.getAccessToken when getAccessToken is called", () => {
        const getAccessTokenSpy = spyOn(service["auth"], "getAccessToken");

        service.getAccessToken();

        expect(getAccessTokenSpy).toHaveBeenCalled();
    });

    it("should call auth.getDecodedIDToken when getDecodedIDToken is called", () => {
        const getDecodedIDTokenSpy = spyOn(service["auth"], "getDecodedIDToken");

        service.getDecodedIDToken();

        expect(getDecodedIDTokenSpy).toHaveBeenCalled();
    });

    it("should call auth.getServiceEndpoints when getServiceEndpoints is called", () => {
        const getServiceEndpointsSpy = spyOn(service["auth"], "getServiceEndpoints");

        service.getServiceEndpoints();

        expect(getServiceEndpointsSpy).toHaveBeenCalled();
    });

    it("should call auth.getUserInfo when getUserInfo is called", () => {
        const getUserInfoSpy = spyOn(service["auth"], "getUserInfo");

        service.getUserInfo();

        expect(getUserInfoSpy).toHaveBeenCalled();
    });

    it("should call auth.refreshToken when refreshToken is called", () => {
        const refreshTokenSpy = spyOn(service["auth"], "refreshToken");

        service.refreshToken();

        expect(refreshTokenSpy).toHaveBeenCalled();
    });
});
