import { Prisma, PrismaClient } from "@prisma/client";

const MODELS_SUPPORTING_SOFT_DELETE = ["Post"] as const;

export const prisma = new PrismaClient({
  log: [{ emit: "event", level: "query" }],
});

prisma.$use(async (params, next) => {
  const supportedModels = MODELS_SUPPORTING_SOFT_DELETE as readonly string[];

  if (params.model && supportedModels.includes(params.model)) {
    // Change 'findUnique' actions to 'findFirst' as you cannot filter by
    // anything except ID / unique with findUnique, which adding the 'deletedAt'
    // check breaks.
    if (params.action === "findUnique" || params.action === "findFirst") {
      params.action = "findFirst";
      params.args.where.deletedAt = null;
    }

    // Handle similar actions as above but with 'OrThrow' as Prisma uses a
    // separate action for that.
    if (
      params.action === "findUniqueOrThrow" ||
      params.action === "findFirstOrThrow"
    ) {
      params.action = "findFirstOrThrow";
      params.args.where.deletedAt = null;
    }

    // Exclude deleted records from 'findMany' only if they have not been
    // explicitly requested. Default to non-deleted records if filters are
    // left unspecified.
    if (params.action === "findMany") {
      if (params.args.where) {
        if (params.args.where.deletedAt === undefined) {
          params.args.where.deletedAt = null;
        }
      } else {
        params.args.where = { deletedAt: null };
      }
    }
  }

  return next(params as Prisma.MiddlewareParams);
});
