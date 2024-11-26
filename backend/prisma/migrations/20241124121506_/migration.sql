-- CreateTable
CREATE TABLE "tour" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tourDaysId" INTEGER NOT NULL,

    CONSTRAINT "tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tourDays" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "breakfast" BOOLEAN NOT NULL,
    "lunch" TEXT NOT NULL,
    "dinner" TEXT NOT NULL,

    CONSTRAINT "tourDays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tour" ADD CONSTRAINT "tour_tourDaysId_fkey" FOREIGN KEY ("tourDaysId") REFERENCES "tourDays"("id") ON DELETE CASCADE ON UPDATE CASCADE;
