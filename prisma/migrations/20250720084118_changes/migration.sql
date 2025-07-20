/*
  Warnings:

  - You are about to drop the column `aiUser` on the `resumes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resumes" DROP COLUMN "aiUser",
ADD COLUMN     "aiUsed" BOOLEAN;
