// types/next-auth.d.ts
import "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    bcbId: string
    isAdmin: boolean
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      bcbId: string
      isAdmin: boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    bcbId: string
    isAdmin: boolean
  }
}