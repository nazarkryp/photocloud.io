import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ActivityService } from './activity.service';
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

        return next.handle(req)
            .pipe(finalize(() => {
                const currentUser = this.currentUserService.retrieveCurrentUser();

                if (currentUser && currentUser.isActive && !req.url.includes('activities/recent')) {
                    this.isLoading = true;

                    this.activityService.getRecentActivity().subscribe(() => {
                        this.isLoading = false;
                    }, error => {
                        this.isLoading = false;
                    });
                }
            }));
    }
}
