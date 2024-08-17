'use client'

import { Skeleton as VKSkeleton } from "@vkontakte/vkui";

import { isHLSProvider, MediaPlayer, MediaProvider, MediaProviderAdapter, MediaProviderChangeEvent, Poster } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import HLS from 'hls.js';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { CustomHasher } from "@/lib/sign";

import { VideoData } from "./types";

const Skeleton = () => (
    <VKSkeleton className="w-full aspect-video" />
)

const PlayerItem = ({ data }: { data: VideoData }) => {
    const thumbnail = encodeURIComponent(data?.thumbnail);
    const hasher = new CustomHasher();

    function onProviderChange(
        provider: MediaProviderAdapter | null,
        _: MediaProviderChangeEvent,
    ) {
        if (isHLSProvider(provider)) {
            provider.library = HLS;
            provider.config = {
                xhrSetup(xhr, url) {
                    xhr.setRequestHeader('X-Sign', hasher.customHash(url));
                },
            };
        }
    }
    
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
            onProviderChange={onProviderChange}
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
