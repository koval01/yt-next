import React, { ReactNode } from 'react';
import useSWR from 'swr';
import { VideoData } from './types';

const fetcher = (url: string, apiSecret: string): Promise<VideoData> => fetch(url, {
    headers: {
        'x-secret': apiSecret
    }
}).then((res) => res.json());

type SWRComponentProps = {
    videoId: string;
    time_start: number;
    secret: string | null;
    children: (data: VideoData | undefined, error: any) => ReactNode;
};

const SWRComponent: React.FC<SWRComponentProps> = ({ videoId, time_start, secret, children }) => {
    const { data, error } = useSWR<VideoData>(
        [`https://${process.env.NEXT_PUBLIC_API_HOST}/v1/video/${videoId}`, secret], 
        ([url, apiSecret]: [string, string]) => fetcher(url, apiSecret), 
        {
            revalidateOnFocus: false,
        }
    );

    if (data) {
        data.time_start = time_start;
    }

    return children(data, error);
};

export default SWRComponent;
