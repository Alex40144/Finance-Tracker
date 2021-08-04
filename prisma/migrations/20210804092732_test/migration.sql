-- CreateTable
CREATE TABLE `Users` (
    `name` VARCHAR(191) NOT NULL,
    `_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `settings` JSON NOT NULL,

    UNIQUE INDEX `Users.email_unique`(`email`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Data` (
    `title` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `frequency` VARCHAR(191) NOT NULL,
    `_id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Data` ADD FOREIGN KEY (`ownerId`) REFERENCES `Users`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;
