import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

const Header = () => {
  return (
    <div className="w-full px-4 z-10 fixed top-0 left-0">
      <div className="w-full mx-auto max-w-[912px] flex items-center my-5">
        <NavItems className="mr-2" to="/">
          Home
        </NavItems>
        <NavItems to="/blogs">Blogs</NavItems>
      </div>
    </div>
  );
};
const NavItems = ({
  children,
  to,
  className,
}: {
  children: ReactNode;
  to: string;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <Link href={to}>
      <a
        className={`${
          router.pathname === to ? "font-bold" : "text-[#5e5e5e]"
        } text-2xl ${className ? className : ""}`}
      >
        {children}
      </a>
    </Link>
  );
};
export default Header;
