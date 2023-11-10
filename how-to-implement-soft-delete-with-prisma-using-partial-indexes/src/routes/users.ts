import { prisma } from "@/prisma";
import { Router } from "express";

const router = Router();

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  const user = await prisma.user.findUniqueOrThrow({ where: { email } });
  res.json(user);
});

router.put("/:email", async (req, res) => {
  const { email } = req.params;
  const { name } = req.body;
  const newUser = await prisma.user.create({ data: { email, name } });
  res.status(201).json(newUser);
});

export default router;
