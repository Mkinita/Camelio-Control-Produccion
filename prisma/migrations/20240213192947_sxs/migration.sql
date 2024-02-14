/*
  Warnings:

  - You are about to alter the column `fecha` on the `producciones` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - Added the required column `fecha2` to the `Producciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `producciones` ADD COLUMN `fecha2` VARCHAR(191) NOT NULL,
    MODIFY `fecha` DATETIME(3) NOT NULL;
