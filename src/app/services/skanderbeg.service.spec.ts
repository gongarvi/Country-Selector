import { TestBed } from '@angular/core/testing';

import { SkanderbegService } from './skanderbeg.service';

describe('SkanderbegService', () => {
  let service: SkanderbegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkanderbegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
