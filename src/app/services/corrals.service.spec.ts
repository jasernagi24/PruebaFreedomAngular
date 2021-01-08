import { TestBed } from '@angular/core/testing';

import { CorralsService } from './corrals.service';

describe('CorralsService', () => {
  let service: CorralsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorralsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
