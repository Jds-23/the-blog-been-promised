import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function main(req: NextApiRequest, res: NextApiResponse) {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here
  const { postId } = req.query;
  let posts;
  if (typeof postId === "string") {
    posts = await prisma.posts.findMany({
      where: {
        postId,
      },
    });
  } else {
    posts = await prisma.posts.findMany();
  }
  res.json(posts);
}

export default main;
