import type { Metadata, Viewport } from "next";

import { Root } from '@/components/Root/Root';

export const metadata: Metadata = {
  title: "YouTube Next",
  description: "Unoffical YouTube client writed with Next.JS",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#19191a"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Root>
          {children}
        </Root>
      </body>
    </html>
  );
}
