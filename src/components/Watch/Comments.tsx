'use client'

import { Flex, Paragraph, Text, Group, RichCell, Skeleton as VKSkeleton, DisplayTitle, Caption, Headline, Separator } from "@vkontakte/vkui";
import { Icon20Like, Icon28CommentOutline } from "@vkontakte/icons";

import { VideoData, Comment } from "./types";
import NextAvatar from "../NextAvatar";

const SkeletonHeader = () => (
    <Flex gap="s" className="p-4 md:pl-6">
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

const CommentItem = ({ data }: { data: Comment }) => (
    <RichCell
        before={<NextAvatar size={48} src={data.author_thumbnail} />}
        text={
            <div className="max-w-full">
                <Paragraph>{data.text}</Paragraph>
            </div>
        }
        caption={data.time_text}
        bottom={
            <Flex gap="s">
                <Icon20Like className="text-[--vkui--color_accent_red]" />
                <Caption className="leading-5">{data.like_count}</Caption>
            </Flex>
        }
    >
        <Headline level="2" weight="1">{data.author}</Headline>
    </RichCell>
);

const CommentsHeader = ({ count }: { count: number }) => (
    <Flex gap="s" className="p-4 md:pl-6">
        <Flex className="m-0">
            <DisplayTitle level="3" className="mr-2">Comments</DisplayTitle>
            <Flex className="m-0" gap="xs">
                <Text className="leading-7" weight="1">{count}</Text>
                <Icon28CommentOutline />
            </Flex>
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
