import { Routes } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { SignInComponent } from './components/signin/signin.component';
import { EditComponent } from './components/edit/edit.component';
import { RecoverComponent } from './components/recover/recover.component';
import { AutoLoginComponent } from './components/auto-login/auto-login.component';

import { EditResolver } from 'app/account/services/resolvers';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'edit',
        data: {
            title: 'PhotoCloud - Edit Account'
        }
    },
    {
        path: 'create',
        component: CreateComponent,
        data: {
            title: 'PhotoCloud - Create Account'
        }
    },
    {
        path: 'signin',
        component: SignInComponent,
        data: {
            title: 'PhotoCloud - Sign In'
        }
    },
    {
        path: 'recover',
        component: RecoverComponent,
        data: {
            title: 'PhotoCloud - Reset Password'
        }
    },
    {
        path: 'edit',
        component: EditComponent,
        resolve: {
            account: EditResolver
        },
        data: {
            title: 'PhotoCloud - Edit Account'
        }
    },
    {
        path: 'autologin',
        component: AutoLoginComponent,
        data: {
            title: 'PhotoCloud - Login'
        }
    },
    {
        path: 'signin/:code',
        component: AutoLoginComponent,
        data: {
            title: 'PhotoCloud - Authenticating'
        }
    }
];
