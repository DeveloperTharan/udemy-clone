"use client";

import React, { useState } from "react";
import Image from "next/image";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";

export const Carousel = () => {
  return (
    <ResponsiveCarousel autoPlay={true} infiniteLoop={true} autoFocus={true} interval={5000}>
      <div className="w-full h-52 lg:h-96 relative">
        <Image src="/carousel_1.jpg" alt="learn" fill />
        <div className="absolute top-[20%] left-20 w-96 h-fit p-7 shadow-large text-black hidden lg:block">
          <h2 className="text-3xl font-extrabold">Go on, make a wish</h2>
          <p className="text-sm font-normal">
            Did you know you can wishlist the courses you’re interested in? Just
            click the heart button.
          </p>
        </div>
      </div>
      <div className="w-full h-52 lg:h-96 relative">
        <Image src="/carousel_2.jpg" alt="learn" fill />
        <div className="absolute top-[20%] left-20 w-96 h-fit p-7 shadow-large bg-background/70 hidden lg:block">
          <h2 className="text-3xl font-extrabold">
            Skill up with the Leading Up podcast
          </h2>
          <p className="text-sm font-normal">
            Listen to Season 5 and learn to work, lead, and live better. New
            episodes drop on Wednesdays.
          </p>
        </div>
      </div>
      <div className="w-full h-52 lg:h-96 relative">
        <Image src="/carousel_3.jpg" alt="learn" fill />
        <div className="absolute top-[20%] left-20 w-96 h-fit p-7 shadow-large text-black hidden lg:block">
          <h2 className="text-3xl font-extrabold">Powered by community</h2>
          <p className="text-sm font-normal">
            Trust ratings and reviews to make a smarter choice. Get started with
            our top-rated courses.
          </p>
        </div>
      </div>
    </ResponsiveCarousel>
  );
};
