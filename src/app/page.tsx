'use client';

import { Group, Panel, View, PanelHeader, Header } from "@vkontakte/vkui";

import Container from "@/components/Container";

export default function Home() {
  return (
    <View activePanel="home">
      <Panel id="home">
        <PanelHeader>YouTube Next</PanelHeader>
        <Container>
          <Group header={<Header mode="secondary">Container</Header>}>
          </Group>
        </Container>
      </Panel>
    </View>
  );
}
