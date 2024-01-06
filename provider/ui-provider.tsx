"use client";

import { NextUIProvider } from "@nextui-org/react";

export function UiProviders({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
