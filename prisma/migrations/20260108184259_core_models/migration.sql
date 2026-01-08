-- CreateEnum
CREATE TYPE "SocialType" AS ENUM ('GITHUB', 'TWITTER_X', 'STACK_OVERFLOW');

-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "globalScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialPlatform" (
    "id" TEXT NOT NULL,
    "platform" "SocialType" NOT NULL,
    "data" JSONB NOT NULL,
    "lastFetched" TIMESTAMP(3) NOT NULL,
    "developerId" TEXT NOT NULL,

    CONSTRAINT "SocialPlatform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Developer_username_key" ON "Developer"("username");

-- CreateIndex
CREATE INDEX "Developer_username_idx" ON "Developer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "SocialPlatform_developerId_platform_key" ON "SocialPlatform"("developerId", "platform");

-- AddForeignKey
ALTER TABLE "SocialPlatform" ADD CONSTRAINT "SocialPlatform_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
