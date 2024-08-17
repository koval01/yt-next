'use client'

import { Accordion, Div, EllipsisText, Text, Group, Skeleton as VKSkeleton, Flex } from "@vkontakte/vkui";
import { useState } from "react";
import { VideoData } from "./types";
import Meta from "./Meta";

const Sekeleton = () => (
    <Div className="pl-3">
        <VKSkeleton height={20} width={9999} />
    </Div>
)

const DescriptionContainer = ({ children }: { children: JSX.Element }) => (
    <Div className="p-0 md:p-2 md:pt-0.5">
        {children}
    </Div>
)

const DescriptionItem = ({ text }: { text: string }) => {
    const [opened, setOpened] = useState<boolean>(false);

    return (
        <DescriptionContainer>
            <Accordion
                expanded={opened}
                onChange={() => setOpened(!opened)}
            >
                <Accordion.Summary>
                    <EllipsisText className="opacity-60">
                        {text}
                    </EllipsisText>
                </Accordion.Summary>
                <Accordion.Content>
                    <Div>
                        <Text className="whitespace-pre-wrap">
                            {text}
                        </Text>
                    </Div>
                </Accordion.Content>
            </Accordion>
        </DescriptionContainer>
    )
}

const _DescriptionItem = ({ data }: { data: VideoData | undefined }) => (
    data ? <DescriptionItem text={data?.description} /> : <Sekeleton />
)

const Description = ({ data }: { data: VideoData | undefined }) => (
    <Div className="max-w-full w-full m-auto mt-3">
        <Group className="m-0">
            <Meta data={data} />
            <_DescriptionItem data={data} />
        </Group>
    </Div>
)

export default Description;
