import Header from "@components/Header";
import Image from "next/image";
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
      <footer className={"relative flex flex-1 justify-center items-center"}>
        <div>
          {/* <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={"h-4 ml-2"}>
              <Image
                src="/vercel.svg"
                className=""
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a> */}
          <div className="flex items-center justify-center">
            <a
              href="https://twitter.com/0xJoydeeeep"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold underline"
            >
              Twitter
            </a>
            &nbsp;
            {` • `}
            &nbsp;
            <a
              href="https://github.com/Jds-23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
