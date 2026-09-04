import { defineConfig } from "prisma/config";

export default defineConfig({
  adapter: {
    url: process.env.DATABASE_URL,
  },
});
