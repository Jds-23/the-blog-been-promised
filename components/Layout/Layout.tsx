import Header from "@components/Header";
import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full px-4 relative z-0 min-h-screen">
      <Header />
      <div className="top-0 left-0 fixed w-full min-h-screen bg-bg-main bg-no-repeat bg-cover bg-center" />
      {children}
    </div>
  );
};

export default Layout;
