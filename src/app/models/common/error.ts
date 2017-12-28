export class Error {
    public title: string;
    public description: string;

    public constructor(title?: string, description?: string) {
        this.title = title;
        this.description = description;
    }
}
