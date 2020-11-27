import { TestBed } from '@angular/core/testing';

import { OidcAngularService } from './oidc-angular.service';

describe('OidcAngularService', () => {
  let service: OidcAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OidcAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
