"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, XCircle, CreditCard, Banknote, User, Calendar, Info } from "lucide-react"
import { useRouter } from "next/navigation"

interface Withdrawal {
  id: string
  amount: number
  paymentMethod: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED"
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string | null
    email: string | null
    bcbId: string | null
    phone: string | null
  }
  accountDetails: {
    provider: string
    accountNumber: string
    accountName: string
  } | null
}

export default function AdminWithdrawals() {
  const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null)
  const [viewDetails, setViewDetails] = useState(false)

  useEffect(() => {
    if (sessionStatus === "loading") return
    
    if (!session?.user) {
      router.push("/signin")
      return
    }
    
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/auth/admin-check")
        const data = await response.json()
        
        if (response.ok && data.isAdmin) {
          setIsAdmin(true)
          fetchAllWithdrawals()
        } else {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Erreur de vérification admin:", error)
        router.push("/dashboard")
      }
    }
    
    checkAdmin()
  }, [session, sessionStatus, router])

  const fetchAllWithdrawals = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/withdrawals?limit=500`)
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      let withdrawalsData: Withdrawal[] = []
      
      if (data.success && Array.isArray(data.data)) {
        withdrawalsData = data.data
      } else if (Array.isArray(data)) {
        withdrawalsData = data
      } else if (data?.withdrawals && Array.isArray(data.withdrawals)) {
        withdrawalsData = data.withdrawals
      } else {
        console.warn("Format de réponse inattendu:", data)
      }
      
      // Trier par date de création (les plus récents en premier)
      withdrawalsData.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      
      setWithdrawals(withdrawalsData)
    } catch (error) {
      console.error("Erreur de récupération des retraits:", error)
      
      let errorMessage = "Erreur lors de la récupération des retraits"
      if (error instanceof Error) {
        errorMessage = error.message
      }
      
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleWithdrawalAction = async (id: string, newStatus: "APPROVED" | "COMPLETED" | "REJECTED") => {
    try {
      const response = await fetch("/api/admin/withdrawals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          withdrawalId: id, 
          status: newStatus,
          adminNote: newStatus === "REJECTED" ? "Retrait refusé par l'admin" : ""
        })
      })

      if (response.ok) {
        // Mettre à jour localement sans recharger toute la liste
        setWithdrawals(prev => prev.map(w => 
          w.id === id ? { ...w, status: newStatus, updatedAt: new Date().toISOString() } : w
        ))
        
        alert(`Retrait ${newStatus === "REJECTED" ? "rejeté" : "approuvé"} avec succès!`)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || `Échec de la mise à jour: ${response.status}`)
      }
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du retrait:`, error)
      
      let errorMessage = "Erreur lors de la mise à jour"
      if (error instanceof Error) {
        errorMessage = error.message
      }
      
      alert(errorMessage)
    }
  }

  const openDetails = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal)
    setViewDetails(true)
  }

  const closeDetails = () => {
    setViewDetails(false)
    setSelectedWithdrawal(null)
  }

  // Gestion des états de chargement
  if (sessionStatus === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Chargement des retraits...</div>
      </div>
    )
  }

  // Si l'utilisateur n'est pas admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Accès refusé. Vous devez être administrateur.</div>
      </div>
    )
  }

  const pendingWithdrawals = withdrawals.filter(w => w.status === "PENDING")
  const completedWithdrawals = withdrawals.filter(w => w.status === "COMPLETED" || w.status === "APPROVED")
  const rejectedWithdrawals = withdrawals.filter(w => w.status === "REJECTED")

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  // Obtenir le nom de la méthode de paiement
  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "bcb_agence": return "BCB Agence";
      case "virement": return "Virement Bancaire";
      case "mobile_money": return "Mobile Money";
      default: return method;
    }
  }

  // Obtenir l'icône de la méthode de paiement
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "bcb_agence": return <Banknote className="h-5 w-5 mr-2 text-blue-600" />;
      case "virement": return <CreditCard className="h-5 w-5 mr-2 text-green-600" />;
      case "mobile_money": return <CreditCard className="h-5 w-5 mr-2 text-purple-600" />;
      default: return <CreditCard className="h-5 w-5 mr-2" />;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Gestion des Retraits</h1>

        {/* Cartes de statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total des retraits</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{withdrawals.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingWithdrawals.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Complétés</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedWithdrawals.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rejetés</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedWithdrawals.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">En Attente</TabsTrigger>
            <TabsTrigger value="completed">Complétés</TabsTrigger>
            <TabsTrigger value="rejected">Rejetés</TabsTrigger>
            <TabsTrigger value="history">Historique Complet</TabsTrigger>
          </TabsList>

          {/* Retraits en attente */}
          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Retraits en Attente</CardTitle>
                <CardDescription>
                  {pendingWithdrawals.length} retraits nécessitent votre approbation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingWithdrawals.map(withdrawal => (
                    <div 
                      key={withdrawal.id} 
                      className="p-4 border rounded-lg grid grid-cols-1 md:grid-cols-7 gap-4 items-center"
                    >
                      <div className="md:col-span-2">
                        <div className="font-medium flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {withdrawal.user.name || "Utilisateur inconnu"}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Badge variant="outline">{withdrawal.user.bcbId}</Badge>
                          <span>{withdrawal.user.email}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-bold text-lg">
                          {withdrawal.amount.toLocaleString('fr-FR')} FCFA
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {getPaymentMethodIcon(withdrawal.paymentMethod)}
                          {getPaymentMethodName(withdrawal.paymentMethod)}
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(withdrawal.createdAt)}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openDetails(withdrawal)}
                        >
                          <Info className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </div>
                      
                      <div className="flex gap-2 justify-end">
                        <Button 
                          size="sm" 
                          onClick={() => handleWithdrawalAction(withdrawal.id, "COMPLETED")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approuver
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleWithdrawalAction(withdrawal.id, "REJECTED")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeter
                        </Button>
                      </div>
                    </div>
                  ))}

                  {pendingWithdrawals.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <CreditCard className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg">Aucun retrait en attente</p>
                      <p className="text-sm mt-2">Tous les retraits ont été traités</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Retraits complétés */}
          <TabsContent value="completed" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Retraits Complétés</CardTitle>
                <CardDescription>
                  Historique des retraits approuvés et traités
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedWithdrawals.map(withdrawal => (
                    <div 
                      key={withdrawal.id} 
                      className="p-4 border rounded-lg grid grid-cols-1 md:grid-cols-6 gap-4 items-center"
                    >
                      <div className="md:col-span-2">
                        <div className="font-medium flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {withdrawal.user.name || "Utilisateur inconnu"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Badge variant="outline">{withdrawal.user.bcbId}</Badge>
                          <span className="ml-2">{withdrawal.user.email}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-bold">
                          {withdrawal.amount.toLocaleString('fr-FR')} FCFA
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {getPaymentMethodIcon(withdrawal.paymentMethod)}
                          {getPaymentMethodName(withdrawal.paymentMethod)}
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="text-sm flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(withdrawal.createdAt)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Traité: {formatDate(withdrawal.updatedAt)}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Badge variant="default" className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complété
                        </Badge>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openDetails(withdrawal)}
                        >
                          <Info className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </div>
                    </div>
                  ))}

                  {completedWithdrawals.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <p className="text-lg">Aucun retrait complété</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Retraits rejetés */}
          <TabsContent value="rejected" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Retraits Rejetés</CardTitle>
                <CardDescription>
                  Historique des retraits refusés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rejectedWithdrawals.map(withdrawal => (
                    <div 
                      key={withdrawal.id} 
                      className="p-4 border rounded-lg grid grid-cols-1 md:grid-cols-6 gap-4 items-center"
                    >
                      <div className="md:col-span-2">
                        <div className="font-medium flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {withdrawal.user.name || "Utilisateur inconnu"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Badge variant="outline">{withdrawal.user.bcbId}</Badge>
                          <span className="ml-2">{withdrawal.user.email}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-bold">
                          {withdrawal.amount.toLocaleString('fr-FR')} FCFA
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {getPaymentMethodIcon(withdrawal.paymentMethod)}
                          {getPaymentMethodName(withdrawal.paymentMethod)}
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="text-sm flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(withdrawal.createdAt)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rejeté: {formatDate(withdrawal.updatedAt)}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Badge variant="destructive" className="flex items-center">
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeté
                        </Badge>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openDetails(withdrawal)}
                        >
                          <Info className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </div>
                    </div>
                  ))}

                  {rejectedWithdrawals.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <XCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                      <p className="text-lg">Aucun retrait rejeté</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Historique complet */}
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Historique Complet</CardTitle>
                <CardDescription>
                  Tous les retraits traités par le système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {withdrawals.map(withdrawal => {
                    const statusColor = 
                      withdrawal.status === "PENDING" ? "bg-yellow-500" :
                      withdrawal.status === "COMPLETED" || withdrawal.status === "APPROVED" ? "bg-green-500" :
                      "bg-red-500"
                    
                    return (
                      <div 
                        key={withdrawal.id} 
                        className="p-4 border rounded-lg grid grid-cols-1 md:grid-cols-6 gap-4 items-center"
                      >
                        <div className="md:col-span-2">
                          <div className="font-medium flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {withdrawal.user.name || "Utilisateur inconnu"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <Badge variant="outline">{withdrawal.user.bcbId}</Badge>
                            <span className="ml-2">{withdrawal.user.email}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="font-bold">
                            {withdrawal.amount.toLocaleString('fr-FR')} FCFA
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            {getPaymentMethodIcon(withdrawal.paymentMethod)}
                            {getPaymentMethodName(withdrawal.paymentMethod)}
                          </div>
                        </div>
                        
                        <div className="flex flex-col">
                          <div className="text-sm flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(withdrawal.createdAt)}
                          </div>
                          {withdrawal.status !== "PENDING" && (
                            <div className="text-xs text-muted-foreground">
                              {formatDate(withdrawal.updatedAt)}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-end">
                          <Badge 
                            variant={
                              withdrawal.status === "PENDING" ? "secondary" :
                              withdrawal.status === "COMPLETED" || withdrawal.status === "APPROVED" ? "default" : 
                              "destructive"
                            }
                            className="flex items-center"
                          >
                            {withdrawal.status === "PENDING" && <Clock className="h-4 w-4 mr-1" />}
                            {withdrawal.status === "COMPLETED" && <CheckCircle className="h-4 w-4 mr-1" />}
                            {withdrawal.status === "REJECTED" && <XCircle className="h-4 w-4 mr-1" />}
                            {withdrawal.status}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openDetails(withdrawal)}
                          >
                            <Info className="h-4 w-4 mr-1" />
                            Détails
                          </Button>
                        </div>
                      </div>
                    )
                  })}

                  {withdrawals.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <History className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg">Aucun historique de retrait</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Modal de détails */}
        {viewDetails && selectedWithdrawal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Détails du Retrait</h2>
                  <button 
                    onClick={closeDetails}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Informations sur le retrait */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Banknote className="h-5 w-5 mr-2" />
                      Informations du Retrait
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">ID du Retrait</p>
                        <p className="font-medium">{selectedWithdrawal.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Montant</p>
                        <p className="font-medium text-xl">
                          {selectedWithdrawal.amount.toLocaleString('fr-FR')} FCFA
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Méthode</p>
                        <p className="font-medium flex items-center">
                          {getPaymentMethodIcon(selectedWithdrawal.paymentMethod)}
                          {getPaymentMethodName(selectedWithdrawal.paymentMethod)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Statut</p>
                        <Badge 
                          variant={
                            selectedWithdrawal.status === "PENDING" ? "secondary" :
                            selectedWithdrawal.status === "COMPLETED" ? "default" : 
                            "destructive"
                          }
                          className="text-sm"
                        >
                          {selectedWithdrawal.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date de Création</p>
                        <p className="font-medium">{formatDate(selectedWithdrawal.createdAt)}</p>
                      </div>
                      {selectedWithdrawal.status !== "PENDING" && (
                        <div>
                          <p className="text-sm text-muted-foreground">Date de Mise à Jour</p>
                          <p className="font-medium">{formatDate(selectedWithdrawal.updatedAt)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Informations sur l'utilisateur */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Informations de l'Utilisateur
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Nom</p>
                        <p className="font-medium">{selectedWithdrawal.user.name || "Non renseigné"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">BCB ID</p>
                        <p className="font-medium">{selectedWithdrawal.user.bcbId || "Non renseigné"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{selectedWithdrawal.user.email || "Non renseigné"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Téléphone</p>
                        <p className="font-medium">{selectedWithdrawal.user.phone || "Non renseigné"}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Détails du compte */}
                  {selectedWithdrawal.accountDetails && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Détails du Compte
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Fournisseur</p>
                          <p className="font-medium">{selectedWithdrawal.accountDetails.provider}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Numéro de Compte</p>
                          <p className="font-medium">{selectedWithdrawal.accountDetails.accountNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Nom du Compte</p>
                          <p className="font-medium">{selectedWithdrawal.accountDetails.accountName}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end pt-4">
                    <Button onClick={closeDetails}>Fermer</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}