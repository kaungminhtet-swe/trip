/*
  Warnings:

  - You are about to drop the column `passengers` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_paymentId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "passengers",
ALTER COLUMN "paymentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
