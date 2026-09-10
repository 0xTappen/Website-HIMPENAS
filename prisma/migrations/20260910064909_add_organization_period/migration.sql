-- CreateTable
CREATE TABLE "OrganizationSetting" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "period" TEXT NOT NULL DEFAULT '2024/2025',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationSetting_pkey" PRIMARY KEY ("id")
);
