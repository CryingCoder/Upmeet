import { TestBed } from '@angular/core/testing';

import { DALService } from './dal.service';

describe('DALService', () => {
  let service: DALService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DALService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
