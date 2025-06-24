import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const withdrawal = await prisma.withdrawal.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!withdrawal) {
      return NextResponse.json({ error: "Retrait non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ withdrawal })
  } catch (error) {
    console.error("Get withdrawal error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération du retrait" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est admin pour permettre les modifications
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true },
    })

    if (!user?.isAdmin) {
      return NextResponse.json(
        { error: "Action réservée aux administrateurs" },
        { status: 403 }
      )
    }

    const { status, adminNote } = await request.json()

    // Valider le statut
    const validStatuses = ["PENDING", "APPROVED", "REJECTED", "COMPLETED"]
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Statut de retrait invalide" },
        { status: 400 }
      )
    }

    const updatedWithdrawal = await prisma.withdrawal.update({
      where: {
        id: params.id,
      },
      data: {
        status,
        adminNote,
      },
    })

    return NextResponse.json({
      message: "Retrait mis à jour avec succès",
      withdrawal: updatedWithdrawal,
    })
  } catch (error) {
    console.error("Update withdrawal error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du retrait" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si le retrait appartient à l'utilisateur ou si c'est un admin
    const withdrawal = await prisma.withdrawal.findFirst({
      where: {
        id: params.id,
        OR: [
          { userId: session.user.id },
          {
            user: {
              isAdmin: true,
            },
          },
        ],
      },
    })

    if (!withdrawal) {
      return NextResponse.json(
        { error: "Retrait non trouvé ou non autorisé" },
        { status: 404 }
      )
    }

    // Annuler le retrait seulement s'il est en statut PENDING
    if (withdrawal.status !== "PENDING") {
      return NextResponse.json(
        { error: "Seuls les retraits en attente peuvent être annulés" },
        { status: 400 }
      )
    }

    await prisma.withdrawal.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      message: "Retrait annulé et supprimé avec succès",
    })
  } catch (error) {
    console.error("Delete withdrawal error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression du retrait" },
      { status: 500 }
    )
  }
}