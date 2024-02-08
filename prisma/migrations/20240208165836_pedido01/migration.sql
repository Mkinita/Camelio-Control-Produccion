/*
  Warnings:

  - Added the required column `destino` to the `Despacho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pedido01` to the `Despacho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `despacho` ADD COLUMN `destino` VARCHAR(191) NOT NULL,
    ADD COLUMN `pedido01` JSON NOT NULL;
