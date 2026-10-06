// lib/prismaDynamic.ts
const PrismaClient = require("@prisma/client").PrismaClient;

type TenantConfig = {
  databaseUrl: string;
};

export function createPrismaClient(config: TenantConfig) {
  return new PrismaClient({
    datasources: {
      db: {
        url: config.databaseUrl,
      },
    },
  });
}