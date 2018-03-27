export class UpdateMediaRequest {
    public id: number;
    public caption: string;
    public allowComments: boolean;
    public attachmentsToRemove: number[];
    public coverId: number;
}
