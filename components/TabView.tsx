"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

export default function TabView() {
  const TabMenu = [
    { id: 1, title: "Finance" },
    { id: 2, title: "Computer Science" },
    { id: 3, title: "Enginering" },
    { id: 4, title: "Filming" },
    { id: 5, title: "Fitness" },
    { id: 6, title: "Music" },
    { id: 7, title: "Photography" },
  ];

  return (
    <div className="flex w-full flex-col">
      <Tabs variant={"underlined"} aria-label="Tabs variants">
        {TabMenu.map((items) => (
          <Tab key={items.id} title={items.title}>
            <div className="px-10 border">{items.title}</div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
