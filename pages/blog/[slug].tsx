import CoverImage from "@components/CoverImage";
import DateFormatter from "@components/DateFormatter";
import MDXcomponents from "@components/MDXcomponents";
import { getAllPosts, getPostBySlug } from "lib/api";
import markdownToHtml from "lib/markdownToHtml";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import nFormatter from "utils/nFormatter";
import { EyeIcon } from "@heroicons/react/outline";
import readingTime from "reading-time";

export type Tag = {
  color: string;
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  cover: string;
  title: string;
  tags: Tag[];
  description: string;
  date: string;
  readingtime: number;
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
  const [views, setviews] = useState<number>();
  useEffect(() => {
    if (post?.slug) {
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ postId: post.slug }),
      };

      fetch("/api/viewedPost", options)
        .then((response) => response.json())
        .then((response) => setviews(response.viewed))
        .catch((err) => console.error(err));
    }
  }, [post]);
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
              <meta property="og:site_name" content="Joydeep Singha" />
              <meta property="og:image" content={post.cover} />
              <meta name="twitter:description" content={post.description} />
              <meta name="twitter:title" content={post.title} />
              <meta name="twitter:image" content={post.cover} />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@joydeeeep" />
              <meta property="og:type" content="website" />
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
            <div className="flex justify-between">
              <span className="text-sm font-bold">
                <DateFormatter dateString={post.date} />
              </span>
              <div className="flex text-sm">
                {views && (
                  <div className="text-sm flex items-center">
                    {nFormatter(views, 3)}
                    {" views "}
                  </div>
                )}
                &nbsp;|<span>&nbsp;{post.readingtime.minutes} min read</span>
              </div>
            </div>
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
  const readingtime = readingTime(post.content);
  return {
    props: {
      post: {
        ...post,
        readingtime,
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
