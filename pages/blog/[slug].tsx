import CoverImage from "@components/CoverImage";
import DateFormatter from "@components/DateFormatter";
import MDXcomponents from "@components/MDXcomponents";
import { getAllPosts, getPostBySlug } from "lib/api";
import markdownToHtml from "lib/markdownToHtml";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

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
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
};

type Props = {
  post: BlogPost;
  preview?: boolean;
};

const Blog = ({ post }: Props) => {
  const router = useRouter();
  return (
    <div>
      {" "}
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article className="mt-20 w-full max-w-2xl mx-auto mb-32 relative">
            <Head>
              <title>{post.title as string} | Blog by Joydeep</title>
              <meta content={post.description} name="description"></meta>
              <meta content={post.description} property="og:description"></meta>
              <meta content={post.title} property="og:title"></meta>
              <meta property="og:image" content={post.cover} />
            </Head>
            <button
              onClick={() => router.back()}
              className="font-bold underline"
            >
              Back
            </button>
            <h1 className="tracking-tight mb-4 text-3xl font-bold text-black md:text-5xl ">
              {post.title}
            </h1>
            <CoverImage src={post.cover} title={post.title} />
            <span className="text-sm font-bold">
              <DateFormatter dateString={post.date} />
            </span>
            <div className="prose">
              <MDXRemote
                {...post.content}
                components={
                  {
                    ...MDXcomponents,
                  } as any
                }
              />
            </div>
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
    "description",
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
