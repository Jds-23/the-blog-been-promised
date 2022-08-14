import Link from "next/link";
import React from "react";
import DateFormatter from "./DateFormatter";
import { EyeIcon } from "@heroicons/react/outline";
import nFormatter from "utils/nFormatter";

const PostCard = ({
  title,
  date,
  slug,
  viewed,
}: {
  title: string;
  date: string;
  slug: string;
  viewed: number | undefined;
}) => {
  return (
    <Link href={`/blog/${slug}`}>
      <a className="border-2 flex flex-col rounded-xl min-h-28 border-black p-2 border-solid transition-all hover:scale-[1.01]">
        <h2 className="font-bold mb-2 leading-5 tracking-tighter text-xl">
          {title}
        </h2>
        <div className="flex mt-auto justify-between">
          <span className="text-sm">
            <DateFormatter dateString={date} />
          </span>
          {viewed && (
            <div className="text-sm flex items-center">
              {nFormatter(viewed, 3)}
              <EyeIcon className="text-gray-600 h-4 w-4 " />
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default PostCard;
