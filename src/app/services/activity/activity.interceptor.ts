import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ActivityService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';

@Injectable()
export class ActivityInterceptor implements HttpInterceptor {
    private activityService: ActivityService;
    private currentUserService: CurrentUserService;
    private isLoading = false;

    constructor(
        private injector: Injector) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if (!this.activityService) {
            this.activityService = this.injector.get(ActivityService);
            this.currentUserService = this.injector.get(CurrentUserService);
        }

        if (this.isLoading) {
            return next.handle(req);
        }

        this.isLoading = true;

        return next.handle(req)
            .pipe(finalize(() => {
                const currentUser = this.currentUserService.retrieveCurrentUser();

                if (currentUser && currentUser.isActive && !req.url.includes('activity/recent')) {
                    this.activityService.getRecentActivity().subscribe(() => {
                        this.isLoading = false;
                    });
                }
            }));
    }
}
