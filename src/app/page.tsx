'use client';

import { Group, Panel, View, PanelHeader, Div, Banner, Spacing } from "@vkontakte/vkui";
import { useRouter } from "next/navigation";

import Container from "@/components/Container";

export default function Home() {
  const router = useRouter();

  return (
    <View activePanel="home">
      <Panel id="home">
        <PanelHeader>YouTube Next</PanelHeader>
        <Container>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Group mode="plain">
              <Div>
                <Banner
                  header="There is nothing on this page"
                  subheader="Use an address like /watch/{videoId}"
                  asideMode="expand"
                  onClick={() => router.push("/watch/dQw4w9WgXcQ")}
                />
              </Div>
            </Group>
          </div>
        </Container>
      </Panel>
    </View>
  );
}
