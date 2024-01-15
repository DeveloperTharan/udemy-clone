import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { UiProviders } from "@/provider/ui-provider";
import UserProvider from "@/context/userContext";

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'greek', 'cyrillic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Udemy",
  description: "Udemy Course provider for your learning needs and goals",
  icons: {
    icon: [
      {
        url: "/meta-logo.webp",
        href: "/meta-logo.webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`w-full max-w-[1440px] h-auto min-h-full mx-auto ${roboto.className}`}
        >
          <Toaster position="bottom-right" gutter={8} reverseOrder={false} />
          <UiProviders>
            <UserProvider>{children}</UserProvider>
          </UiProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
