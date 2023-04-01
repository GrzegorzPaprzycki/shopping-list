/*
  Warnings:

  - The `status` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ITEM_STATUS" AS ENUM ('NOT_BOUGHT', 'BOUGHT', 'PLACED');

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "status",
ADD COLUMN     "status" "ITEM_STATUS" NOT NULL DEFAULT 'NOT_BOUGHT';

-- DropEnum
DROP TYPE "Item_STATUS";
