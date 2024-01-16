-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `espesor` VARCHAR(191) NOT NULL,
    `ancho` VARCHAR(191) NOT NULL,
    `largo` VARCHAR(191) NOT NULL,
    `piezas` VARCHAR(191) NOT NULL,
    `detalle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
