/*
  Warnings:

  - Added the required column `path` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "path" TEXT NOT NULL;
