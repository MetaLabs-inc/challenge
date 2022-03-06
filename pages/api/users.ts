// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../src/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.$connect()
  const users = await prisma.user.findMany()
  const data = users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
  }))
  res.status(200).json(data)
}

export default handler
