-- CreateTable
CREATE TABLE `Pruebas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `fecha2` VARCHAR(191) NOT NULL,
    `calidad` VARCHAR(191) NOT NULL,
    `cliente` VARCHAR(191) NOT NULL,
    `pedido` JSON NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT false,
    `stock` BOOLEAN NOT NULL DEFAULT false,
    `despacho` BOOLEAN NOT NULL DEFAULT false,
    `fechaCambioStock` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
