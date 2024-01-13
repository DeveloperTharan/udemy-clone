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



const Category = ({ category }: { category: Category[] }) => {
  return (
    <div className="flex w-full flex-col my-2">
      <Tabs variant={"light"} aria-label="Tabs variants" fullWidth>
        {category.map((items) => (
          <Tab
            key={items.id}
            title={
              <div className="flex items-center space-x-2">
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
