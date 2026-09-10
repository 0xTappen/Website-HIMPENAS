-- CreateTable
CREATE TABLE "OrganizationDepartment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "staffCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationDepartment_name_key" ON "OrganizationDepartment"("name");
