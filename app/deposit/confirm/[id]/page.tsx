"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Copy, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DepositConfirmPage() {
  const params = useParams()
  const [deposit, setDeposit] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeposit()
  }, [params.id])

  useEffect(() => {
    if (deposit && deposit.expiresAt) {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const expiry = new Date(deposit.expiresAt).getTime()
        const difference = expiry - now

        if (difference > 0) {
          setTimeLeft(Math.floor(difference / 1000))
        } else {
          setTimeLeft(0)
          clearInterval(timer)
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [deposit])

  const fetchDeposit = async () => {
    try {
      const response = await fetch(`/api/deposits/${params.id}`)
      const data = await response.json()

      if (response.ok) {
        setDeposit(data.deposit)
      }
    } catch (error) {
      console.error("Error fetching deposit:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Chargement...</div>
      </div>
    )
  }

  if (!deposit) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Demande de dépôt non trouvée</div>
      </div>
    )
  }

  const paymentNumber =
    deposit.paymentMethod === "ORANGE_MONEY"
      ? "44 44 44 44"
      : deposit.paymentMethod === "MOOV_MONEY"
        ? "55 55 55 55"
        : "ML34 BCB1 0000000001"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Confirmation de Dépôt</CardTitle>
              <CardDescription>Suivez les instructions ci-dessous pour finaliser votre dépôt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Timer */}
              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold text-orange-600">Temps restant</span>
                </div>
                <div className="text-3xl font-bold text-orange-600">{formatTime(timeLeft)}</div>
                <p className="text-sm text-orange-600 mt-1">Cette demande expirera automatiquement</p>
              </div>

              {/* Payment Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Montant</p>
                    <p className="text-2xl font-bold text-primary">{Number(deposit.amount).toLocaleString()} FCFA</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Méthode</p>
                    <Badge variant="secondary" className="mt-1">
                      {deposit.paymentMethod.replace("_", " ")}
                    </Badge>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="font-semibold text-primary mb-2">Numéro de paiement:</p>
                  <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded border">
                    <span className="font-mono text-lg">{paymentNumber}</span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(paymentNumber)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h3 className="font-semibold text-primary">Instructions de paiement:</h3>

                {deposit.paymentMethod === "ORANGE_MONEY" && (
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Composez #144# sur votre téléphone</li>
                    <li>Sélectionnez "Transfert d'argent"</li>
                    <li>Entrez le numéro: {paymentNumber}</li>
                    <li>Entrez le montant: {Number(deposit.amount).toLocaleString()} FCFA</li>
                    <li>Confirmez avec votre code PIN</li>
                    <li>Gardez le reçu SMS comme preuve</li>
                  </ol>
                )}

                {deposit.paymentMethod === "MOOV_MONEY" && (
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Composez *555# sur votre téléphone</li>
                    <li>Sélectionnez "Transfert"</li>
                    <li>Entrez le numéro: {paymentNumber}</li>
                    <li>Entrez le montant: {Number(deposit.amount).toLocaleString()} FCFA</li>
                    <li>Confirmez avec votre code PIN</li>
                    <li>Gardez le reçu SMS comme preuve</li>
                  </ol>
                )}

                {deposit.paymentMethod === "BANK_TRANSFER" && (
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Connectez-vous à votre banque en ligne</li>
                    <li>Effectuez un virement vers: {paymentNumber}</li>
                    <li>Montant: {Number(deposit.amount).toLocaleString()} FCFA</li>
                    <li>Référence: BCB-{deposit.id}</li>
                    <li>Gardez le reçu de virement</li>
                  </ol>
                )}
              </div>

              {/* Status */}
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-600">Statut de la demande</span>
                </div>
                <Badge variant={deposit.status === "CONFIRMED" ? "default" : "secondary"}>
                  {deposit.status === "PENDING" && "En attente de paiement"}
                  {deposit.status === "CONFIRMED" && "Confirmé"}
                  {deposit.status === "REJECTED" && "Rejeté"}
                  {deposit.status === "EXPIRED" && "Expiré"}
                </Badge>

                {deposit.status === "PENDING" && (
                  <p className="text-sm text-blue-600 mt-2">
                    Votre compte sera crédité automatiquement après vérification du paiement par notre équipe.
                  </p>
                )}
              </div>

              <div className="flex space-x-4">
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Retour au tableau de bord
                  </Button>
                </Link>
                <Button onClick={fetchDeposit} className="flex-1">
                  Actualiser le statut
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
