/*
  Warnings:

  - Changed the type of `lunch` on the `tourDays` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dinner` on the `tourDays` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tourDays" DROP COLUMN "lunch",
ADD COLUMN     "lunch" BOOLEAN NOT NULL,
DROP COLUMN "dinner",
ADD COLUMN     "dinner" BOOLEAN NOT NULL;
