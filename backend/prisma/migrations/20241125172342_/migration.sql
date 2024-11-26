-- DropForeignKey
ALTER TABLE "tourDays" DROP CONSTRAINT "tourDays_tourId_fkey";

-- DropForeignKey
ALTER TABLE "tourDaysTranslation" DROP CONSTRAINT "tourDaysTranslation_tourDaysId_fkey";

-- AddForeignKey
ALTER TABLE "tourDays" ADD CONSTRAINT "tourDays_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourDaysTranslation" ADD CONSTRAINT "tourDaysTranslation_tourDaysId_fkey" FOREIGN KEY ("tourDaysId") REFERENCES "tourDays"("id") ON DELETE CASCADE ON UPDATE CASCADE;
