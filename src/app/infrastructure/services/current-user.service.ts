import { Injectable } from '@angular/core';

import { Observable, ReplaySubject, of } from 'rxjs';
import { tap, mergeMap, map } from 'rxjs/operators';

import { CurrentUserViewModel } from 'app/models/view';
import { UserService } from 'app/services';
import { AccountService } from 'app/account/services';
import { LocalStorageService } from 'app/infrastructure/services/storage';
import { TokenProvider } from 'app/infrastructure/security';
import { AccessToken } from 'app/infrastructure/security/access-token.model';
import { CreateAccountRequestModel } from 'app/account/models/request';

@Injectable()
export class CurrentUserService {
    private currentUserStorageKey = 'photocloud-current-user';
    private currentUser: CurrentUserViewModel;
    private state: ReplaySubject<CurrentUserViewModel> = new ReplaySubject<CurrentUserViewModel>(1);
    private intervalNumber: number;
    private gettingIncommingRequests: boolean;

    constructor(
        private tokenProvider: TokenProvider,
        private storageService: LocalStorageService,
        private userService: UserService,
        private accountService: AccountService) {
        const currentUser = this.retrieveCurrentUser();
        this.state.next(currentUser);
    }

    public get canSignInWithCode(): boolean {
        const token = this.tokenProvider.retrieveAccessToken();

        if (token && token.code) {
            return true;
        }

        return false;
    }

    public signIn(username: string, password: string, rememberMe: boolean): Observable<any> {
        return this.accountService.signIn(username, password)
            .pipe(mergeMap<AccessToken, CurrentUserViewModel>(accessToken => {
                this.tokenProvider.setAccessToken(accessToken);
                return this.accountService.getAccount()
                    .pipe(map(currentUser => {
                        currentUser.isRemembered = rememberMe;
                        this.saveCurrentUser(currentUser);
                        return currentUser;
                    }));
            }));
    }

    public create(request: CreateAccountRequestModel, signIn: boolean): Observable<any> {
        if (signIn) {
            return this.accountService.create(request, true)
                .pipe(mergeMap<AccessToken, CurrentUserViewModel>(accessToken => {
                    this.tokenProvider.setAccessToken(accessToken);
                    return this.accountService.getAccount()
                        .pipe(map(currentUser => {
                            this.saveCurrentUser(currentUser);
                            return currentUser;
                        }));
                }));
        }

        return this.accountService.create(request, false);
    }

    public signInWithCode(code: string = null): Observable<any> {
        if (!code) {
            const token = this.tokenProvider.retrieveAccessToken();
            code = token.code;
        }

        return this.accountService.signInWithCode(code)
            .pipe(mergeMap<AccessToken, CurrentUserViewModel>(accessToken => {
                this.tokenProvider.setAccessToken(accessToken);
                return this.accountService.getAccount()
                    .pipe(map(currentUser => {
                        this.saveCurrentUser(currentUser);
                        return currentUser;
                    }));
            }));
    }

    public enableSignInWithCode(): Observable<any> {
        return this.accountService.enableSignInWithCode()
            .pipe(tap((code) => {
                const token = this.tokenProvider.retrieveAccessToken();
                token.code = code;
                this.tokenProvider.setAccessToken(token);
            }));
    }

    public disableSignInWithCode(): Observable<any> {
        return this.accountService.disableSignInWithCode()
            .pipe(tap(() => {
                const token = this.tokenProvider.retrieveAccessToken();
                token.code = null;
                this.tokenProvider.setAccessToken(token);
            }));
    }

    public recover(username): Observable<any> {
        return of(true);
    }

    public signOut(cleanCurrentUser: boolean = true) {
        if (cleanCurrentUser) {
            this.storageService.removeItem(this.currentUserStorageKey);
        }

        this.tokenProvider.removeAccessToken();

        this.currentUser = null;
        this.state.next(null);
    }

    public getCurrentUser(refresh: boolean = false): Observable<CurrentUserViewModel> {
        if (refresh) {
            const currentUser = this.retrieveCurrentUser();

            if (currentUser && this.isAuthenticated) {
                return this.accountService.getAccount()
                    .pipe(
                        mergeMap<CurrentUserViewModel, CurrentUserViewModel>(serverCurrentUser => {
                            this.saveCurrentUser(serverCurrentUser);
                            this.state.next(serverCurrentUser);
                            return this.state.asObservable();
                        }));
            }
        }

        return this.state.asObservable();
    }

    public updateCurrentUser(propertiesToUpdate: any): Observable<CurrentUserViewModel> {
        return this.accountService.updateAccount(propertiesToUpdate)
            .pipe(tap(currentUser => {
                this.saveCurrentUser(currentUser);
            }));
    }

    public updateUser(propertiesToUpdate: any) {
        const currentUser = this.retrieveCurrentUser();

        const properties = Object.getOwnPropertyNames(propertiesToUpdate);

        properties.forEach(propertyName => {
            currentUser[propertyName] = propertiesToUpdate[propertyName];
        });

        this.saveCurrentUser(currentUser);
    }

    public changeAccountAttachment(propertiesToUpdate: any): Observable<CurrentUserViewModel> {
        return this.accountService.changeAccountAttachment(propertiesToUpdate)
            .pipe(tap(currentUser => {
                this.saveCurrentUser(currentUser);
            }));
    }

    public retrieveCurrentUser(): CurrentUserViewModel {
        return (this.currentUser = (this.currentUser ? this.currentUser : this.storageService.get<CurrentUserViewModel>(this.currentUserStorageKey, CurrentUserViewModel)));
    }

    private saveCurrentUser(currentUser: CurrentUserViewModel) {
        this.state.next(currentUser);
        this.storageService.set<CurrentUserViewModel>(this.currentUserStorageKey, currentUser);
        this.currentUser = currentUser;
    }

    public get isAuthenticated(): boolean {
        return this.tokenProvider.isTokenValid;
    }

    public get hasCode(): boolean {
        return this.tokenProvider.hasCode;
    }
}
