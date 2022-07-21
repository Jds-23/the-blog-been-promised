import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

const Header = () => {
  return (
    <div className="w-full z-10 fixed top-0 left-0">
      <div className="w-full mx-auto max-w-[912px] flex items-center my-5">
        <NavItems to="/">Home</NavItems>
        <NavItems to="/blogs">Blogs</NavItems>
      </div>
    </div>
  );
};
const NavItems = ({ children, to }: { children: ReactNode; to: string }) => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <Link href={to}>
      <a
        className={`${
          router.pathname === to ? "font-bold" : "text-[#5e5e5e]"
        } text-2xl ml-2`}
      >
        {children}
      </a>
    </Link>
  );
};
export default Header;
