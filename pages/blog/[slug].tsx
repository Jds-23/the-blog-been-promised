import CoverImage from "@components/CoverImage";
import DateFormatter from "@components/DateFormatter";
import PostBody from "@components/PostBody";
import { getAllPosts, getPostBySlug } from "lib/api";
import markdownToHtml from "lib/markdownToHtml";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
export type Tag = {
  color: string;
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  cover: string;
  title: string;
  tags: Tag[];
  description: string;
  date: string;
  content: string;
};

type Props = {
  post: BlogPost;
  preview?: boolean;
};

const Blog = ({ post }: Props) => {
  const router = useRouter();
  console.log(post);
  return (
    <div>
      {" "}
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article className="mt-20 w-full max-w-2xl mx-auto mb-32 relative">
            <Head>
              <title>{post.title} | Blog by Joydeep</title>
              <meta property="og:image" content={post.cover} />
            </Head>
            {/* <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            /> */}
            <h1 className="tracking-tight mb-4 text-3xl font-bold text-black md:text-5xl dark:text-white">
              {post.title}
            </h1>
            <CoverImage src={post.cover} title={post.title} />
            <DateFormatter dateString={post.date} />

            <PostBody content={post.content} />
          </article>
        </>
      )}
    </div>
  );
};

export default Blog;
type Params = {
  params: {
    slug: string;
  };
};
export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "cover",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
