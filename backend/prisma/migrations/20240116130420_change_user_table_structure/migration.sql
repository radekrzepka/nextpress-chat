/*
  Warnings:

  - You are about to drop the `UserPassword` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserPassword" DROP CONSTRAINT "UserPassword_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isEmailAuthenticated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserPassword";
