import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './stories-parser.component.html',
    styleUrls: ['./stories-parser.component.css']
})
export class StoriesParserComponent {
    public storyJson: string;

    constructor(
        private readonly httpClient: HttpClient) { }

    public getStory() {
        // tslint:disable-next-line:max-line-length
        this.httpClient.get('https://www.instagram.com/graphql/query/?query_hash=61e453c4b7d667c6294e71c57afa6e63&variables=%7B%22reel_ids%22%3A%5B%22289754966%22%5D%2C%22tag_names%22%3A%5B%5D%2C%22location_ids%22%3A%5B%5D%2C%22highlight_reel_ids%22%3A%5B%5D%2C%22precomposed_overlay%22%3Afalse%2C%22show_story_header_follow_button%22%3Afalse%7D')
            .subscribe(response => {
                console.log(response);
            }, error => {
                console.log(error);
            });
    }

    public parse() {
        console.log('OK');
        const story = JSON.parse(this.storyJson);

    }
}
