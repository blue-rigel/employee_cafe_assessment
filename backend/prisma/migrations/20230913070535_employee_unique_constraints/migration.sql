/*
  Warnings:

  - A unique constraint covering the columns `[email_address]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Cafe` MODIFY `logo` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_email_address_key` ON `Employee`(`email_address`);

-- CreateIndex
CREATE UNIQUE INDEX `Employee_phone_number_key` ON `Employee`(`phone_number`);
