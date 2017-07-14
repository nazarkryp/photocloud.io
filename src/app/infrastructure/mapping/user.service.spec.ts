import { TestBed, inject } from '@angular/core/testing';

import { UserMapper } from './user.mapper';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserMapper]
    });
  });

  it('should be created', inject([UserMapper], (service: UserMapper) => {
    expect(service).toBeTruthy();
  }));
});
