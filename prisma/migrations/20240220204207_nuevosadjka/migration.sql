/*
  Warnings:

  - Added the required column `pedido02` to the `Pallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pallets` ADD COLUMN `pedido02` JSON NOT NULL;
