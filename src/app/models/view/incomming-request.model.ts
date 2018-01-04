import { UserViewModel } from './user.model';

export class IncommingRequestViewModel extends UserViewModel {
    public isConfirmingIncommingRequest = false;
    public isRemovingIncommingRequest = false;
    public isConfirmed = false;
    public isRemoved = false;
}
