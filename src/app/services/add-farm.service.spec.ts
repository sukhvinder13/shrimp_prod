import { TestBed } from '@angular/core/testing';

import { AddFarmService } from './add-farm.service';

describe('AddFarmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddFarmService = TestBed.get(AddFarmService);
    expect(service).toBeTruthy();
  });
});
