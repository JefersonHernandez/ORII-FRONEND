import { TestBed } from '@angular/core/testing';

import { ExporterAllService } from './exporter-all.service';

describe('ExporterAllService', () => {
  let service: ExporterAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExporterAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
