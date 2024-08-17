'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Banner, EllipsisText, Flex, Spacing, Skeleton as VKSkeleton } from "@vkontakte/vkui";
import { Icon20Verified } from "@vkontakte/icons";

import { VideoData } from "./types";

const Skeleton = () => (
    <Flex direction="column" gap="l" margin="auto">
        {
            [...Array(5)].map((_, i) => (
                <Banner
                    key={i}
                    className="w-full mx-0"
                    before={
                        <div className="w-28 sm:w-36 md:w-48">
                            <VKSkeleton className="w-full h-24" />
                        </div>
                    }
                    header={<VKSkeleton maxWidth={320} height={26} />}
                    subheader={
                        <>
                            <Spacing />
                            <Flex direction="column" gap="xs">
                                <VKSkeleton maxWidth={120} />
                                <VKSkeleton maxWidth={180} />
                            </Flex>
                        </>
                    }
                />
            ))
        }
    </Flex>
)

const Author = ({ author }: { author: any }) => {
    if (typeof author === 'string') {
        return (<span>{author}</span>)
    }
    return (
        <div className="flex gap-2">
            <span>{author?.name}</span>
            {author?.verified && <Icon20Verified />}
        </div>
    )
}

const Details = ({ data }: { data: any }) => {
    return (
        <Flex className="m-0">
            <span>{data?.short_view_count_text}</span>
            <span>•</span>
            <span>{data?.published}</span>
        </Flex>
    )
}

const VideoItem = ({ data }: { data: any }) => {
    const router = useRouter();
    const thumbnail = data.thumbnails.at(-1);

    return (
        <Banner
            className="w-full mx-0"
            asideMode="expand"
            onClick={() => router.push(`/watch/${data.id}`)}
            before={
                <div className="w-28 sm:w-36 md:w-48">
                    <Image
                        width={thumbnail?.width}
                        height={thumbnail?.height}
                        src={thumbnail?.url || ""}
                        alt={data.title || ""}
                        className="rounded-md sm:rounded-lg"
                    />
                </div>
            }
            header={<EllipsisText>{data.title}</EllipsisText>}
            subheader={
                <>
                    <Spacing />
                    <Flex direction="column" gap="xs">
                        <Author author={data.author} />
                        <Details data={data} />
                    </Flex>
                </>
            }
        />
    )
}

const Videos = ({ data }: { data: VideoData }) => (
    <Flex direction="column" gap="l" margin="auto">
        {/* {data.relatedVideos.map(v => (<VideoItem key={v.id} data={v} />))} */}
    </Flex>
)

const RelatedVideos = ({ data }: { data: any }) => (
    !data ? <Skeleton /> : <Videos data={data} />
)

export default RelatedVideos;
