'use client'

import { useEffect } from "react";

import { Group, Panel, View, PanelHeader, Spacing, Flex, Div } from "@vkontakte/vkui";
import Player from "./Player";

import GlobalContainer from "@/components/Container";
import Description from "./Description";
import Title from "./Title";
import Comments from "./Comments";
import SWRComponent from "./SWR";
import RefreshComponent from "./Refresh";

import { VideoData } from "./types";
import { MediaErrorDetail, MediaErrorEvent } from "@vidstack/react";

interface ContentProps {
    data: VideoData | undefined,
    error: any,
    playerOnError: ((detail: MediaErrorDetail, nativeEvent: MediaErrorEvent) => void) | undefined
}

interface ContainerProps {
    videoId: string;
    time_start: number;
}

const Content = ({ data, playerOnError }: ContentProps) => {
    useEffect(() => {
        if (data?.title) {
            document.title = `${data.title} - YouTube Next`;
        } else {
            document.title = 'YouTube Next';
        }
    }, [data?.title]);

    return (
        <Div>
            <Player data={data} onError={playerOnError} />
            <Spacing size={12} />
            <Flex direction="column" gap="xl" className="max-w-full">
                <Title title={data?.title} />
                <Description data={data} />
            </Flex>
            {/* <Spacing size={8} /> */}
            {/* <RelatedVideos data={data} /> */}
            <Comments data={data} />
        </Div>
    )
}

export default function Container({ videoId, time_start }: ContainerProps) {
    return (
        <View activePanel="home">
            <Panel id="home">
                <PanelHeader>YouTube Next</PanelHeader>
                <GlobalContainer>
                    <SWRComponent videoId={videoId} time_start={time_start}>
                        {(data, error, handleRefetch) => (
                            <RefreshComponent onRefreshCallback={handleRefetch}>
                                <Group className="!p-0">
                                    <Content data={data} error={error} playerOnError={handleRefetch} />
                                </Group>
                            </RefreshComponent>
                        )}
                    </SWRComponent>
                </GlobalContainer>
            </Panel>
        </View>
    );
}
