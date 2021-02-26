import { TestBed } from "@angular/core/testing";

import { AsgardeoAuthInterceptor } from "./asgardeo-auth.interceptor";

describe("AsgardeoAuthInterceptor", () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            AsgardeoAuthInterceptor
        ]
    }));

    it("should be created", () => {
        const interceptor: AsgardeoAuthInterceptor = TestBed.inject(AsgardeoAuthInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
