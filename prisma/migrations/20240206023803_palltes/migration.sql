-- CreateTable
CREATE TABLE `Pallets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `cantidad` VARCHAR(191) NOT NULL,
    `cliente` VARCHAR(191) NOT NULL,
    `pedido` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
