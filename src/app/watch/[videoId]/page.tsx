'use client'

import { Panel, View, PanelHeader } from "@vkontakte/vkui";

import WatchItem from "@/components/Watch";
import Container from "@/components/Container";

import { useSearchParams } from "next/navigation";


export default function Watch({ params }: { params: { videoId: string } }) {
    const query = useSearchParams();
    const timeStart = parseInt(query.get("t") || "0");

    return (
        <View activePanel="home">
            <Panel id="home">
                <PanelHeader>YouTube Next</PanelHeader>
                <Container>
                    <WatchItem videoId={params.videoId} timeStart={timeStart} />
                </Container>
            </Panel>
        </View>
    );
}
