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
import { IncommingRequestsService } from 'app/services';

@Injectable()
export class IncommingRequestsInterceptor implements HttpInterceptor {
    private incommingRequestsService: IncommingRequestsService;
    private currentUserService: CurrentUserService;
    private isLoadingIncommingRequests = false;

    constructor(
        private injector: Injector) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if (!this.incommingRequestsService) {
            this.incommingRequestsService = this.injector.get(IncommingRequestsService);
            this.currentUserService = this.injector.get(CurrentUserService);
        }

        if (this.isLoadingIncommingRequests) {
            return next.handle(req);
        }

        const currentUser = this.currentUserService.retrieveCurrentUser();

        if (currentUser && currentUser.isPrivate && !req.url.includes('users/requests/incomming')) {
            this.isLoadingIncommingRequests = true;
            this.incommingRequestsService.getIncommingRequests().subscribe(() => {
                this.isLoadingIncommingRequests = false;
            });
        }

        return next.handle(req);
    }
}
