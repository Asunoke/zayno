"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Eye,
  EyeOff,
  TrendingUp,
  Bell,
  Settings,
  Star,
  Award,
  Banknote,
  Zap,
  Shield,
  Crown,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { CreditScore } from "@/components/credit-score"
import { QuickActions } from "@/components/quick-actions"
import { TransactionHistory } from "@/components/transaction-history"

interface UserData {
  id: string
  name: string
  email: string
   bcbId: string
  iban: string
  balance: number
  creditScore: number
  tier: string
  hasCard: boolean
  cardNumber?: string
  isActive: boolean
}

interface Transaction {
  id: string
  type: "received" | "sent" | "withdrawal" | "loan_repayment" | "credit_earned" | "deposit"
  amount: number
  description: string
  date: string
  time: string
  status: "completed" | "pending" | "failed"
  creditPoints?: number
  reference?: string
  recipient?: string
  sender?: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showBalance, setShowBalance] = useState(true)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  // Configuration des niveaux
  const tiers = {
    BASIC: { min: 0, max: 299, color: "bg-[#3A3F58]", icon: Award, benefits: "Prêt jusqu'à 25,000 FCFA" },
    BRONZE: { min: 300, max: 449, color: "bg-[#6C8C68]", icon: Award, benefits: "Prêt jusqu'à 75,000 FCFA" },
    SILVER: { min: 450, max: 599, color: "bg-[#B0B7C3]", icon: Shield, benefits: "Prêt jusqu'à 150,000 FCFA" },
    GOLD: { min: 600, max: 749, color: "bg-[#DAA520]", icon: Star, benefits: "Prêt jusqu'à 250,000 FCFA" },
    PLATINUM: { min: 750, max: 899, color: "bg-[#7F5AF0]", icon: Crown, benefits: "Prêt jusqu'à 400,000 FCFA" },
    DIAMOND: { min: 900, max: 1000, color: "bg-[#1E2A47]", icon: Zap, benefits: "Prêt jusqu'à 750,000 FCFA" },
  }

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth")
      return
    }

    fetchUserData()
  }, [session, status])

  const fetchUserData = async () => {
    try {
      const [userResponse, transactionsResponse] = await Promise.all([
        fetch("/api/user/profile"),
        fetch("/api/user/transactions"),
      ])

      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUserData(userData.user)
      }

      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json()
        setTransactions(transactionsData.transactions || [])
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="flex items-center space-x-2 text-[#3A3F58]">
          <Loader2 className="h-6 w-6 animate-spin text-[#6C8C68]" />
          <span>Chargement de votre tableau de bord...</span>
        </div>
      </div>
    )
  }

  if (!session || !userData) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#3A3F58] mb-4">Impossible de charger vos données</p>
          <Link href="/auth">
            <Button className="bg-[#6C8C68] hover:bg-[#5A7A56]">Se reconnecter</Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentTier = tiers[userData.tier as keyof typeof tiers] || tiers.BASIC
  const canRequestLoan = userData.creditScore >= 250

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] relative overflow-hidden">
      {/* Header */}
      <header className="bg-[#1E2A47] text-[#F7F7F7] shadow-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#6C8C68] rounded-lg flex items-center justify-center">
                <span className="text-[#F7F7F7] font-bold text-sm">Z</span>
              </div>
              <span className="font-bold">ZAYNO</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-[#F7F7F7] hover:bg-[#3A3F58]">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-[#F7F7F7] hover:bg-[#3A3F58]">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-[#6C8C68] text-[#F7F7F7] text-sm">
                  {session?.user?.name ? getInitials(userData.name) : "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1E2A47] mb-2">
            Bonjour, {userData.name.split(" ")[0]} ! 👋
          </h1>
          <p className="text-[#3A3F58]">Gérez vos finances en toute simplicité</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* ZAYNO Bank Card */}
            <Card className="bg-gradient-to-br from-[#1E2A47] to-[#3A3F58] text-[#F7F7F7] border-0 shadow-lg overflow-hidden relative">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-10 h-10 bg-[#6C8C68] rounded-lg flex items-center justify-center">
                        <span className="text-[#F7F7F7] font-bold text-lg">Z</span>
                      </div>
                      <div>
                        <p className="text-[#6C8C68] font-bold text-lg">ZAYNO BANK</p>
                        <p className="text-[#B0B7C3] text-xs">Votre banque nouvelle génération</p>
                      </div>
                    </div>
                    <p className="text-[#B0B7C3] text-sm">Carte de Débit Premium</p>
                  </div>
                  <div className="text-right">
                    <div className="w-12 h-8 bg-[#6C8C68] rounded flex items-center justify-center mb-2">
                      <span className="text-[#F7F7F7] font-bold text-xs">CHIP</span>
                    </div>
                    <Badge variant="secondary" className="bg-[#6C8C68]/20 text-[#6C8C68] border-[#6C8C68]/30 text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Sécurisé
                    </Badge>
                  </div>
                </div>

                {/* Numéro de carte */}
                <div className="mb-6">
                  <p className="text-[#B0B7C3] text-sm mb-2">Numéro de carte</p>
                  <div className="font-mono text-xl md:text-2xl tracking-wider">
                    {showBalance ? userData.cardNumber || "aucune carte " : "•••• •••• •••• ••••"}
                  </div>
                </div>

                {/* IBAN et détails */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-[#B0B7C3] text-xs mb-1">IBAN</p>
                    <p className="font-mono text-sm">{showBalance ? userData.iban : "•••• •••• •••• •••• •••• ••"}</p>
                  </div>
                  <div>
                    <p className="text-[#B0B7C3] text-xs mb-1">Code BIC</p>
                    <p className="font-mono text-sm">ZAYNOMLA</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[#B0B7C3] text-xs mb-1">Titulaire</p>
                    <p className="font-semibold text-sm">{userData.name.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-[#B0B7C3] text-xs mb-1">Expire</p>
                    <p className="font-mono text-sm">non</p>
                  </div>
                  <div className="flex items-end justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-[#F7F7F7] hover:bg-[#3A3F58] p-2"
                    >
                      {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="bg-[#3A3F58]/50 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#B0B7C3] text-sm">Solde disponible</p>
                      <p className="text-3xl md:text-4xl font-bold">
                        {showBalance ? Number(userData.balance).toLocaleString() : "•••,•••"}
                        <span className="text-lg ml-2 text-[#6C8C68]">FCFA</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#B0B7C3] text-xs">ZAYNO ID</p>
                      <p className="text-sm font-semibold">{userData.bcbId}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Score Component */}
            <CreditScore
              score={userData.creditScore}
              tier={userData.tier}
              transactions={transactions.length}
              totalAmount={transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)}
            />

            {/* Quick Actions */}
            <QuickActions
              onSendMoney={() => router.push("/dashboard/send")}
              onWithdraw={() => router.push("/dashboard/withdraw")}
              onTopup={() => router.push("/deposit")}
              onLoanRequest={() => router.push("/dashboard/loans")}
            />

            {/* Transaction History */}
            <TransactionHistory
              transactions={transactions}
              onLoadMore={() => {
                // Implement load more functionality
                console.log("Load more transactions")
              }}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tier Progress */}
            <Card className="bg-[#1E2A47] text-[#F7F7F7] border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <currentTier.icon className="h-5 w-5 mr-2" />
                  Niveau {userData.tier}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{userData.tier}</p>
                    <p className="text-[#B0B7C3] text-sm">Score: {userData.creditScore}/1000</p>
                  </div>
                  {userData.creditScore < 1000 && (
                    <div className="space-y-2">
                      <Progress 
                        value={(userData.creditScore / 1000) * 100} 
                        className="h-2 bg-[#3A3F58]" 
                        indicatorColor={currentTier.color}
                      />
                      <p className="text-xs text-[#B0B7C3] text-center">
                        {1000 - userData.creditScore} points pour le niveau maximum
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E2A47] flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3A3F58]">Solde actuel</span>
                  <span className="font-semibold text-[#1E2A47]">{Number(userData.balance).toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3A3F58]">Transactions</span>
                  <span className="font-semibold text-[#1E2A47]">{transactions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3A3F58]">Score crédit</span>
                  <span className="font-semibold text-[#6C8C68]">{userData.creditScore} pts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3A3F58]">Statut compte</span>
                  <Badge variant={userData.isActive ? "default" : "destructive"}>
                    {userData.isActive ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Loan Offers */}
            <Card
              className={`border-2 transition-all duration-300 ${canRequestLoan ? "border-[#6C8C68] bg-gradient-to-r from-[#6C8C68]/10 to-[#6C8C68]/20" : "border-[#B0B7C3] bg-[#F7F7F7]"}`}
            >
              <CardHeader>
                <CardTitle className="text-[#1E2A47] flex items-center">
                  <Banknote className="h-5 w-5 mr-2" />
                  Prêt Express
                </CardTitle>
                <CardDescription className={canRequestLoan ? "text-[#6C8C68]" : "text-[#B0B7C3]"}>
                  {canRequestLoan
                    ? "Vous êtes éligible !"
                    : `Il vous faut ${250 - userData.creditScore} points supplémentaires`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-[#1E2A47]/10 rounded-lg">
                    <p className="font-semibold text-[#1E2A47] text-sm">{currentTier.benefits}</p>
                    <p className="text-xs text-[#3A3F58]">Taux préférentiel selon votre niveau</p>
                  </div>
                  <Button
                    disabled={!canRequestLoan}
                    className={`w-full ${
                      canRequestLoan
                        ? "bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7]"
                        : "bg-[#B0B7C3] text-[#3A3F58] cursor-not-allowed"
                    }`}
                    onClick={() => router.push("/dashboard/loans")}
                  >
                    {canRequestLoan ? "Demander un prêt" : "Non éligible"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-[#1E2A47] text-[#F7F7F7] border-0">
              <CardHeader>
                <CardTitle>Besoin d'aide ?</CardTitle>
                <CardDescription className="text-[#B0B7C3]">Notre équipe est là pour vous</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact">
                  <Button variant="secondary" className="w-full bg-[#F7F7F7] text-[#1E2A47] hover:bg-[#F7F7F7]/90">
                    Contacter le support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}