import { TestBed } from '@angular/core/testing';

import { StudentManagerServiceService } from './student-manager-service.service';

describe('StudentManagerServiceService', () => {
  let service: StudentManagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentManagerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
