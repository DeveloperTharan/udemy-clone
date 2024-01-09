import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { UiProviders } from "@/provider/ui-provider";

const inter = Inter({ subsets: ["latin"] });

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
          className={`w-full max-w-[1440px] h-auto min-h-full mx-auto ${inter.className}`}
        >
          <Toaster position="bottom-right" gutter={8} reverseOrder={false} />
          <UiProviders>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </UiProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
