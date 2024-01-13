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
import { Category } from "@prisma/client";

const IconMap: Record<Category["name"], JSX.Element> = {
  "Computer Science": <Laptop2 size={17} className="text-violet-500" />,
  "Engineering": <Cpu size={17} className="text-red-500" />,
  "Finance": <CandlestickChart size={17} className="text-green-500" />,
  "Filming": <Clapperboard size={17} className="text-bue-500" />,
  "Fitness": <Dumbbell size={17} className="text-purple-500" />,
  "Music": <Music size={17} className="text-pink-500" />,
  "Photography": <Aperture size={17} className="text-blue-500" />,
};

const Category = ({ category }: { category: Category[] }) => {
  return (
    <div className="flex w-full flex-col my-2">
      <Tabs variant={"light"} aria-label="Tabs variants" fullWidth>
        {category.map((items) => (
          <Tab
            key={items.id}
            title={
              <div className="flex items-center space-x-2">
                {IconMap[items.name]}
                <span>{items.name}</span>
              </div>
            }
          >
            <div className="">{items.name}</div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Category;
