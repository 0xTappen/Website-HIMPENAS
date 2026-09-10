UPDATE "OrganizationMember"
SET "position" = 'sekretaris-1'
WHERE "position" = 'sekretaris-umum';

INSERT INTO "OrganizationMember" ("position", "name", "createdAt", "updatedAt")
VALUES ('sekretaris-1', 'Nama Sekretaris 1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("position") DO NOTHING;

INSERT INTO "OrganizationMember" ("position", "name", "createdAt", "updatedAt")
VALUES ('sekretaris-2', 'Nama Sekretaris 2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("position") DO NOTHING;
