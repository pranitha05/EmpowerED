CREATE DATABASE IF NOT EXISTS empowerED;
USE empowerED;
DROP DATABASE empowerED;
DROP TABLE `Credential`, `User`

-- Create User table first
CREATE TABLE IF NOT EXISTS Credential (
    id VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
    email TEXT,
    password TEXT,
    userId VARCHAR(255),
    UNIQUE INDEX `Credential_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;;

-- Create User table next
CREATE TABLE IF NOT EXISTS User (
    id VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    credentialId VARCHAR(255) UNIQUE,
    isVerified BOOLEAN DEFAULT(False),
    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_credentialId_key`(`credentialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `User` ADD CONSTRAINT `User_credentialId_fkey` FOREIGN KEY (`credentialId`) REFERENCES `Credential`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;


