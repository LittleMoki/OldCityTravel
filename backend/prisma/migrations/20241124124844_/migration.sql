/*
  Warnings:

  - Added the required column `language` to the `tourDaysTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tourDaysTranslation" ADD COLUMN     "language" TEXT NOT NULL;
