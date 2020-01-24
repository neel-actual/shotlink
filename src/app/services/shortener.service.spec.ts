import { TestBed } from '@angular/core/testing';

import { ShortenerService } from './shortener.service';

describe('ShortenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShortenerService = TestBed.get(ShortenerService);
    expect(service).toBeTruthy();
  });
});
