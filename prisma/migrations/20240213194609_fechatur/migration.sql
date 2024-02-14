/*
  Warnings:

  - You are about to drop the column `fecha` on the `turno` table. All the data in the column will be lost.
  - Added the required column `fecha2` to the `Turno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `turno` DROP COLUMN `fecha`,
    ADD COLUMN `fecha2` VARCHAR(191) NOT NULL;
