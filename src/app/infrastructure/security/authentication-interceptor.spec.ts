import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationInterceptor } from './authentication-interceptor';

describe('AuthenticationInterceptorService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthenticationInterceptor]
        });
    });

    it('should be created', inject([AuthenticationInterceptor], (service: AuthenticationInterceptor) => {
        expect(service).toBeTruthy();
    }));
});
