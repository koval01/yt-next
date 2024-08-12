import ytdl from "@distube/ytdl-core";

export type VideoData = {
    duration: number;
    timeStart: number;
    id: string;
    isLive: boolean;
    wasLive: boolean;
    manifestUrl: string;
    relatedVideos: ytdl.relatedVideo[];
    videoDetails: ytdl.MoreVideoDetails;
};
