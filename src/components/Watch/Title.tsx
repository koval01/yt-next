'use client'

import { DisplayTitle, Skeleton as Skeleton } from "@vkontakte/vkui";

const Title = ({ title }: { title: string | undefined }) => (
    <DisplayTitle className="select-text max-w-full">
        {title ? title : <Skeleton maxWidth={480} />}
    </DisplayTitle>
)

export default Title;
