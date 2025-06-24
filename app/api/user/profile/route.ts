import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        bcbId: true,
        iban: true,
        balance: true,
        creditScore: true,
        tier: true,
        hasCard: true,
        cardNumber: true,
        isActive: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    // Convert Decimal to number for JSON serialization
    const userData = {
      ...user,
      balance: Number(user.balance),
    }

    return NextResponse.json({ user: userData })
  } catch (error) {
    console.error("Get user profile error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération du profil" }, { status: 500 })
  }
}
