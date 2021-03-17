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
import { Router } from "@angular/router";
import { AsgardeoNavigatorService } from "./asgardeo-navigator.service";

describe("AsgardeoNavigatorService", () => {
    let service: AsgardeoNavigatorService;

    beforeEach(() => {
        service = TestBed.inject(AsgardeoNavigatorService);
    });

    it("should be created even if the router module is not provided ", () => {
        expect(service).toBeTruthy();
    });

    it("should return a promise that resolves with false when navigateByUrl is called", async () => {
        const result = await service.navigateByUrl("fakePath");

        expect(result).toBeFalse();
    });
});

describe("AsgardeoNavigatorService", () => {
    let service: AsgardeoNavigatorService;

    let router: Router;
    let routerStub: Partial<Router>;

    beforeEach(() => {
        routerStub = {
            url: "fakeUrl?fakeParams",
            navigateByUrl: () => Promise.resolve(true)
        };

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Router,
                    useValue: routerStub
                }
            ]
        });
        service = TestBed.inject(AsgardeoNavigatorService);
        router = TestBed.inject(Router);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should navigate the user to the provided route", () => {
        const navigateByurlRSpy = spyOn(router, "navigateByUrl").and.returnValue(Promise.resolve(true));

        service.navigateByUrl("fakePath");

        expect(navigateByurlRSpy).toHaveBeenCalledWith("fakePath");
    });

    it("should set the redirectUrl property on session storage when setRedirectUrl is called", () => {
        const store = {};
        const setItemSpy = spyOn(sessionStorage, "setItem").and.callFake((key, value) => store[key] = value + "");
        const getCurrentRouteSpy = spyOn(service, "getCurrentRoute").and.returnValue("fakeUrl");

        service.setRedirectUrl();

        expect(getCurrentRouteSpy).toHaveBeenCalled();
        expect(setItemSpy).toHaveBeenCalledWith("redirectUrl", "fakeUrl");
        expect(store).toEqual({ redirectUrl: "fakeUrl" });
    });


    it("should get the redirectUrl property on session storage when getRedirectUrl is called", () => {
        const store = { redirectUrl: "fakeUrl" };
        const getItemSpy = spyOn(sessionStorage, "getItem").and.callFake((key) => store[key]);

        const result = service.getRedirectUrl();

        expect(getItemSpy).toHaveBeenCalled();
        expect(result).toEqual("fakeUrl");
    });

    it("should return root route if the redirectUrl property does not exist on session storage when getRedirectUrl is called", () => {
        const store = {};
        const getItemSpy = spyOn(sessionStorage, "getItem").and.callFake((key) => store[key]);

        const result = service.getRedirectUrl();

        expect(getItemSpy).toHaveBeenCalled();
        expect(result).toEqual("/");
    });

    it("should return the route without parameters when getRouteWithoutParams is called", () => {
        const urlSpy = spyOn(window, "URL");

        service.getRouteWithoutParams("fakeUrl?fakeParams");

        expect(urlSpy).toHaveBeenCalled();
    });

    it("should return the current route when getCurrentRoute is called", () => {
        const result = service.getCurrentRoute();

        expect(result).toEqual("fakeUrl");
    });
});
