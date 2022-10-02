import { TestBed } from '@angular/core/testing';

import { StateAndSettingsService } from './state-and-settings.service';

describe('StateAndSettingsService', () => {
  let service: StateAndSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateAndSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
