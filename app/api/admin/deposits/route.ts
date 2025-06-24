import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateReference } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const deposits = await prisma.deposit.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            bcbId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ deposits })
  } catch (error) {
    console.error("Admin get deposits error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des dépôts" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const { depositId, status, adminNote } = await request.json()

    const deposit = await prisma.deposit.findUnique({
      where: { id: depositId },
      include: { user: true },
    })

    if (!deposit) {
      return NextResponse.json({ error: "Dépôt non trouvé" }, { status: 404 })
    }

    // Update deposit status
    const updatedDeposit = await prisma.deposit.update({
      where: { id: depositId },
      data: {
        status,
        adminNote,
      },
    })

    // If confirmed, credit user account and create transaction
    if (status === "CONFIRMED") {
      await prisma.$transaction(async (tx) => {
        // Update user balance
        await tx.user.update({
          where: { id: deposit.userId },
          data: {
            balance: {
              increment: deposit.amount,
            },
          },
        })

        // Create transaction record
        await tx.transaction.create({
          data: {
            amount: deposit.amount,
            type: "DEPOSIT",
            status: "COMPLETED",
            description: `Dépôt ${deposit.paymentMethod}`,
            reference: generateReference(),
            receiverId: deposit.userId,
          },
        })
      })
    }

    return NextResponse.json({
      message: "Dépôt mis à jour",
      deposit: updatedDeposit,
    })
  } catch (error) {
    console.error("Admin update deposit error:", error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour du dépôt" }, { status: 500 })
  }
}
