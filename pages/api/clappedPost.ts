import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function main(req: NextApiRequest, res: NextApiResponse) {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here
  const { postId } = req.body;
  const posts = await prisma.posts.findMany({
    where: {
      postId,
    },
  });
  if (posts.length === 0) {
    const result = await prisma.posts.create({
      data: {
        postId,
        viewed: 1,
        clapped: 0,
      },
    });
    res.json(result);
  } else if (posts.length > 0) {
    const result = await prisma.posts.update({
      where: {
        id: posts[0].id,
      },
      data: {
        // postId,
        clapped: posts[0].clapped + 1,
      },
    });
    res.json(result);
  } else {
    res.writeHead(500);
    res.end(
      JSON.stringify({
        status: "fail",
        message: "Upload error",
      })
    );
  }
}

export default main;
