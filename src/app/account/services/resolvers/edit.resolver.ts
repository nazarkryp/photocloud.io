import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountModule } from 'app/account/account.module';

import { Observable } from 'rxjs';

import { AccountService } from 'app/account/services';

@Injectable()
export class EditResolver implements Resolve<AccountModule> {
    constructor(
        private accountService: AccountService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccountModule> {
        return this.accountService.getAccount();
    }
}
