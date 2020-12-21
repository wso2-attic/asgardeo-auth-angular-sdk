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
import { AsgardioConfigInterface } from "dist/oidc-angular/models/asgardio-config.interface";
import { ASGARDIO_CONFIG } from "../configs/asgardio-config";
import { AsgardioAuthService } from "./asgardio-auth.service";
import { AsgardioNavigatorService } from "./asgardio-navigator.service";

describe("AsgardioAuthService", () => {
    let service: AsgardioAuthService;
    let config: AsgardioConfigInterface;

    let navigatorService: AsgardioNavigatorService;
    let navigatorServiceStub: Partial<AsgardioNavigatorService>;

    beforeEach(() => {

        navigatorServiceStub = {
            navigateByUrl: (params) => Promise.resolve(true),
            getUrl: () => "fakeUrl"
        };

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ASGARDIO_CONFIG,
                    useValue: {}
                },
                {
                    provide: AsgardioNavigatorService,
                    useValue: navigatorServiceStub
                }
            ]
        });

        service = TestBed.inject(AsgardioAuthService);
        config = TestBed.inject(ASGARDIO_CONFIG);
        navigatorService = TestBed.inject(AsgardioNavigatorService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
        expect(service["auth"]).toBeDefined();
    });

    it("should catch when auth.intialize throws an error", fakeAsync(() => {
        const initializeSpy = spyOn(service["auth"], "initialize").and.returnValue(Promise.reject("fakeReject"));

        new AsgardioAuthService(config, navigatorService);

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

        expect(navigateByURLSpy).toHaveBeenCalledWith(config.signInRedirectURL);
    });

    it("should store the url in session storage when signInWithRedirect is called", () => {
        const store = {};
        const setItemSpy = spyOn(sessionStorage, "setItem").and.callFake((key, value) => store[key] = value + "");

        service.signInWithRedirect();

        expect(setItemSpy).toHaveBeenCalledWith("redirectUrl", navigatorService.getUrl());
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
