import { TestBed } from '@angular/core/testing';

import { SkanderbergService } from './skanderberg.service';

describe('SkanderbergService', () => {
  let service: SkanderbergService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkanderbergService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
