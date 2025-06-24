import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Vérification des permissions admin
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true }
    })

    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    // Gestion des query params avec typage strict
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const status = searchParams.get('status') as 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | null
    const userId = searchParams.get('userId')

    // Construction du filtre avec typage correct
    const whereClause: {
      status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'
      userId?: string
    } = {}

    if (status) {
      whereClause.status = status
    }

    if (userId) {
      whereClause.userId = userId
    }

    const withdrawals = await prisma.withdrawal.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            bcbId: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: withdrawals,
      count: withdrawals.length
    })

  } catch (error) {
    console.error("Erreur admin GET:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des retraits" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Vérification des permissions admin
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const adminUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true }
    })

    if (!adminUser?.isAdmin) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const body = await request.json()
    const { withdrawalId, status, adminNote } = body

    // Validation avec typage strict
    if (!withdrawalId) {
      return NextResponse.json({ error: "ID de retrait manquant" }, { status: 400 })
    }

    const validStatuses: ('PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED')[] = 
      ["PENDING", "APPROVED", "REJECTED", "COMPLETED"]
    
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 })
    }

    // Mise à jour du retrait
    const updatedWithdrawal = await prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: {
        status: status as 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED',
        adminNote
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            bcbId: true
          }
        }
      }
    })

    // Si le retrait est rejeté, rembourser l'utilisateur
    if (status === "REJECTED") {
      await prisma.user.update({
        where: { id: updatedWithdrawal.userId },
        data: {
          balance: {
            increment: updatedWithdrawal.amount
          }
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: "Retrait mis à jour avec succès",
      data: updatedWithdrawal
    })

  } catch (error) {
    console.error("Erreur admin PATCH:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du retrait" },
      { status: 500 }
    )
  }
}