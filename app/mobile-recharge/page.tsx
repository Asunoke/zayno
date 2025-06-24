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
import { ArrowLeft, Smartphone, Phone } from "lucide-react"
import Link from "next/link"

export default function MobileRechargePage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    operator: "",
    phoneNumber: "",
    amount: "",
  })

  const operators = [
    {
      value: "ORANGE",
      label: "Orange Mali",
      color: "bg-orange-500",
      prefixes: ["07", "09"],
      amounts: [500, 1000, 2000, 5000, 10000, 15000, 20000],
    },
    {
      value: "MOOV",
      label: "Moov Africa Mali",
      color: "bg-blue-500",
      prefixes: ["06", "08"],
      amounts: [500, 1000, 2000, 5000, 10000, 15000, 20000],
    },
    {
      value: "TELECEL",
      label: "Telecel Mali",
      color: "bg-green-500",
      prefixes: ["05"],
      amounts: [500, 1000, 2000, 5000, 10000, 15000, 20000],
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("Recharge effectuée avec succès !")
    } catch (error) {
      console.error("Recharge error:", error)
      alert("Erreur lors de la recharge")
    } finally {
      setLoading(false)
    }
  }

  const selectedOperator = operators.find((op) => op.value === formData.operator)

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
                <Smartphone className="h-6 w-6 mr-2" />
                Recharge mobile
              </CardTitle>
              <CardDescription>Rechargez votre crédit téléphonique instantanément</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="operator">Opérateur</Label>
                  <Select
                    value={formData.operator}
                    onValueChange={(value) => setFormData({ ...formData, operator: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez votre opérateur" />
                    </SelectTrigger>
                    <SelectContent>
                      {operators.map((operator) => (
                        <SelectItem key={operator.value} value={operator.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded ${operator.color}`}></div>
                            <span>{operator.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedOperator && (
                    <p className="text-sm text-muted-foreground">
                      Préfixes supportés: {selectedOperator.prefixes.join(", ")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Ex: 07 XX XX XX XX"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Entrez le numéro sans l'indicatif pays (+223)</p>
                </div>

                {/* Quick Amount Selection */}
                {selectedOperator && (
                  <div className="space-y-2">
                    <Label>Montants rapides</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {selectedOperator.amounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={formData.amount === amount.toString() ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                        >
                          {amount.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount">Montant personnalisé (FCFA)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="100"
                    max="50000"
                    placeholder="Ex: 5000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Montant minimum: 100 FCFA - Maximum: 50,000 FCFA</p>
                </div>

                {formData.operator && formData.amount && (
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Résumé de la recharge</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300">Opérateur</span>
                        <span className="font-medium">{selectedOperator?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300">Numéro</span>
                        <span className="font-medium">{formData.phoneNumber}</span>
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
                    <li>• Recharge instantanée</li>
                    <li>• Aucun frais de transaction</li>
                    <li>• Confirmation par SMS</li>
                    <li>• Disponible 24h/24 et 7j/7</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !formData.operator || !formData.phoneNumber || !formData.amount}
                >
                  {loading ? "Recharge en cours..." : "Effectuer la recharge"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Recharges */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recharges récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { operator: "Orange Mali", number: "07 XX XX XX 45", amount: "5,000", date: "Aujourd'hui 14:30" },
                  { operator: "Moov Africa", number: "06 XX XX XX 78", amount: "10,000", date: "Hier 09:15" },
                  { operator: "Orange Mali", number: "07 XX XX XX 45", amount: "2,000", date: "15 Nov 16:20" },
                ].map((recharge, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{recharge.operator}</p>
                        <p className="text-sm text-muted-foreground">{recharge.number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{recharge.amount} FCFA</p>
                      <p className="text-sm text-muted-foreground">{recharge.date}</p>
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
