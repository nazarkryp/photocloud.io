import { Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { SigninComponent } from './signin/signin.component';
import { EditComponent } from './edit/edit.component';
import { RecoverComponent } from './recover/recover.component';

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
        component: SigninComponent
    },
    {
        path: 'edit',
        component: EditComponent
    },
    {
        path: 'recover',
        component: RecoverComponent
    }
];
