import { Text, Skeleton as VKSkeleton, Flex } from "@vkontakte/vkui";
import { Icon20CircleSmallFilled } from "@vkontakte/icons";
import { VideoData } from "./types"
import { timeAgo } from "@/lib/time";

const MetaContainer = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <Flex className="pl-6 [&>*]:ml-0">
        {children}
    </Flex>
)

const MetaItem = ({ data }: { data: VideoData }) => (
    <MetaContainer>
        <Text weight="1">{data?.view_count.toLocaleString()} views</Text>
        <Icon20CircleSmallFilled />
        <Text weight="1">{timeAgo(data?.timestamp)}</Text>
    </MetaContainer>
)

const MetaSkeleton = () => (
    <MetaContainer>
        <div className="flex md:gap-3">
            <VKSkeleton width={120} />
            <VKSkeleton width={90} />
        </div>
    </MetaContainer>
)

const Meta = ({ data }: { data: VideoData | undefined }) => (
    data ? <MetaItem data={data} /> : <MetaSkeleton />
)

export default Meta;
