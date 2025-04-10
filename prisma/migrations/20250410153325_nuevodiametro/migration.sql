/*
  Warnings:

  - Added the required column `cantidad` to the `Trozo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `largo` to the `Trozo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `trozo` ADD COLUMN `cantidad` INTEGER NOT NULL,
    ADD COLUMN `largo` VARCHAR(191) NOT NULL;
