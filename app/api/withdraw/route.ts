import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      console.log("Erreur d'authentification: Aucune session trouvée")
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await request.json()
    console.log("Requête de retrait reçue:", body)

    // Validation des données
    const amount = Number(body.amount)
    const method = body.method
    const destination = body.destination

    if (isNaN(amount)) {
      return NextResponse.json({ error: "Le montant doit être un nombre" }, { status: 400 })
    }

    if (amount <= 0) {
      return NextResponse.json({ error: "Le montant doit être positif" }, { status: 400 })
    }

    if (amount < 1000) {
      return NextResponse.json({ error: "Le montant minimum est de 1 000 FCFA" }, { status: 400 })
    }

    if (!["AGENT", "BANK_TRANSFER", "MOBILE_MONEY"].includes(method)) {
      return NextResponse.json({ error: "Méthode de retrait invalide" }, { status: 400 })
    }

    if (!destination) {
      return NextResponse.json({ error: "Destination requise" }, { status: 400 })
    }

    // Vérification du solde
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { balance: true, bcbId: true }
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    // Conversion du Decimal en nombre pour la comparaison
    const userBalance = Number(user.balance)
    if (userBalance < amount) {
      return NextResponse.json(
        { 
          error: `Solde insuffisant. Votre solde: ${userBalance.toLocaleString()} FCFA`,
          currentBalance: userBalance
        }, 
        { status: 400 }
      )
    }

    // Création du retrait
    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId: session.user.id,
        amount: amount,
        method,
        destination,
        status: "PENDING",
      }
    })

    // Mise à jour du solde
    await prisma.user.update({
      where: { id: session.user.id },
      data: { balance: { decrement: amount } }
    })

    // Journalisation pour le suivi
    console.log(`Retrait créé pour l'utilisateur ${user.bcbId}: ${amount} FCFA`)

    return NextResponse.json({
      success: true,
      message: "Demande de retrait créée avec succès",
      data: {
        withdrawalId: withdrawal.id,
        amount: withdrawal.amount,
        newBalance: userBalance - amount,
        status: withdrawal.status
      }
    })

  } catch (error) {
    console.error("Erreur serveur:", error)
    return NextResponse.json(
      { 
        error: "Une erreur est survenue lors du traitement de votre demande",
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') as 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | undefined

    const whereClause: {
      userId: string
      status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'
    } = {
      userId: session.user.id
    }

    if (status) {
      whereClause.status = status
    }

    const withdrawals = await prisma.withdrawal.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        amount: true,
        method: true,
        destination: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      success: true,
      data: withdrawals,
      count: withdrawals.length
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des retraits:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'historique" },
      { status: 500 }
    )
  }
}