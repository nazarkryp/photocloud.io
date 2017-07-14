import { TestBed, inject } from '@angular/core/testing';

import { TokenMapper } from './token.service';

describe('TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenMapper]
    });
  });

  it('should be created', inject([TokenMapper], (service: TokenMapper) => {
    expect(service).toBeTruthy();
  }));
});
