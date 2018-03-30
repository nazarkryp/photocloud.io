import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpUserEvent,
    HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from 'app/infrastructure/services';
import { RequestsService } from 'app/services';

@Injectable()
export class IncommingRequestsInterceptor implements HttpInterceptor {
    private incommingRequestsService: RequestsService;
    private currentUserService: CurrentUserService;
    private isLoadingIncommingRequests = false;

    constructor(
        private injector: Injector) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if (!this.incommingRequestsService) {
            this.incommingRequestsService = this.injector.get(RequestsService);
            this.currentUserService = this.injector.get(CurrentUserService);
        }

        if (this.isLoadingIncommingRequests) {
            return next.handle(req);
        }

        this.isLoadingIncommingRequests = true;

        return next.handle(req).finally(() => {
            const currentUser = this.currentUserService.retrieveCurrentUser();

            if (currentUser && currentUser.isActive && currentUser.isPrivate && !req.url.includes('users/requests/incomming')) {
                this.incommingRequestsService.getIncommingRequests(null).subscribe(() => {
                    this.isLoadingIncommingRequests = false;
                });
            }
        });
    }
}
