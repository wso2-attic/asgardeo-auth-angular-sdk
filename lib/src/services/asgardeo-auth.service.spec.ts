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
import { ASGARDEO_CONFIG } from "../configs/asgardeo-config";
import { AsgardeoConfigInterface } from "../models/asgardeo-config.interface";
import { CustomGrantConfig, Hooks } from "../models/asgardeo-spa.models";
import { AsgardeoAuthService } from "./asgardeo-auth.service";
import { AsgardeoNavigatorService } from "./asgardeo-navigator.service";

describe("AsgardeoAuthService", () => {
    let service: AsgardeoAuthService;
    let config: AsgardeoConfigInterface;

    let navigatorService: AsgardeoNavigatorService;
    let navigatorServiceStub: Partial<AsgardeoNavigatorService>;

    beforeEach(() => {
        navigatorServiceStub = {
            navigateByUrl: () => Promise.resolve(true),
            setRedirectUrl: () => "",
            getCurrentRoute: () => "fakeUrl",
            getRouteWithoutParams: () => "fakeRoute"
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

    it("should call auth.signIn when signIn is called", () => {
        const signInSpy = spyOn(service["auth"], "signIn");

        service.signIn();

        expect(signInSpy).toHaveBeenCalled();
    });

    it("should store the url in session storage when signInWithRedirect is called", () => {
        const setRedirectUrlSpy = spyOn(navigatorService, "setRedirectUrl");

        service.signInWithRedirect();

        expect(setRedirectUrlSpy).toHaveBeenCalled();
    });

    it("should navigate the user to signInRedirect component when signInWithRedirect is called", () => {
        const navigateByUrlSpy = spyOn(navigatorService, "navigateByUrl");

        service.signInWithRedirect();

        expect(navigateByUrlSpy).toHaveBeenCalled();
    });

    it("should call auth.signOut when signOut is called", () => {
        const signOutSpy = spyOn(service["auth"], "signOut");

        service.signOut();

        expect(signOutSpy).toHaveBeenCalled();
    });

    it("should call auth.isAuthenticated when isAuthenticated is called", () => {
        const isAuthenticatedSpy = spyOn(service["auth"], "isAuthenticated");

        service.isAuthenticated();

        expect(isAuthenticatedSpy).toHaveBeenCalled();
    });

    it("should call auth.getBasicUserInfo when getBasicUserInfo is called", () => {
        const getBasicUserInfoSpy = spyOn(service["auth"], "getBasicUserInfo");

        service.getBasicUserInfo();

        expect(getBasicUserInfoSpy).toHaveBeenCalled();
    });

    it("should call auth.getAccessToken when getAccessToken is called", () => {
        const getAccessTokenSpy = spyOn(service["auth"], "getAccessToken");

        service.getAccessToken();

        expect(getAccessTokenSpy).toHaveBeenCalled();
    });

    it("should call auth.getIDToken when getIDToken is called", () => {
        const getIDTokenSpy = spyOn(service["auth"], "getIDToken");

        service.getIDToken();

        expect(getIDTokenSpy).toHaveBeenCalled();
    });

    it("should call auth.getDecodedIDToken when getDecodedIDToken is called", () => {
        const getDecodedIDTokenSpy = spyOn(service["auth"], "getDecodedIDToken");

        service.getDecodedIDToken();

        expect(getDecodedIDTokenSpy).toHaveBeenCalled();
    });

    it("should call auth.getOIDCServiceEndpoints when getOIDCServiceEndpoints is called", () => {
        const getOIDCServiceEndpointsSpy = spyOn(service["auth"], "getOIDCServiceEndpoints");

        service.getOIDCServiceEndpoints();

        expect(getOIDCServiceEndpointsSpy).toHaveBeenCalled();
    });

    it("should call auth.refreshAccessToken when refreshAccessToken is called", () => {
        const refreshAccessTokenSpy = spyOn(service["auth"], "refreshAccessToken");

        service.refreshAccessToken();

        expect(refreshAccessTokenSpy).toHaveBeenCalled();
    });

    it("should call auth.revokeAccessToken when revokeAccessToken is called", () => {
        const revokeAccessTokenSpy = spyOn(service["auth"], "revokeAccessToken");

        service.revokeAccessToken();

        expect(revokeAccessTokenSpy).toHaveBeenCalled();
    });

    it("should call auth.on when on is called", () => {
        const onSpy = spyOn(service["auth"], "on");

        service.on(Hooks.SignIn, () => { });

        expect(onSpy).toHaveBeenCalled();
    });

    it("should call auth.on when on is called with CustomGrant Hook", () => {
        const onSpy = spyOn(service["auth"], "on");

        service.on(Hooks.CustomGrant, () => { });

        expect(onSpy).toHaveBeenCalled();
    });

    it("should call auth.requestCustomGrant when requestCustomGrant is called", () => {
        const requestCustomGrantSpy = spyOn(service["auth"], "requestCustomGrant");

        service.requestCustomGrant({} as CustomGrantConfig);

        expect(requestCustomGrantSpy).toHaveBeenCalled();
    });

});
