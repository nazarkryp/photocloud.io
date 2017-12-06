import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountModule } from 'app/account/account.module';

import { Observable } from 'rxjs/Observable';

import { AccountService } from 'app/account/services';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class EditResolver implements Resolve<AccountModule> {
    constructor(
        private accountService: AccountService,
        private progress: NgProgress) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : AccountModule | Observable<AccountModule> | Promise<AccountModule> {
        this.progress.start();
        return this.accountService.getAccount();
    }
}
