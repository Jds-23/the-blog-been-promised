import { getAllPosts } from "lib/api";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "cover",
    "description",
  ]);

  return {
    props: { posts: allPosts },
  };
};
const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Joydeeeep&#39;s Blog</title>
        <meta name="description" content="Web3 blog by web3 nerd." />
      </Head>
      <div className="w-full max-w-[912px] mx-auto">
        <div className=" relative flex flex-col items-center mb-7 sm:mb-12 ">
          <img
            src={"/jds.jpg"}
            className="object-contain mt-20 border-2 border-black mb-3 border-solid w-full max-w-[250px] rounded-2xl"
          />
          <h1 className="text-black text-[32px] mb-2 font-bold">
            Joydeep Singha
          </h1>
          <h2 className="text-center w-full max-w-[403px]">
            Learning 📖 & Building 🛠 on web3. I mostly build using NextJs,
            TypeScript, Tailwind, Polgon & IPFS.{" "}
          </h2>
        </div>
        <div className="relative">
          <span className="text-black text-[32px] mb-6 font-bold">
            My Posts
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div className="border-2 flex flex-col rounded-xl h-28 border-black p-3 border-solid">
              <h2 className="font-bold text-xl">
                Build on-Chain Dynamic NFT using Tableland
              </h2>
              <span className="text-sm mt-auto">23 days ago</span>
            </div>
            <div className="border-2 flex flex-col rounded-xl h-28 border-black p-3 border-solid">
              <h2 className="font-bold text-xl">
                Build on-Chain Dynamic NFT using Tableland
              </h2>
              <span className="text-sm mt-auto">23 days ago</span>
            </div>
            <div className="border-2 flex flex-col rounded-xl h-28 border-black p-3 border-solid">
              <h2 className="font-bold text-xl">
                Build on-Chain Dynamic NFT using Tableland
              </h2>
              <span className="text-sm mt-auto">23 days ago</span>
            </div>
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

export default Home;
