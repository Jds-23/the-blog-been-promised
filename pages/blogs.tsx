import DateFormatter from "@components/DateFormatter";
import { getAllPosts } from "lib/api";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
const Blogs = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>Joydeeeep&#39;s Blog</title>
        <meta name="description" content="Web3 blog by web3 nerd." />
      </Head>
      <div className="w-full max-w-[912px] mx-auto">
        <div className=" relative grid grid-cols-1 pt-20 gap-5">
          {posts?.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <a className="flex flex-col" key={post.slug}>
                <h2 className="font-bold text-xl">{post.title}</h2>
                <p className="leading-5	">{post.description}</p>
                <span className="text-sm mt-auto">
                  <DateFormatter dateString={post.date} />
                </span>
              </a>
            </Link>
          ))}
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
