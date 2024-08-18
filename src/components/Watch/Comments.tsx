'use client'

import { Flex, Paragraph, Text, Group, RichCell, Skeleton as VKSkeleton, DisplayTitle, Caption, Headline, Separator } from "@vkontakte/vkui";
import { Icon20Like, Icon20LikeCircleFillRed, Icon20Pin, Icon20Verified, Icon28CommentOutline } from "@vkontakte/icons";

import { VideoData, Comment } from "./types";
import NextAvatar from "../NextAvatar";

import { clsx } from 'clsx';

import { nFormatter } from "@/lib/format";

const SkeletonHeader = () => (
    <Flex gap="s" className="p-4">
        <Flex className="m-0">
            <DisplayTitle level="3" className="mr-2">
                <VKSkeleton width={96} />
            </DisplayTitle>
            <Flex className="m-0" gap="xs">
                <Text className="leading-7" weight="1">
                    <VKSkeleton width={50} />
                </Text>
            </Flex>
        </Flex>
    </Flex>
);

const SkeletonCommentItem = () => (
    <RichCell
        before={<VKSkeleton width={48} height={48} borderRadius={100} />}
        text={<Paragraph><VKSkeleton maxWidth={720} /></Paragraph>}
        caption={<VKSkeleton width={96} />}
        bottom={
            <Flex gap="s">
                <VKSkeleton width={20} height={20} />
                <Caption className="leading-5">
                    <VKSkeleton width={32} />
                </Caption>
            </Flex>
        }
    >
        <Headline level="2" weight="1">
            <VKSkeleton width={200} />
        </Headline>
    </RichCell>
);

const Skeleton = () => (
    <Flex direction="column" gap="l" margin="auto" className="m-0">
        <Group className="max-w-full m-0">
            <SkeletonHeader />
            <Separator />
            {[...Array(5)].map((_, i) => <SkeletonCommentItem key={i} />)}
        </Group>
    </Flex>
);

const MetaContainer = ({ children }: { children: JSX.Element[] }) => (
    <Flex gap="s">
        {children}
    </Flex>
)

const Likes = ({ data }: { data: Comment }) => (
    <MetaContainer>
        <Icon20Like className="text-[--vkui--color_accent_red]" />
        <Caption className="leading-5">{nFormatter(data?.like_count || 0)}</Caption>
    </MetaContainer>
)

const Favorited = () => (
    <MetaContainer>
        <Icon20LikeCircleFillRed />
        <Caption className="leading-5">by author</Caption>
    </MetaContainer>
);

const Author = ({ data }: { data: Comment }) => (
    <Headline level="2" weight="1" className="pb-1 leading-5">
        <div className="flex gap-2">
            <div className={clsx(data.author_is_uploader && "bg-[--vkui--color_background_secondary--active] rounded-xl py-0.5 px-2 w-fit", "flex gap-1")}>
                {data.author}
                {data.author_is_verified && <Icon20Verified className="text-[--vkui--color_background_accent]" />}
            </div>
            {data.is_pinned && <Icon20Pin className="text-[--vkui--color_text_secondary]" />}
        </div>
    </Headline>
)

const CommentItem = ({ data }: { data: Comment }) => (
    <RichCell
        before={
            <NextAvatar
                size={48}
                src={data.author_thumbnail}
                initials={data.author.replace("@", "").slice(0, 1)}
                gradientColor={Math.floor(Math.random() * 6) + 1} />
        }
        text={
            <div className="max-w-full whitespace-normal">
                <Paragraph className="select-text">
                    {data.text}
                </Paragraph>
            </div>
        }
        caption={data.time_text}
        bottom={
            <Flex>
                <Likes data={data} />
                {data.is_favorited && <Favorited />}
            </Flex>
        }
    >
        <Author data={data} />
    </RichCell>
);

const CommentsHeader = ({ count }: { count: number }) => (
    <Flex gap="s" className="p-4">
        <Flex className="m-0">
            <Flex className="m-0" gap="xs">
                <Text className="leading-7" weight="1">Top {count}</Text>
                <Icon28CommentOutline />
            </Flex>
            <DisplayTitle level="3" className="mr-2">Comments</DisplayTitle>
        </Flex>
    </Flex>
);

const CommentsContainer = ({ data }: { data: VideoData }) => (
    <Flex direction="column" gap="l" margin="auto" className="m-0">
        <Group className="max-w-full m-0">
            <div className="pb-4">
                <CommentsHeader count={data.comments.length} />
                <Separator />
                {data.comments.map(c => <CommentItem key={c.id} data={c} />)}
            </div>
        </Group>
    </Flex>
);

const Comments = ({ data }: { data: any }) => (
    !data ? <Skeleton /> : <CommentsContainer data={data} />
);

export default Comments;
