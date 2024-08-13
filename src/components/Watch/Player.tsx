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
    const thumbnail = encodeURIComponent(data?.thumbnail);
    
    return (
        <MediaPlayer
            src={{
                src: data.manifest_url,
                type: 'application/x-mpegurl'
            }}
            autoPlay={true}
            aspectRatio="16/9"
            load="visible"
            posterLoad="visible"
            currentTime={data.time_start}
            fullscreenOrientation="none"
        >
            <MediaProvider>
                <Poster
                    className="vds-poster"
                    src={`/_next/image?url=${thumbnail}&w=768&q=70`}
                    alt={data?.title}
                />
            </MediaProvider>
            <DefaultVideoLayout
                icons={defaultLayoutIcons}
                title={data?.title}
            />
        </MediaPlayer>
    )
}

const Player = ({ data }: { data: any }) => (
    !data ? <Skeleton /> : <PlayerItem data={data} />
)

export default Player;
