import { TestBed } from '@angular/core/testing';

import { PatientImageService } from './patient-image.service';

describe('PatientImageService', () => {
  let service: PatientImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
