/*
  Warnings:

  - You are about to alter the column `volumen` on the `turno` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `turno` MODIFY `volumen` DOUBLE NOT NULL;
