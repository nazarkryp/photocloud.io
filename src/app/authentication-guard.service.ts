import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor() { }

  canActivate() {
    console.log('Authentication Guard');
    return true;
  }
}
