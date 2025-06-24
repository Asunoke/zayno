import NextAuth, { type NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { generateBCBId, generateIBAN } from "@/lib/utils"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          bcbId: user.bcbId,
          isAdmin: user.isAdmin,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id
        token.bcbId = user.bcbId
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.bcbId = token.bcbId
        session.user.isAdmin = token.isAdmin
      }
      return session
    },
  },
  events: {
    async createUser({ user }: { user: any }) {
      // Generate unique BCB ID and IBAN for new users
      const bcbId = await generateBCBId()
      const iban = generateIBAN()

      await prisma.user.update({
        where: { id: user.id },
        data: {
          bcbId,
          iban,
        },
      })
    },
  },
  pages: {
    signIn: "/auth",
    
  },
}

export default NextAuth(authOptions)