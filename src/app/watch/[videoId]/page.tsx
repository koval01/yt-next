'use client';

export const runtime = 'edge';

import { Panel, View, PanelHeader } from "@vkontakte/vkui";

import { useSearchParams } from 'next/navigation'

import WatchItem from "@/components/Watch";
import Container from "@/components/Container";


export default function Watch({ params }: { params: { videoId: string } }) {
    const searchParams = useSearchParams();
    const timeStart = parseInt(searchParams.get('t') ?? "0");;

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
