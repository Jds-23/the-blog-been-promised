import Link from "next/link";
import React from "react";
import DateFormatter from "./DateFormatter";

const PostCard = ({
  title,
  date,
  slug,
}: {
  title: string;
  date: string;
  slug: string;
}) => {
  return (
    <Link href={`/blog/${slug}`}>
      <a className="border-2 flex flex-col rounded-xl min-h-28 border-black p-2 border-solid">
        <h2 className="font-bold mb-2 leading-5 tracking-tighter text-xl">
          {title}
        </h2>
        <span className="text-sm mt-auto">
          <DateFormatter dateString={date} />
        </span>
      </a>
    </Link>
  );
};

export default PostCard;
