export type Comment = {
    author: string;
    author_id: string;
    author_is_uploader: false;
    author_is_verified: false;
    author_thumbnail: string | undefined;
    author_url: string | undefined;
    id: string;
    is_favorited: boolean;
    is_pinned: boolean;
    like_count: number;
    parent: string;
    text: string;
    time_text: string;
    timestamp: number;
}

export type VideoData = {
    duration: number;
    time_start: number;
    id: string;
    is_live: boolean;
    was_live: boolean;
    manifest_url: string;
    title: string;
    description: string;
    thumbnail: string;
    timestamp: number;
    view_count: number;
    comments: Comment[];
};
