'use client'

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
  Plus,
  ArrowRight,
  CreditCard,
  Send,
  Download,
  Clock,
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
      <div className="min-h-screen bg-[#1F2937] flex items-center justify-center">
        <div className="flex items-center space-x-2 text-[#F7F7F7]">
          <Loader2 className="h-6 w-6 animate-spin text-[#6C8C68]" />
          <span>Chargement de votre tableau de bord...</span>
        </div>
      </div>
    )
  }

  if (!session || !userData) {
    return (
      <div className="min-h-screen bg-[#1F2937] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#F7F7F7] mb-4">Impossible de charger vos données</p>
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
    <div className="min-h-screen bg-[#1F2937] text-[#F7F7F7]">
      {/* Header */}
      <header className="bg-[#1E2A47] border-b border-[#3A3F58] sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#6C8C68] rounded-lg flex items-center justify-center">
                <span className="text-[#F7F7F7] font-bold text-sm">Z</span>
              </div>
              <span className="font-bold">ZAYNO</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button 
                size="sm" 
                className="bg-[#6C8C68] hover:bg-[#5A7A56] text-sm gap-2"
                onClick={() => router.push("/deposit")}
              >
                <Plus className="h-4 w-4" />
                Ajouter des fonds
              </Button>
              
              <Button variant="ghost" size="icon" className="text-[#F7F7F7] hover:bg-[#3A3F58]/50">
                <Bell className="h-5 w-5" />
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

      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            Bonjour, {userData.name.split(" ")[0]} 👋
          </h1>
          <p className="text-[#B0B7C3]">Ton argent. Ton rythme. Ta banque.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <Card className="bg-gradient-to-br from-[#1E2A47] to-[#3A3F58] border-0 shadow-lg overflow-hidden relative">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-[#B0B7C3] text-sm mb-1">Solde disponible</p>
                    <div className="flex items-end">
                      <p className="text-3xl md:text-4xl font-bold">
                        {showBalance ? Number(userData.balance).toLocaleString() : "•••,•••"}
                        <span className="text-lg ml-2 text-[#6C8C68]">FCFA</span>
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-[#F7F7F7] hover:bg-[#3A3F58]/50 ml-2"
                      >
                        {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </Button>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-[#6C8C68]/20 text-[#6C8C68] border-[#6C8C68]/30">
                    <Shield className="h-3 w-3 mr-1" />
                    Sécurisé
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    className="bg-[#3A3F58]/50 border-[#3A3F58] text-[#F7F7F7] hover:bg-[#3A3F58] h-12"
                    onClick={() => router.push("/dashboard/send")}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-[#3A3F58]/50 border-[#3A3F58] text-[#F7F7F7] hover:bg-[#3A3F58] h-12"
                    onClick={() => router.push("/dashboard/withdraw")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Retirer
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-[#3A3F58]/50 border-[#3A3F58] text-[#F7F7F7] hover:bg-[#3A3F58] h-12"
                    onClick={() => router.push("/dashboard/loans")}
                  >
                    <Banknote className="h-4 w-4 mr-2" />
                    Crédit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Virtual Card */}
            {userData.hasCard && (
              <Card className="bg-gradient-to-r from-[#6C8C68] to-[#8CA68A] border-0 text-[#F7F7F7]">
                <CardHeader>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm opacity-80 mb-1">Carte ZAYNO</p>
                      <p className="font-medium">Carte Virtuelle</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-[#F7F7F7] hover:bg-[#6C8C68]/50">
                        <CreditCard className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-[#F7F7F7] hover:bg-[#6C8C68]/50">
                        <Shield className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm opacity-80 mb-1">Numéro de carte</p>
                      <p className="font-mono text-lg tracking-wider">
                        {showBalance ? userData.cardNumber?.match(/.{1,4}/g)?.join(" ") : "•••• •••• •••• ••••"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-80 mb-1">Expire</p>
                      <p className="font-mono">••/••</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Credit Score */}
            <CreditScore
              score={userData.creditScore}
              tier={userData.tier}
              transactions={transactions.length}
              totalAmount={transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)}
            />

            {/* Transaction History */}
            <Card className="border-[#3A3F58] bg-[#1E2A47]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Historique des transactions</CardTitle>
                  <Button variant="ghost" size="sm" className="text-[#6C8C68]">
                    Voir tout <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TransactionHistory
                  transactions={transactions.slice(0, 5)}
                  onLoadMore={() => {
                    // Implement load more functionality
                    console.log("Load more transactions")
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tier Progress */}
            <Card className="bg-[#1E2A47] border-[#3A3F58]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <currentTier.icon className="h-5 w-5 mr-2 text-[#6C8C68]" />
                  <span>Niveau {userData.tier}</span>
                </CardTitle>
                <CardDescription className="text-[#B0B7C3]">
                  {currentTier.benefits}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-bold">{userData.creditScore}</p>
                  <p className="text-[#B0B7C3] text-sm">Score crédit</p>
                </div>
                {userData.creditScore < 1000 && (
                  <div className="space-y-2">
                    <Progress 
                      value={(userData.creditScore / 1000) * 100} 
                      className="h-2 bg-[#3A3F58]" 
                      indicatorColor={currentTier.color}
                    />
                    <p className="text-xs text-[#B0B7C3] text-center">
                      {1000 - userData.creditScore} points pour le niveau supérieur
                    </p>
                  </div>
                )}
                <Button variant="outline" className="w-full border-[#3A3F58] text-[#F7F7F7] hover:bg-[#3A3F58]">
                  Améliorer mon score
                </Button>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-[#1E2A47] border-[#3A3F58]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-[#6C8C68]" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#B0B7C3]">Dépenses ce mois</span>
                  <span className="font-semibold">
                    {transactions
                      .filter(t => t.type === 'sent' || t.type === 'withdrawal')
                      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
                      .toLocaleString()} FCFA
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#B0B7C3]">Revenus ce mois</span>
                  <span className="font-semibold text-[#6C8C68]">
                    {transactions
                      .filter(t => t.type === 'received' || t.type === 'deposit')
                      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
                      .toLocaleString()} FCFA
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#B0B7C3]">Transactions</span>
                  <span className="font-semibold">{transactions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#B0B7C3]">Statut compte</span>
                  <Badge variant={userData.isActive ? "default" : "destructive"}>
                    {userData.isActive ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Loan Offers */}
            <Card className={`border-2 ${canRequestLoan ? "border-[#6C8C68] bg-[#6C8C68]/10" : "border-[#3A3F58] bg-[#1E2A47]"}`}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Banknote className="h-5 w-5 mr-2 text-[#6C8C68]" />
                  Prêt Express
                </CardTitle>
                <CardDescription className={canRequestLoan ? "text-[#6C8C68]" : "text-[#B0B7C3]"}>
                  {canRequestLoan
                    ? "Vous êtes éligible à un prêt !"
                    : `Il vous faut ${250 - userData.creditScore} points supplémentaires`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-[#3A3F58]/50 rounded-lg">
                    <p className="font-semibold text-sm">{currentTier.benefits}</p>
                    <p className="text-xs text-[#B0B7C3]">Taux préférentiel selon votre niveau</p>
                  </div>
                  <Button
                    disabled={!canRequestLoan}
                    className={`w-full ${
                      canRequestLoan
                        ? "bg-[#6C8C68] hover:bg-[#5A7A56]"
                        : "bg-[#3A3F58] text-[#B0B7C3] cursor-not-allowed"
                    }`}
                    onClick={() => router.push("/dashboard/loans")}
                  >
                    {canRequestLoan ? "Demander un prêt" : "Non éligible"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-[#1E2A47] border-[#3A3F58]">
              <CardHeader>
                <CardTitle>Accès rapide</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Link href="/dashboard/profile">
                <Button variant="ghost" className="text-[#F7F7F7] hover:bg-[#3A3F58] h-10">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
                </Link>
                <Button variant="ghost" className="text-[#F7F7F7] hover:bg-[#3A3F58] h-10">
                  <Clock className="h-4 w-4 mr-2" />
                  Historique
                </Button>
                <Button variant="ghost" className="text-[#F7F7F7] hover:bg-[#3A3F58] h-10">
                  <Shield className="h-4 w-4 mr-2" />
                  Sécurité
                </Button>
                <Button variant="ghost" className="text-[#F7F7F7] hover:bg-[#3A3F58] h-10">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Cartes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}