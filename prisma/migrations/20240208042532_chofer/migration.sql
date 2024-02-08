-- CreateTable
CREATE TABLE `Chofer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `rut` VARCHAR(191) NOT NULL,
    `patente` VARCHAR(191) NOT NULL,
    `patente2` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
