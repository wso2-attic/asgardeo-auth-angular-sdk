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

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AsgardeoAuthService, BasicUserInfo } from "@asgardeo/auth-angular";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    let authService: AsgardeoAuthService;
    let authServiceStub: Partial<AsgardeoAuthService>;

    beforeEach(async () => {
        authServiceStub = {
            signIn: () => Promise.resolve({} as BasicUserInfo),
            isAuthenticated: () => Promise.resolve(true),
            on: () => Promise.resolve()
        };

        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
            providers: [
                {
                    provide: AsgardeoAuthService,
                    useValue: authServiceStub
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;

        authService = TestBed.inject(AsgardeoAuthService);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
