import { Group, Panel, View, PanelHeader, Spacing, Flex, Div } from "@vkontakte/vkui";
import Player from "./Player";
import useSWR from 'swr';

import GlobalContainer from "@/components/Container";
import Description from "./Description";
import Title from "./Title";

import { VideoData } from "./types";
import RelatedVideos from "./RelatedVideos";

const fetcher = (url: string): Promise<VideoData> => fetch(url).then((res) => res.json());

interface ContainerProps {
    videoId: string;
    timeStart: number;
}

const Content = ({ data }: { data: VideoData | undefined }) => (
    <Div>
        <Player data={data} />
        <Spacing size={12} />
        <Flex direction="column" gap="2xl">
            <Title title={data?.videoDetails.title} />
            <Description description={data?.videoDetails.description} />
        </Flex>
        <Spacing size={16} />
        <RelatedVideos data={data} />
    </Div>
)

export default function Container({ videoId, timeStart }: ContainerProps) {
    const { data, error } = useSWR<VideoData>(`/api/video/${videoId}`, fetcher);

    // if (error) return <div>Failed to load</div>
    // if (!data) return <div>Loading...</div>
    
    if (data) {
        // add client-side params
        data.timeStart = timeStart;
    }

    return (
        <View activePanel="home">
            <Panel id="home">
                <PanelHeader>YouTube Next</PanelHeader>
                <GlobalContainer>
                    <Group>
                        <Content data={data} />
                    </Group>
                </GlobalContainer>
            </Panel>
        </View>
    );
}
