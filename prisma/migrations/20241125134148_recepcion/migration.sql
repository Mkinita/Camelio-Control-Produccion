-- CreateTable
CREATE TABLE `Recepciom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha3` VARCHAR(191) NOT NULL,
    `guia` VARCHAR(191) NOT NULL,
    `recepcion` VARCHAR(191) NOT NULL,
    `largo` VARCHAR(191) NOT NULL,
    `metros` VARCHAR(191) NOT NULL,
    `calidad` VARCHAR(191) NOT NULL,
    `proveedor` VARCHAR(191) NOT NULL,
    `origen` VARCHAR(191) NOT NULL,
    `destino` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
