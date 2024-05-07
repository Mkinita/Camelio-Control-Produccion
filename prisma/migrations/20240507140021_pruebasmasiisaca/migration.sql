/*
  Warnings:

  - You are about to drop the `pruebas` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `producciones` ADD COLUMN `fechaCambioStock` DATETIME(3) NULL;

-- DropTable
DROP TABLE `pruebas`;
