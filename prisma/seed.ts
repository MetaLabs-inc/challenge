import bcrypt from 'bcrypt'

import { prisma } from '../src/prisma'

const main = async () => {
  await prisma.$connect()
  await prisma.user.deleteMany({})

  await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash: bcrypt.hashSync('password', 10),
      name: 'Test User',
    },
  })
}

main()
.catch((e) => {
  console.error(e)
  process.exit(1)
})
.finally(async () => {
  await prisma.$disconnect()
})
