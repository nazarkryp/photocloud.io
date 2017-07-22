import { TestBed, inject } from '@angular/core/testing';

import { WebApiClient } from './web-api-client.service';

describe('WebApiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebApiClient]
    });
  });

  it('should be created', inject([WebApiClient], (service: WebApiClient) => {
    expect(service).toBeTruthy();
  }));
});
