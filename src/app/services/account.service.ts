import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AccessToken } from '../common/models/token';

@Injectable()
export class AccountService {

  constructor(private http: Http) { }

  signIn(account: any) {
    const requestUri = 'https://krypapp.azurewebsites.net/authorize';
    const body = 'grant_type=password&username=' + account.username + '&password=' + account.password;

    return this.http.post(requestUri, body)
      .toPromise()
      .then(response => response.json() as AccessToken)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json());
  }
}
