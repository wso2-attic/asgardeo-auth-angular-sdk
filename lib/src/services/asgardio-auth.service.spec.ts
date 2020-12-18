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

import { TestBed } from "@angular/core/testing";
import { ASGARDIO_CONFIG } from "../configs/asgardio-config";
import { AsgardioAuthService } from "./asgardio-auth.service";

describe("AsgardioAuthService", () => {
    let service: AsgardioAuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ASGARDIO_CONFIG,
                    useValue: {
                        signInRedirectURL: "fakeSignInRedirectURL",
                        clientID: "fakeClientID",
                        serverOrigin: "fakeServerOrigin"
                    }
                }
            ]
        });
        service = TestBed.inject(AsgardioAuthService);
    });

    it("should be created and identity client object / auth should be defined", () => {
        expect(service).toBeTruthy();
        expect(service['auth']).toBeDefined();
    });

    it("should call auth.signIn when signIn is called", () => {
        let signInSpy = spyOn(service['auth'], "signIn");

        service.signIn();

        expect(signInSpy).toHaveBeenCalled();
    });

    it("should call auth.signOut when signOut is called", () => {
        let signOutSpy = spyOn(service['auth'], "signOut");

        service.signOut();

        expect(signOutSpy).toHaveBeenCalled();
    });

    it("should call auth.getAccessToken when getAccessToken is called", () => {
        let getAccessTokenSpy = spyOn(service['auth'], "getAccessToken");

        service.getAccessToken();

        expect(getAccessTokenSpy).toHaveBeenCalled();
    });

    it("should call auth.getDecodedIDToken when getDecodedIDToken is called", () => {
        let getDecodedIDTokenSpy = spyOn(service['auth'], "getDecodedIDToken");

        service.getDecodedIDToken();

        expect(getDecodedIDTokenSpy).toHaveBeenCalled();
    });

    it("should call auth.getServiceEndpoints when getServiceEndpoints is called", () => {
        let getServiceEndpointsSpy = spyOn(service['auth'], "getServiceEndpoints");

        service.getServiceEndpoints();

        expect(getServiceEndpointsSpy).toHaveBeenCalled();
    });

    it("should call auth.getUserInfo when getUserInfo is called", () => {
        let getUserInfoSpy = spyOn(service['auth'], "getUserInfo");

        service.getUserInfo();

        expect(getUserInfoSpy).toHaveBeenCalled();
    });

    it("should call auth.refreshToken when refreshToken is called", () => {
        let refreshTokenSpy = spyOn(service['auth'], "refreshToken");

        service.refreshToken();

        expect(refreshTokenSpy).toHaveBeenCalled();
    });
});
