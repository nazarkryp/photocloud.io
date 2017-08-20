import { TestBed, inject } from '@angular/core/testing';

import { UserProvider } from './user.service';

describe('UserProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProvider]
    });
  });

  it('should be created', inject([UserProvider], (service: UserProvider) => {
    expect(service).toBeTruthy();
  }));
});
