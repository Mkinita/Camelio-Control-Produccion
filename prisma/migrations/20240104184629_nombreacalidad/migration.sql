/*
  Warnings:

  - You are about to drop the column `nombre` on the `calidad` table. All the data in the column will be lost.
  - Added the required column `calidad` to the `Calidad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `calidad` DROP COLUMN `nombre`,
    ADD COLUMN `calidad` VARCHAR(191) NOT NULL;
