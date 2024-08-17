/** @type {import('next').NextConfig} */

import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// note: the if statement is present because you
//       only need to use the function during development
if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform()
}

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.ytimg.com'
            },
            {
                protocol: 'https',
                hostname: 'yt*.ggpht.com',
                pathname: '/ytc/**'
            }
        ],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768]
    }
};

export default nextConfig;
