import Footer from "@/components/Footer";
import MainHeader from "@/components/MainHeader";
import { SearchInput } from "@/components/SearchInput";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Udemy for Learning",
  description: "Udemy Course provider for your learning needs and goals",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full min-h-full">
      <MainHeader />
      <div className="lg:hidden w-full my-4 px-10 md:px-20">
        <SearchInput />
      </div>
      {children}
      <Footer />
    </div>
  );
}
