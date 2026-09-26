import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient | undefined;

function databaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.DATABASE1_PRISMA_DATABASE_URL ||
    process.env.DATABASE1_DATABASE_URL ||
    process.env.DATABASE1_POSTGRES_URL ||
    ""
  ).trim();
}

export function getPrisma() {
  if (!prismaClient) {
    const url = databaseUrl();
    prismaClient = url
      ? new PrismaClient({ datasources: { db: { url } } })
      : new PrismaClient();
  }
  return prismaClient;
}
