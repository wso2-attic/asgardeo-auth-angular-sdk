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
import { Router } from "@angular/router";
import { AsgardeoNavigatorService } from "./asgardeo-navigator.service";

describe("AsgardeoNavigatorService", () => {
    let service: AsgardeoNavigatorService;

    let router: Router;
    let routerStub: Partial<Router>;

    beforeEach(() => {
        routerStub = {
            navigateByUrl: () => Promise.resolve(true),
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

    it("should return the location.pathname when getUrl is called", () => {
        const getUrlSpy = spyOn(service, "getCurrentRoute");

        service.getCurrentRoute();

        expect(getUrlSpy).toHaveBeenCalled();
    });

    it("should navigate the user to the provided route", () => {
        const navigateByurlRSpy = spyOn(router, "navigateByUrl").and.returnValue(Promise.resolve(true));

        service.navigateByUrl("fakePath");

        expect(navigateByurlRSpy).toHaveBeenCalled();
    });

    it("should navigate the user to root if the provided route does not exist", fakeAsync(() => {
        const navigateByurlRSpy = spyOn(router, "navigateByUrl").and.callFake((url: string): Promise<boolean> => {
            if (url !== "/") {return Promise.reject("fakeReject");}
            else {return Promise.resolve(true);}
        });

        service.navigateByUrl("fakePath");

        tick();
        expect(navigateByurlRSpy).toHaveBeenCalledWith("/");
    }));
});
