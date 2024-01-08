"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

import Analytics from "./Analytics";
import Courses from "./Courses";

import { BarChart, MenuIcon } from "lucide-react";

const TeachersTab = () => {
  const TabMenu = [
    {
      id: 1,
      title: "Courses",
      icon: <MenuIcon className="h-4 w-4" />,
      page: <Courses />,
    },
    {
      id: 2,
      title: "Analytics",
      icon: <BarChart className="h-4 w-4" />,
      page: <Analytics />,
    },
  ];

  return (
    <div className="flex w-full flex-col my-2">
      <Tabs variant={"light"} aria-label="Tabs variants" fullWidth>
        {TabMenu.map((items) => (
          <Tab
            key={items.id}
            title={
              <div className="flex items-center space-x-2">
                {items.icon}
                <span>{items.title}</span>
              </div>
            }
          >
            {items.page}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default TeachersTab;
