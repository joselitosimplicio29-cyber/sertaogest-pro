// Prisma client singleton
// Run `npx prisma generate` after configuring your DATABASE_URL

let prisma: unknown = null

if (process.env.DATABASE_URL && process.env.DATABASE_URL !== 'your_database_url') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require('@prisma/client')
    const globalForPrisma = globalThis as unknown as { prisma: typeof PrismaClient }
    prisma = globalForPrisma.prisma || new PrismaClient()
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
  } catch {
    console.warn('Prisma client not generated yet. Run: npx prisma generate')
  }
}

export { prisma }
