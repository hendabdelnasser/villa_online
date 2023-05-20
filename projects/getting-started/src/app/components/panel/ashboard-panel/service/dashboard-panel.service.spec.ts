import { TestBed } from '@angular/core/testing';

import { DashboardPanelService } from './dashboard-panel.service';

describe('DashboardPanelService', () => {
  let service: DashboardPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
