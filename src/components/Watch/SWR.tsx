import React, { ReactNode, useState } from 'react';
import useSWR from 'swr';
import { VideoData } from './types';
import InvisibleTurnstile from './Turnstile';

const fetcher = (url: string, apiSecret: string): Promise<VideoData> => fetch(url, {
    headers: {
        'x-secret': apiSecret
    }
}).then((res) => res.json());

type SWRComponentProps = {
    videoId: string;
    time_start: number;
    children: (data: VideoData | undefined, error: any) => ReactNode;
};

const SWRComponent: React.FC<SWRComponentProps> = ({ videoId, time_start, children }) => {
    const [token, setToken] = useState<string | null>(null);
    
    const { data, error } = useSWR<VideoData>(
        token ? [`https://${process.env.NEXT_PUBLIC_API_HOST}/v1/video/${videoId}`, token] : null,
        ([url, apiSecret]: [string, string]) => fetcher(url, apiSecret),
        {
            revalidateOnFocus: false,
        }
    );

    if (data) {
        data.time_start = time_start;
    }

    return (
        <>
            <InvisibleTurnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE as string}
                onToken={(newToken) => setToken(newToken)}
            />
            {children(data, error)}
        </>
    );
};

export default SWRComponent;
