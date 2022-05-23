// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'


import { prisma } from '../../../src/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? '',
    }
  })
  if (!currentUser) return res.status(401).json({ error: 'Not logged in' })

  const currentShift = await prisma.shift.findFirst({
    where: {
      finishedAt: null,
      userId: currentUser?.id
    },
  })
  if (currentShift) return res.status(409).json({ error: 'Already have an active shift ' })

  if (req.method === 'POST') {
    const data = JSON.parse(req.body)
    await prisma.$connect()

    const newShift = await prisma.shift.create({
      data: {
        location: '',
        startedAt: data.startedAt,
        userId: currentUser.id,
      }
    })
    res.status(201).json(newShift)
  } 
  else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

export default handler
