"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Switch } from "@nextui-org/react";

import { Moon, SunMedium } from "lucide-react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSetTheme = () => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Switch
      size="sm"
      color="default"
      className="bg-black"
      startContent={<Moon />}
      endContent={<SunMedium />}
      onChange={handleSetTheme}
      defaultSelected={theme === "dark"}
    />
  );
};
