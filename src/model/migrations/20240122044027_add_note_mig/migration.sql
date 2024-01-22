/*
  Warnings:

  - Added the required column `note` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "note" TEXT NOT NULL;
