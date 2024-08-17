'use client'

import { Group, Panel, View, PanelHeader, Spacing, Flex, Div } from "@vkontakte/vkui";
import Player from "./Player";

import GlobalContainer from "@/components/Container";
import Description from "./Description";
import Title from "./Title";
import SWRComponent from "./SWR";

import { VideoData } from "./types";

interface ContainerItemProps {
    data: VideoData | undefined;
    error: any;
};

interface ContainerProps {
    videoId: string;
    time_start: number;
}

const Content = ({ data }: { data: VideoData | undefined }) => (
    <Div>
        <Player data={data} />
        <Spacing size={12} />
        <Flex direction="column" gap="xl">
            <Title title={data?.title} />
            <Description data={data} />
        </Flex>
        <Spacing size={16} />
        {/* <RelatedVideos data={data} /> */}
    </Div>
)

const ContainerItem: React.FC<ContainerItemProps> = ({ data, error }) => {
    return error ? <></> : <Content data={data} />;
};

export default function Container({ videoId, time_start }: ContainerProps) {
    return (
        <View activePanel="home">
            <Panel id="home">
                <PanelHeader>YouTube Next</PanelHeader>
                <GlobalContainer>
                    <Group>
                        <SWRComponent videoId={videoId} time_start={time_start}>
                            {(data, error) => <ContainerItem data={data} error={error} />}
                        </SWRComponent>
                    </Group>
                </GlobalContainer>
            </Panel>
        </View>
    );
}
