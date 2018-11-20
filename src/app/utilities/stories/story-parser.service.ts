import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Story } from './models';

@Injectable({
    providedIn: 'root'
})
export class StoryParserService {
    constructor(
        private readonly httpClient: HttpClient) {
    }

    public getStories(): Observable<Story[]> {
        return this.httpClient.get<any>('')
            .pipe(map(response => {
                return response.data.reels_media as Story[];
            }));
    }

    public parse(json: string): Story[] {
        try {
            const storyObject = JSON.parse(json);

            return storyObject.data.reels_media as Story[];
        } catch (error) {
            throw error;
        }
    }
}
