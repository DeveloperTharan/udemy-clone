import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { UiProviders } from "@/provider/ui-provider";
import { Toaster } from "react-hot-toast";

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
          <UiProviders>{children}</UiProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
