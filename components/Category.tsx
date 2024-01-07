"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

const Category = () => {
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
    <div className="flex w-full flex-col my-2">
      <Tabs variant={"light"} aria-label="Tabs variants" fullWidth>
        {TabMenu.map((items) => (
          <Tab key={items.id} title={items.title}>
            <div className="">{items.title}</div>
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}

export default Category