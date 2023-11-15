import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export default async function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  const { message } = err;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(422).json({
        message: `The following fields must be unique: ${err.meta?.target}`,
      });
    } else if (err.code === "P2003") {
      return res
        .status(422)
        .json({ message: `Foreign key specified is invalid.` });
    } else if (err.code === "P2025") {
      return res.status(404).json({ message });
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ message });
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    return res.status(503).json({ message: "Cannot connect to database." });
  }

  return res.status(500).json({ message: "An unknown error has occurred." });
}
