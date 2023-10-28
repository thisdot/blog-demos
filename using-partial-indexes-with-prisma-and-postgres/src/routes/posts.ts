import { prisma } from "@/prisma";
import { Router } from "express";

const router = Router();

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const post = await prisma.post.findFirstOrThrow({ where: { slug } });
  res.json(post);
});

router.put("/:slug", async (req, res) => {
  const { slug } = req.params;
  const { title, content, authorId } = req.body;

  const newPost = await prisma.post.create({
    data: { slug, title, content, authorId, publishedAt: new Date() },
  });
  res.status(201).json(newPost);
});

router.delete("/:slug", async (req, res) => {
  const { slug } = req.params;

  const existingPost = await prisma.post.findFirst({ where: { slug } });
  if (!existingPost) {
    return res.sendStatus(404);
  }

  await prisma.post.updateMany({
    where: { slug },
    data: { deletedAt: new Date() },
  });
  res.sendStatus(204);
});

export default router;
