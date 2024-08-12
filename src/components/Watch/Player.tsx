'use client'

import { Skeleton as VKSkeleton } from "@vkontakte/vkui";

import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { VideoData } from "./types";

const Skeleton = () => (
    <VKSkeleton className="w-full aspect-video" />
)

const PlayerItem = ({ data }: { data: VideoData }) => {
    const thumbnail = encodeURIComponent(data.videoDetails.thumbnails.at(-1)?.url || "");
    
    return (
        <MediaPlayer
            src={{
                src: data.manifestUrl,
                type: 'application/x-mpegurl'
            }}
            autoPlay={true}
            aspectRatio="16/9"
            load="visible"
            posterLoad="visible"
            currentTime={data.timeStart}
            fullscreenOrientation="none"
        >
            <MediaProvider>
                <Poster
                    className="vds-poster"
                    src={`/_next/image?url=${thumbnail}&w=768&q=70`}
                    alt={data.videoDetails.title}
                />
            </MediaProvider>
            <DefaultVideoLayout
                icons={defaultLayoutIcons}
                title={data.videoDetails.title}
            />
        </MediaPlayer>
    )
}

const Player = ({ data }: { data: any }) => (
    !data ? <Skeleton /> : <PlayerItem data={data} />
)

export default Player;
