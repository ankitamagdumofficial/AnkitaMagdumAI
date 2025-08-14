// Mock Prisma client for build-time when database isn't available
let prisma: any

try {
  // Try to import the real Prisma client
  const { PrismaClient } = require('@prisma/client')
  
  // Prevent multiple instances of Prisma Client in development
  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined
  }

  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
  } else {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient()
    }
    prisma = globalForPrisma.prisma
  }
} catch (error) {
  // If Prisma client is not available (during build), create a mock
  console.warn('Prisma client not available, using mock for build-time')
  prisma = new Proxy({}, {
    get() {
      return () => Promise.resolve([])
    }
  })
}

export default prisma
