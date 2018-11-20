import { Component, OnInit } from '@angular/core';

import { StoryParserService } from './story-parser.service';
import { Story } from './models';

@Component({
    templateUrl: './stories-parser.component.html',
    styleUrls: ['./stories-parser.component.css']
})
export class StoriesParserComponent implements OnInit {
    public storyJson: string;
    public stories: Story[];

    constructor(
        private readonly storyParserService: StoryParserService) {
    }

    public getStory() {
        this.storyParserService.getStories().subscribe(stories => {
            this.stories = stories;
        });
    }

    public parse() {
        try {
            this.stories = this.storyParserService.parse(this.storyJson);
            this.storyJson = '';
        } catch (error) {
        }
    }

    public ngOnInit(): void {
        // this.getStory();
    }
}
