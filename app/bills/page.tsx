"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Zap, Droplets, Wifi, Tv, Receipt } from "lucide-react"
import Link from "next/link"

export default function BillsPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    provider: "",
    accountNumber: "",
    amount: "",
  })

  const billProviders = [
    {
      category: "Électricité",
      providers: [{ value: "EDM", label: "EDM (Énergie du Mali)", icon: Zap, color: "bg-yellow-500" }],
    },
    {
      category: "Eau",
      providers: [{ value: "SOMAGEP", label: "SOMAGEP", icon: Droplets, color: "bg-blue-500" }],
    },
    {
      category: "Internet",
      providers: [
        { value: "ORANGE_INTERNET", label: "Orange Internet", icon: Wifi, color: "bg-orange-500" },
        { value: "MALITEL_INTERNET", label: "Malitel Internet", icon: Wifi, color: "bg-green-500" },
      ],
    },
    {
      category: "Télévision",
      providers: [
        { value: "CANAL_PLUS", label: "Canal+ Mali", icon: Tv, color: "bg-purple-500" },
        { value: "STARTIMES", label: "StarTimes", icon: Tv, color: "bg-red-500" },
      ],
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("Facture payée avec succès !")
    } catch (error) {
      console.error("Bill payment error:", error)
      alert("Erreur lors du paiement")
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
              <CardTitle className="text-2xl text-primary flex items-center">
                <Receipt className="h-6 w-6 mr-2" />
                Payer vos factures
              </CardTitle>
              <CardDescription>Payez vos factures d'électricité, d'eau, internet et plus encore</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="provider">Fournisseur</Label>
                  <Select
                    value={formData.provider}
                    onValueChange={(value) => setFormData({ ...formData, provider: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez votre fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      {billProviders.map((category) => (
                        <div key={category.category}>
                          <div className="px-2 py-1 text-sm font-medium text-muted-foreground">{category.category}</div>
                          {category.providers.map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded ${provider.color}`}></div>
                                <span>{provider.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Numéro de compte / Référence</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Ex: 123456789"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Entrez votre numéro de compte ou référence client</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Montant (FCFA)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="100"
                    placeholder="Ex: 15000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Montant minimum: 100 FCFA</p>
                </div>

                {formData.provider && formData.amount && (
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Résumé du paiement</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300">Fournisseur</span>
                        <span className="font-medium">
                          {billProviders.flatMap((c) => c.providers).find((p) => p.value === formData.provider)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300">Montant</span>
                        <span className="font-medium">{Number(formData.amount).toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300">Frais</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Gratuit
                        </Badge>
                      </div>
                      <div className="flex justify-between border-t border-blue-200 dark:border-blue-800 pt-2">
                        <span className="font-medium text-blue-900 dark:text-blue-100">Total</span>
                        <span className="font-bold">{Number(formData.amount).toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Avantages BCB</h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• Paiement instantané et sécurisé</li>
                    <li>• Aucun frais de transaction</li>
                    <li>• Confirmation par SMS</li>
                    <li>• Historique des paiements</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !formData.provider || !formData.accountNumber || !formData.amount}
                >
                  {loading ? "Paiement en cours..." : "Payer la facture"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Bills */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Factures récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { provider: "EDM", amount: "25,000", date: "15 Nov 2024", status: "Payée" },
                  { provider: "SOMAGEP", amount: "8,500", date: "10 Nov 2024", status: "Payée" },
                  { provider: "Orange Internet", amount: "15,000", date: "5 Nov 2024", status: "Payée" },
                ].map((bill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{bill.provider}</p>
                      <p className="text-sm text-muted-foreground">{bill.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{bill.amount} FCFA</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {bill.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
