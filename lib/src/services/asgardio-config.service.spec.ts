import { TestBed } from '@angular/core/testing';

import { AsgardioConfigService } from './asgardio-config.service';

describe('AsgardioConfigService', () => {
  let service: AsgardioConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsgardioConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
