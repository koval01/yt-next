'use client'

import { Accordion, Div, EllipsisText, Text, Group, Skeleton as VKSkeleton } from "@vkontakte/vkui";
import { useState } from "react";

const Sekeleton = () => (
    <Div className="pl-1">
        <VKSkeleton height={20} width={9999} />
    </Div>
)

const DescriptionItem = ({ text }: { text: string }) => {
    const [opened, setOpened] = useState<boolean>(false);

    return (
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
    )
}

const Description = ({ description }: { description: string | null | undefined }) => (
    <Div className="max-w-full m-auto p-2 pl-0">
        <Group className="mx-3">
            {description ? <DescriptionItem text={description} /> : <Sekeleton />}
        </Group>
    </Div>
)

export default Description;
