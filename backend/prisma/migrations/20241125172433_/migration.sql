-- DropForeignKey
ALTER TABLE "TourTranslate" DROP CONSTRAINT "TourTranslate_tourId_fkey";

-- AddForeignKey
ALTER TABLE "TourTranslate" ADD CONSTRAINT "TourTranslate_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
