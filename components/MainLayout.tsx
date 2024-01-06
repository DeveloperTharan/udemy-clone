import React from "react";
import MainHeader from "./MainHeader";
import Category from "./Category";
import Footer from "./Footer";
import Carousel from "./Carousel";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <Category />
      <Carousel />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
