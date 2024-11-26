/*
  Warnings:

  - You are about to drop the column `name` on the `tour` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `tourDays` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tourDays` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tour" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "tourDays" DROP COLUMN "description",
DROP COLUMN "name";

-- CreateTable
CREATE TABLE "TourTranslate" (
    "id" SERIAL NOT NULL,
    "tourId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TourTranslate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tourDaysTranslation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tourDaysId" INTEGER NOT NULL,

    CONSTRAINT "tourDaysTranslation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TourTranslate" ADD CONSTRAINT "TourTranslate_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourDaysTranslation" ADD CONSTRAINT "tourDaysTranslation_tourDaysId_fkey" FOREIGN KEY ("tourDaysId") REFERENCES "tourDays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
