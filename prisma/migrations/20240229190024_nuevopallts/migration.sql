/*
  Warnings:

  - You are about to drop the column `cantidad` on the `pallets` table. All the data in the column will be lost.
  - You are about to drop the column `cliente` on the `pallets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pallets` DROP COLUMN `cantidad`,
    DROP COLUMN `cliente`;
