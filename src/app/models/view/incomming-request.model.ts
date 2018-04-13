import { UserViewModel } from './user.model';

export class RequestViewModel extends UserViewModel {
    public isAcceptingIncommingRequest = false;
    public isRemovingIncommingRequest = false;
    public isAccepted = false;
    public isRemoved = false;
}
