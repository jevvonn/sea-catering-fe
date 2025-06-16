import Navbar from "@/components/navigation/navbar";
import React from "react";

const MainLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MainLayout;
