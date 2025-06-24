"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, CreditCard, TrendingUp, CheckCircle, XCircle, Clock, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  isAdmin?: boolean
  bcbId?: string
}

interface Deposit {
  id: string
  amount: string
  paymentMethod: string
  status: string
  createdAt: string
  user: {
    name: string
    bcbId: string
  }
}

interface Withdrawal {
  id: string
  amount: string
  paymentMethod: string
  status: string
  createdAt: string
  user: {
    name: string
    bcbId: string
  }
}

interface AppUser {
  id: string
  name: string
  email: string
  bcbId: string
  tier: string
  balance: number
  creditScore: number
  iban: string
  isActive: boolean
  hasCard: boolean
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
  const [users, setUsers] = useState<AppUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    const user = session?.user as User | undefined
    if (!user?.isAdmin) {
      router.push("/dashboard")
      return
    }

    fetchData()
  }, [session, status, router])

  const fetchData = async () => {
    try {
      const [depositsRes, usersRes, withdrawalsRes] = await Promise.all([
        fetch("/api/admin/deposits"),
        fetch("/api/admin/users"),
        fetch("/api/admin/withdrawals")
      ])

      // Handle deposits
      if (depositsRes.ok) {
        const depositsData = await depositsRes.json()
        setDeposits(depositsData.deposits || [])
      } else {
        console.error("Failed to fetch deposits:", depositsRes.status)
        setDeposits([])
      }

      // Handle users
      if (usersRes.ok) {
        const usersData = await usersRes.json()
        setUsers(usersData.users || [])
      } else {
        console.error("Failed to fetch users:", usersRes.status)
        setUsers([])
      }

      // Handle withdrawals - fixed implementation
      if (withdrawalsRes.ok) {
        const withdrawalsData = await withdrawalsRes.json()
        
        // Handle different response formats
        let withdrawalsList = []
        if (Array.isArray(withdrawalsData)) {
          withdrawalsList = withdrawalsData
        } else if (withdrawalsData && Array.isArray(withdrawalsData.withdrawals)) {
          withdrawalsList = withdrawalsData.withdrawals
        } else if (withdrawalsData && Array.isArray(withdrawalsData.withdrawal)) {
          withdrawalsList = withdrawalsData.withdrawal
        } else {
          console.warn("Unexpected withdrawals response format:", withdrawalsData)
        }
        
        setWithdrawals(withdrawalsList)
      } else {
        console.error("Failed to fetch withdrawals:", withdrawalsRes.status)
        setWithdrawals([])
      }
    } catch (error) {
      console.error("Error fetching admin data:", error)
      setDeposits([])
      setUsers([])
      setWithdrawals([])
    } finally {
      setLoading(false)
    }
  }

  const handleDepositAction = async (depositId: string, status: string, adminNote?: string) => {
    try {
      const response = await fetch("/api/admin/deposits", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          depositId,
          status,
          adminNote,
        }),
      })

      if (response.ok) {
        fetchData()
      } else {
        alert("Erreur lors de la mise à jour")
      }
    } catch (error) {
      console.error("Error updating deposit:", error)
      alert("Erreur lors de la mise à jour")
    }
  }

  const handleWithdrawalAction = async (withdrawalId: string, status: string, adminNote?: string) => {
    try {
      const response = await fetch("/api/admin/withdrawals", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          withdrawalId,
          status,
          adminNote,
        }),
      })

      if (response.ok) {
        fetchData()
      } else {
        alert("Erreur lors de la mise à jour")
      }
    } catch (error) {
      console.error("Error updating withdrawal:", error)
      alert("Erreur lors de la mise à jour")
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Chargement...</div>
      </div>
    )
  }

  const user = session?.user as User | undefined
  if (!user?.isAdmin) {
    return null
  }

  const pendingDeposits = deposits.filter((d) => d.status === "PENDING")
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "PENDING")
  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.isActive).length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Tableau de Bord Admin</h1>
          <p className="text-muted-foreground">Gérez les comptes et transactions BCB</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">{activeUsers} actifs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dépôts en Attente</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingDeposits.length}</div>
              <p className="text-xs text-muted-foreground">Nécessitent une action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retraits en Attente</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingWithdrawals.length}</div>
              <p className="text-xs text-muted-foreground">Nécessitent une action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cartes Actives</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter((u) => u.hasCard).length}</div>
              <p className="text-xs text-muted-foreground">Cartes émises</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deposits" className="space-y-4">
          <TabsList>
            <TabsTrigger value="deposits">Dépôts</TabsTrigger>
            <TabsTrigger value="withdrawals">Retraits</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="deposits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Demandes de Dépôt</CardTitle>
                <CardDescription>Gérez les demandes de dépôt des utilisateurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deposits.map((deposit) => (
                    <div key={deposit.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{deposit.user.name}</span>
                          <Badge variant="outline">{deposit.user.bcbId}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Number(deposit.amount).toLocaleString()} FCFA • {deposit.paymentMethod}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(deposit.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            deposit.status === "CONFIRMED"
                              ? "default"
                              : deposit.status === "PENDING"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {deposit.status}
                        </Badge>

                        {deposit.status === "PENDING" && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleDepositAction(deposit.id, "CONFIRMED")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirmer
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDepositAction(deposit.id, "REJECTED", "Paiement non reçu")}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Rejeter
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {deposits.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">Aucune demande de dépôt</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Demandes de Retrait</CardTitle>
                <CardDescription>Gérez les demandes de retrait des utilisateurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {withdrawals.map((withdrawal) => (
                    <div key={withdrawal.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{withdrawal.user.name}</span>
                          <Badge variant="outline">{withdrawal.user.bcbId}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Number(withdrawal.amount).toLocaleString()} FCFA • {withdrawal.paymentMethod}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(withdrawal.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            withdrawal.status === "COMPLETED"
                              ? "default"
                              : withdrawal.status === "PENDING"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {withdrawal.status}
                        </Badge>

                        {withdrawal.status === "PENDING" && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleWithdrawalAction(withdrawal.id, "COMPLETED")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirmer
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleWithdrawalAction(withdrawal.id, "REJECTED", "Retrait refusé")}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Rejeter
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {withdrawals.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">Aucune demande de retrait</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Utilisateurs</CardTitle>
                <CardDescription>Vue d'ensemble des comptes utilisateurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{user.name}</span>
                          <Badge variant="outline">{user.bcbId}</Badge>
                          <Badge variant={user.tier === "PLATINE" ? "default" : "secondary"}>{user.tier}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.email} • {Number(user.balance).toLocaleString()} FCFA
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Score: {user.creditScore} • IBAN: {user.iban}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant={user.isActive ? "default" : "destructive"}>
                          {user.isActive ? "Actif" : "Inactif"}
                        </Badge>
                        <Badge variant={user.hasCard ? "default" : "secondary"}>
                          {user.hasCard ? "Carte" : "Pas de carte"}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transactions Récentes</CardTitle>
                <CardDescription>Historique des transactions système</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">Fonctionnalité en développement</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}