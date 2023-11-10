CREATE UNIQUE INDEX "posts_slug_key"
    ON "posts" ("slug")
    WHERE "deleted_at" IS NULL;
