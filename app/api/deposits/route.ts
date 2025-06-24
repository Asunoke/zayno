import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { amount, paymentMethod, phoneNumber } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Montant invalide" }, { status: 400 })
    }

    // Create deposit request with 50-minute expiry
    const expiresAt = new Date(Date.now() + 50 * 60 * 1000) // 50 minutes

    const deposit = await prisma.deposit.create({
      data: {
        userId: session.user.id,
        amount: Number.parseFloat(amount),
        paymentMethod,
        phoneNumber,
        expiresAt,
      },
    })

    return NextResponse.json({
      message: "Demande de dépôt créée",
      deposit: {
        id: deposit.id,
        amount: deposit.amount,
        phoneNumber: deposit.phoneNumber,
        expiresAt: deposit.expiresAt,
      },
    })
  } catch (error) {
    console.error("Deposit error:", error)
    return NextResponse.json({ error: "Erreur lors de la création de la demande" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const deposits = await prisma.deposit.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    })

    return NextResponse.json({ deposits })
  } catch (error) {
    console.error("Get deposits error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des dépôts" }, { status: 500 })
  }
}
