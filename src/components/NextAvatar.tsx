import React from 'react';

import { Avatar } from "@vkontakte/vkui";
import { Icon28UserCircleOutline } from '@vkontakte/icons';

interface NextAvatarProps {
    src?: string;
    size?: number;
    [key: string]: any;
}

const NextAvatar: React.FC<NextAvatarProps> = ({ src, size = 48, ...props }) => {
    const modifiedSrc = src ? `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75` : undefined;

    return <Avatar src={modifiedSrc} fallbackIcon={<Icon28UserCircleOutline />} size={size} {...props} />;
};

export default NextAvatar;
