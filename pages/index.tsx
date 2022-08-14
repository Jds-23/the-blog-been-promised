import PostCard from "@components/PostCard";
import { getAllPosts } from "lib/api";
import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
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
  const [viewsmap, setviewsmap] = useState<{ [key: string]: number }>();
  useEffect(() => {
    fetch("/api/getPosts")
      .then((res) => res.json())
      .then((res) => {
        let viewsmap: { [key: string]: number } = {};
        res.map((i: { postId: string; viewed: number }) => {
          viewsmap = { ...viewsmap, [i.postId]: i.viewed };
        });
        setviewsmap(viewsmap);
      });
  }, [setviewsmap]);
  return (
    <div>
      <Head>
        <title>Joydeeeep&#39;s Blog</title>
        <meta name="description" content="Web3 blog by web3 nerd." />
      </Head>
      <div className="w-full max-w-[912px] mx-auto">
        <div className=" relative flex flex-col items-center mb-7 sm:mb-12 ">
          <a
            href="https://twitter.com/0xJoydeeeep"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={"/jds.jpg"}
              className="object-contain cursor-pointer transition hover:scale-[1.01] hover:rotate-2 mt-20 border-2 border-black mb-3 border-solid w-full max-w-[250px] rounded-2xl"
            />
          </a>
          <a
            href="https://twitter.com/0xJoydeeeep"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black cursor-pointer hover:underline text-[32px] mb-2 font-bold"
          >
            Joydeep Singha
          </a>
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
            {posts.map((i) => {
              return (
                <PostCard
                  slug={i.slug}
                  key={i.slug}
                  title={i.title}
                  date={i.date}
                  viewed={viewsmap && viewsmap[i.slug]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
