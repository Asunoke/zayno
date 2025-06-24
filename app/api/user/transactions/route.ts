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

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ senderId: session.user.id }, { receiverId: session.user.id }],
      },
      include: {
        sender: {
          select: { name: true, bcbId: true },
        },
        receiver: {
          select: { name: true, bcbId: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    })

    // Transform transactions for frontend
    const formattedTransactions = transactions.map((transaction) => {
      const isReceived = transaction.receiverId === session.user!.id
      const isSent = transaction.senderId === session.user!.id

      let type = "transfer"
      if (transaction.type === "DEPOSIT") type = "deposit"
      else if (transaction.type === "WITHDRAWAL") type = "withdrawal"
      else if (transaction.type === "LOAN_REPAYMENT") type = "loan_repayment"
      else if (isReceived) type = "received"
      else if (isSent) type = "sent"

      return {
        id: transaction.id,
        type,
        amount: isReceived ? Number(transaction.amount) : -Number(transaction.amount),
        description:
          transaction.description ||
          `${type === "received" ? "Reçu de" : "Envoyé à"} ${isReceived ? transaction.sender?.name : transaction.receiver?.name}`,
        date: transaction.createdAt.toLocaleDateString("fr-FR"),
        time: transaction.createdAt.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: transaction.status.toLowerCase(),
        reference: transaction.reference,
        sender: transaction.sender?.name,
        recipient: transaction.receiver?.name,
      }
    })

    return NextResponse.json({ transactions: formattedTransactions })
  } catch (error) {
    console.error("Get user transactions error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des transactions" }, { status: 500 })
  }
}
