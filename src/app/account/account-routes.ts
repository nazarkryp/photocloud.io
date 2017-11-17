import { Routes } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { SignInComponent } from './components/signin/signin.component';
import { EditComponent } from './components/edit/edit.component';
import { RecoverComponent } from './components/recover/recover.component';

import { EditResolver } from 'app/account/services/resolvers';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'edit'
    },
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: 'signin',
        component: SignInComponent,
        data: {
            title: 'PhotoCloud - Explore Tags'
        }
    },
    {
        path: 'edit',
        component: EditComponent,
        resolve: {
            account: EditResolver
        }
    },
    {
        path: 'recover',
        component: RecoverComponent
    }
];
