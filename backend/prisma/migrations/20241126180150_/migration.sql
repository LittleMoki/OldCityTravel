/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `tour` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `TourTranslate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TourTranslate" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tour" ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tour_url_key" ON "tour"("url");
