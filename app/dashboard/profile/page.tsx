'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Shield, CreditCard, Mail, Smartphone, Hash, Settings, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserData {
  id: string
  name: string
  email: string
  phone: string
  bcbId: string
  iban: string
  tier: string
  isVerified: boolean
  joinedAt: string
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      router.push("/auth")
      return
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile")
        const data = await response.json()
        if (response.ok) {
          setUserData(data.user)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [session, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1F2937] flex items-center justify-center">
        <div className="flex items-center space-x-2 text-[#F7F7F7]">
          <Loader2 className="h-6 w-6 animate-spin text-[#6C8C68]" />
          <span>Chargement du profil...</span>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#1F2937] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#F7F7F7] mb-4">Impossible de charger les données du profil</p>
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-[#6C8C68] hover:bg-[#5A7A56]"
          >
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-[#1F2937]">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-[#6C8C68] hover:text-[#5A7A56] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au tableau de bord
        </Link>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-[#6C8C68] text-[#F7F7F7] text-xl">
                  {getInitials(userData.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-[#F7F7F7]">{userData.name}</h1>
                <Badge variant="secondary" className="bg-[#6C8C68]/20 text-[#6C8C68] border-[#6C8C68]/30">
                  {userData.tier}
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="border-[#3A3F58] text-[#F7F7F7] hover:bg-[#3A3F58]">
              <Settings className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>

          {/* Account Information */}
          <Card className="bg-[#1E2A47] border-[#3A3F58]">
            <CardHeader>
              <CardTitle className="text-xl text-[#F7F7F7] flex items-center">
                <User className="h-5 w-5 mr-2 text-[#6C8C68]" />
                Informations du compte
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-[#B0B7C3] flex items-center">
                  <Hash className="h-4 w-4 mr-2" />
                  BCB ID
                </p>
                <p className="font-mono text-[#F7F7F7]">{userData.bcbId}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#B0B7C3] flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </p>
                <p className="text-[#F7F7F7]">{userData.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#B0B7C3] flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Téléphone
                </p>
                <p className="text-[#F7F7F7]">{userData.phone || "Non renseigné"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#B0B7C3] flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Statut de vérification
                </p>
                <Badge variant={userData.isVerified ? "default" : "secondary"}>
                  {userData.isVerified ? "Vérifié" : "Non vérifié"}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#B0B7C3] flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  IBAN
                </p>
                <p className="font-mono text-[#F7F7F7]">{userData.iban}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#B0B7C3]">Membre depuis</p>
                <p className="text-[#F7F7F7]">{formatDate(userData.joinedAt)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="bg-[#1E2A47] border-[#3A3F58]">
            <CardHeader>
              <CardTitle className="text-xl text-[#F7F7F7] flex items-center">
                <Shield className="h-5 w-5 mr-2 text-[#6C8C68]" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#F7F7F7]">Authentification à deux facteurs</p>
                  <p className="text-sm text-[#B0B7C3]">Ajoutez une couche de sécurité supplémentaire</p>
                </div>
                <Button variant="outline" className="border-[#3A3F58] text-[#F7F7F7] hover:bg-[#3A3F58]">
                  Activer
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#F7F7F7]">Sessions actives</p>
                  <p className="text-sm text-[#B0B7C3]">Gérez vos appareils connectés</p>
                </div>
                <Button variant="outline" className="border-[#3A3F58] text-[#F7F7F7] hover:bg-[#3A3F58]">
                  Voir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}