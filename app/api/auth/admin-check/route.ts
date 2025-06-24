import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ isAdmin: false }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true }
    })

    return NextResponse.json({ isAdmin: user?.isAdmin || false })
  } catch (error) {
    console.error("Admin check error:", error)
    return NextResponse.json(
      { error: "Erreur de vérification des permissions" },
      { status: 500 }
    )
  }
}