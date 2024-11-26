/*
  Warnings:

  - You are about to drop the column `tourDaysId` on the `tour` table. All the data in the column will be lost.
  - Added the required column `tourId` to the `tourDays` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tour" DROP CONSTRAINT "tour_tourDaysId_fkey";

-- AlterTable
ALTER TABLE "tour" DROP COLUMN "tourDaysId";

-- AlterTable
ALTER TABLE "tourDays" ADD COLUMN     "tourId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tourDays" ADD CONSTRAINT "tourDays_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
