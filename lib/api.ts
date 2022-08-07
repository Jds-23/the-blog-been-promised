import fs, { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";

import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}
export async function getFileBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");

  const source = readFileSync(
    join(process.cwd(), "_posts", `${realSlug}.mdx`),
    "utf8"
  );
  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ];
      return options;
    },
  });

  return {
    code,
    frontMatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      ...frontmatter,
    },
  };
}
export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const isMainnet = process.env.IS_MAINNET === "true";
  const posts = slugs
    .map((slug) => getPostBySlug(slug, ["published", ...fields]))
    // sort posts by date in descending order
    .filter((post) => (isMainnet ? post.published : true))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
