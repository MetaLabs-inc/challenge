// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from '../../../../src/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ error: 'Not logged in' })
  
  const id = req.query?.id as string
  if (!id) return res.status(404).json({ error: 'No id provided' })

  const data = JSON.parse(req.body)

  if (req.method === 'PUT') {
    await prisma.$connect()
    const shiftToEnd = await prisma.shift.update({
      where: {
        id: parseInt(id),
      },
      data: {
        finishedAt: data.finishedAt,
      }
    })
    res.status(200).json(shiftToEnd)
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

export default handler
