export class Story {
    public id: string;
    public expiring_at: number;
    public seen: number;
    public items: StoryItem[];
    public owner: StoryUser;
    public user: StoryUser;
}

export class StoryItem {
    public id: number;
    public display_url: string;
    public media_preview: string;
    public taken_at_timestamp: number;
    public expiring_at_timestamp: number;
    public story_cta_url: any;
    public story_view_count: any;
    public is_video: boolean;
    public owner: any;
    public should_log_client_event: boolean;
    public tracking_token: string;
    public tappable_objects: any[];
    public story_app_attribution: any;
    public display_resources: DisplayResource[];
    public video_resources: VideoResource[];
}

export class StoryUser {
    public id: number;
    public profile_pic_url: string;
    public username: string;
}

export class Dimensions {
    public width: number;
    public height: number;
}

export class DisplayResource {
    public src: string;
    public config_width: number;
    public config_height: number;
}

export class VideoResource {
    public src: string;
    public config_width: number;
    public config_height: number;
    public mime_type: string;
    public profile: string;
}
