'use client'

import React from "react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Footer from "@/components/Footer";
import TabView from "@/components/TabView";
import MainHeader from "@/components/MainHeader";

export default function Marketing() {
  const { isSignedIn } = useAuth();

  if(isSignedIn) redirect("/main");

  return (
    <>
      <MainHeader />
      <div className="px-2">
        <Image
          src="/marketing-banner2.jpg"
          alt="learning"
          width={1440}
          height={500}
        />
        <div className="mt-20 flex flex-col justify-start items-start gap-y-5 px-5">
          <h1 className="text-3xl font-bold">A broad selection of courses</h1>
          <p className="text-lg text-gray-500">
            Choose from over 210,000 online video courses with new additions
            published every month
          </p>
          <TabView/>
        </div>
      </div>
      <Footer/>
    </>
  );
}
