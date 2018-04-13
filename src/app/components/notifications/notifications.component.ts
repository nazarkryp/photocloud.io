import { Component, OnInit } from '@angular/core';

import { ActivityService } from 'app/services';
import { ActivityViewModel, Page } from 'app/models/view';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
    public page: Page<ActivityViewModel>;

    constructor(
        private activityService: ActivityService) { }

    public ngOnInit() {
        this.activityService.getRecentActivity().subscribe(page => {
            this.page = page;
        }, error => console.log(error));
    }
}
