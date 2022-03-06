import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

import { prisma } from "../../../src/prisma"

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email Address", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        })

        // If no error and we have user data, return it
        const passwordMatches = user ? bcrypt.compareSync(credentials?.password || '', user?.passwordHash || '') : false
        if (passwordMatches) {
          return user
        }

        return null
      }
    })
  ]
})
