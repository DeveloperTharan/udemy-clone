import React from "react";

import MainHeader from "@/components/MainHeader";
import Category from "@/components/Category";
import Footer from "@/components/Footer";

export default function Main() {
  return (
    <>
      <MainHeader />
      <div className="flex flex-col w-full h-full min-h-full px-5">
        <Category />
      </div>
      <Footer />
    </>
  );
}
