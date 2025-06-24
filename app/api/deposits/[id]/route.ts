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

    const deposit = await prisma.deposit.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!deposit) {
      return NextResponse.json({ error: "Dépôt non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ deposit })
  } catch (error) {
    console.error("Get deposit error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération du dépôt" }, { status: 500 })
  }
}
