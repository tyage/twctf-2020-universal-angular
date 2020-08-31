import { TestBed } from '@angular/core/testing';

import { FlagService } from './flag.service';

describe('TestService', () => {
  let service: FlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
