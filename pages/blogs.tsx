import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Blogs: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Joydeeeep&#39;s Blog</title>
        <meta name="description" content="Web3 blog by web3 nerd." />
      </Head>
      <div className="w-full max-w-[912px] mx-auto">
        <div className=" relative grid grid-cols-1 pt-20 gap-5">
          <div className="flex flex-col">
            <h2 className="font-bold text-xl">
              Build on-Chain Dynamic NFT using Tableland
            </h2>
            <p className="leading-5	">
              Rust helps developers write fast software that&#39;s
              memory-efficient. It&#39;s a modern replacement for languages like
              C++ or C with a focus on code safety and concise syntax.
            </p>
            <span className="text-sm mt-auto">23 days ago</span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-xl">
              Build on-Chain Dynamic NFT using Tableland
            </h2>
            <p className="leading-5	">
              Rust helps developers write fast software that&#39;s
              memory-efficient. It&#39;s a modern replacement for languages like
              C++ or C with a focus on code safety and concise syntax.
            </p>
            <span className="text-sm mt-auto">23 days ago</span>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Blogs;
