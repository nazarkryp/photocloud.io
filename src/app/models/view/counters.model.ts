export class CountersViewModel {
    public posts: number;
    public followers: number;
    public following: number;

    constructor(posts: number, followers: number, following: number) {
        this.posts = posts;
        this.followers = followers;
        this.following = following;
    }
}
