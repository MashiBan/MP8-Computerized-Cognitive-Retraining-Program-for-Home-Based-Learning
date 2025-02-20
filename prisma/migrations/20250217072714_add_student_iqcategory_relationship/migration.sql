/*
  Warnings:

  - Added the required column `iqCategoryId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iqCategoryId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `question` ADD COLUMN `iqCategoryId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `iqCategoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_iqCategoryId_fkey` FOREIGN KEY (`iqCategoryId`) REFERENCES `IQCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
