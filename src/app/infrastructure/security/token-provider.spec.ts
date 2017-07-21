import { TestBed, inject } from '@angular/core/testing';

import { TokenProvider } from './token-provider.service';

describe('TokenProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenProvider]
    });
  });

  it('should be created', inject([TokenProvider], (service: TokenProvider) => {
    expect(service).toBeTruthy();
  }));
});
