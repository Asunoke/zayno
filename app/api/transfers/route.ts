import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateReference, calculateCreditScore, getCreditTier } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { recipientBcbId, amount, description } = await request.json()

    if (!recipientBcbId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 })
    }

    // Find sender and recipient
    const sender = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    const recipient = await prisma.user.findUnique({
      where: { bcbId: recipientBcbId },
    })

    if (!sender || !recipient) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    if (sender.balance < amount) {
      return NextResponse.json({ error: "Solde insuffisant" }, { status: 400 })
    }

    if (sender.id === recipient.id) {
      return NextResponse.json({ error: "Impossible de s'envoyer de l'argent" }, { status: 400 })
    }

    // Perform transfer transaction
    const result = await prisma.$transaction(async (tx) => {
      // Debit sender
      await tx.user.update({
        where: { id: sender.id },
        data: {
          balance: {
            decrement: amount,
          },
        },
      })

      // Credit recipient
      await tx.user.update({
        where: { id: recipient.id },
        data: {
          balance: {
            increment: amount,
          },
        },
      })

      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          amount: Number.parseFloat(amount),
          type: "TRANSFER",
          status: "COMPLETED",
          description: description || `Transfert vers ${recipient.name}`,
          reference: generateReference(),
          senderId: sender.id,
          receiverId: recipient.id,
        },
      })

      // Update credit scores for both users
      const senderTransactions = await tx.transaction.count({
        where: { senderId: sender.id, status: "COMPLETED" },
      })

      const senderTotalAmount = await tx.transaction.aggregate({
        where: { senderId: sender.id, status: "COMPLETED" },
        _sum: { amount: true },
      })

      const newSenderScore = calculateCreditScore(senderTransactions, Number(senderTotalAmount._sum.amount || 0))

      await tx.user.update({
        where: { id: sender.id },
        data: {
          creditScore: newSenderScore,
          tier: getCreditTier(newSenderScore) as any,
        },
      })

      return transaction
    })

    return NextResponse.json({
      message: "Transfert effectué avec succès",
      transaction: result,
    })
  } catch (error) {
    console.error("Transfer error:", error)
    return NextResponse.json({ error: "Erreur lors du transfert" }, { status: 500 })
  }
}
