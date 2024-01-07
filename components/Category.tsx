"use client";

import React from "react";

import { Tabs, Tab } from "@nextui-org/react";

import {
  Aperture,
  CandlestickChart,
  Clapperboard,
  Cpu,
  Dumbbell,
  Laptop2,
  Music,
} from "lucide-react";

const Category = () => { 
  const TabMenu = [
    { id: 1, title: "Finance", icon: <CandlestickChart className="h-4 w-4 text-green-600" /> },
    { id: 2, title: "Computer Science", icon: <Laptop2 className="h-4 w-4 text-blue-600" /> },
    { id: 3, title: "Enginering", icon: <Cpu className="h-4 w-4 text-red-600" /> },
    { id: 4, title: "Filming", icon: <Clapperboard className="h-4 w-4 text-purple-600" /> },
    { id: 5, title: "Fitness", icon: <Dumbbell className="h-4 w-4 text-red-600" /> },
    { id: 6, title: "Music", icon: <Music className="h-4 w-4 text-pink-600" /> },
    { id: 7, title: "Photography", icon: <Aperture className="h-4 w-4 text-blue-600" /> },
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
            <div className="">{items.title}</div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Category;
