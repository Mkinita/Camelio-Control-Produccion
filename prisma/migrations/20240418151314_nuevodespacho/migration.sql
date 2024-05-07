-- CreateTable
CREATE TABLE `NuevoDespacho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `cliente` VARCHAR(191) NOT NULL,
    `destino` VARCHAR(191) NOT NULL,
    `pedido03` JSON NOT NULL,
    `pedido01` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
