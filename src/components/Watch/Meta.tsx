import { Text, Skeleton as VKSkeleton, Flex } from "@vkontakte/vkui";
import { VideoData } from "./types"
import { timeAgo } from "@/lib/time";

const MetaContainer = ({ children }: { children: JSX.Element[] }) => (
    <Flex className="pl-3">
        {children}
    </Flex>
)

const MetaItem = ({ data }: { data: VideoData }) => (
    <MetaContainer>
        <Text weight="1">{data?.view_count.toLocaleString()} views</Text>
        <Text weight="1">{timeAgo(data?.timestamp)}</Text>
    </MetaContainer>
)

const MetaSkeleton = () => (
    <MetaContainer>
        <VKSkeleton width={120} />
        <VKSkeleton width={90} />
    </MetaContainer>
)

const Meta = ({ data }: { data: VideoData | undefined }) => (
    data ? <MetaItem data={data} /> : <MetaSkeleton />
)

export default Meta;
