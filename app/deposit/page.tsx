"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Clock, Smartphone, Building } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DepositPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    phoneNumber: "",
  })

  const paymentMethods = [
    { value: "ORANGE_MONEY", label: "Orange Money", icon: Smartphone, color: "bg-orange-500" },
    { value: "MOOV_MONEY", label: "Moov Money", icon: Smartphone, color: "bg-blue-500" },
    { value: "BANK_TRANSFER", label: "Virement Bancaire", icon: Building, color: "bg-green-500" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/deposits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to payment confirmation page
        router.push(`/deposit/confirm/${data.deposit.id}`)
      } else {
        alert(data.error || "Erreur lors de la création de la demande")
      }
    } catch (error) {
      console.error("Deposit error:", error)
      alert("Erreur lors de la création de la demande")
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return <div>Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au tableau de bord
        </Link>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Recharger votre compte</CardTitle>
              <CardDescription>Ajoutez des fonds à votre compte BCB en toute sécurité</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant à déposer (FCFA)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1000"
                    max="1000000"
                    placeholder="Ex: 50000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Montant minimum: 1,000 FCFA - Maximum: 1,000,000 FCFA</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Méthode de paiement</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez votre méthode de paiement" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded ${method.color}`}></div>
                            <span>{method.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(formData.paymentMethod === "ORANGE_MONEY" || formData.paymentMethod === "MOOV_MONEY") && (
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+223 XX XX XX XX"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      required
                    />
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Important</span>
                  </div>
                  <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                    <li>• Vous aurez 50 minutes pour effectuer le paiement</li>
                    <li>• Un numéro de paiement vous sera fourni</li>
                    <li>• Votre compte sera crédité après vérification par notre équipe</li>
                    <li>• Gardez votre reçu de paiement comme preuve</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !formData.amount || !formData.paymentMethod}
                >
                  {loading ? "Création en cours..." : "Créer la demande de dépôt"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
