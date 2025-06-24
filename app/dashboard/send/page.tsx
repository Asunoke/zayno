"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, User, DollarSign, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function SendMoneyPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    recipientBcbId: "",
    amount: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/transfers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStep(3) // Success step
      } else {
        alert(data.error || "Erreur lors du transfert")
      }
    } catch (error) {
      console.error("Transfer error:", error)
      alert("Erreur lors du transfert")
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (step === 1 && formData.recipientBcbId && formData.amount) {
      setStep(2)
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
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-white" : "bg-gray-200"}`}
              >
                3
              </div>
            </div>
          </div>

          {/* Step 1: Enter Details */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <Send className="h-6 w-6 mr-2" />
                  Envoyer de l'argent
                </CardTitle>
                <CardDescription>Entrez les détails du destinataire et le montant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="recipientBcbId" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    BCB ID du destinataire
                  </Label>
                  <Input
                    id="recipientBcbId"
                    placeholder="BCB123456"
                    value={formData.recipientBcbId}
                    onChange={(e) => setFormData({ ...formData, recipientBcbId: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Le BCB ID est un identifiant unique de 9 caractères (ex: BCB123456)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Montant (FCFA)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    min="100"
                    placeholder="10000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Minimum: 100 FCFA</span>
                    <span>Frais: Gratuit</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Description (optionnel)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Motif du transfert..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button onClick={handleNext} className="w-full" disabled={!formData.recipientBcbId || !formData.amount}>
                  Continuer
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Confirmer le transfert</CardTitle>
                <CardDescription>Vérifiez les détails avant de confirmer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destinataire</span>
                    <span className="font-medium">{formData.recipientBcbId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montant</span>
                    <span className="font-medium text-lg">{Number(formData.amount).toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frais</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Gratuit
                    </Badge>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="font-medium">Total à débiter</span>
                    <span className="font-bold text-lg">{Number(formData.amount).toLocaleString()} FCFA</span>
                  </div>
                  {formData.description && (
                    <div className="border-t pt-4">
                      <span className="text-muted-foreground">Description</span>
                      <p className="mt-1">{formData.description}</p>
                    </div>
                  )}
                </div>

                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div className="text-sm text-orange-800 dark:text-orange-200">
                      <p className="font-medium mb-1">Important</p>
                      <p>Assurez-vous que le BCB ID est correct. Les transferts sont instantanés et irréversibles.</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Retour
                  </Button>
                  <Button onClick={handleSubmit} disabled={loading} className="flex-1">
                    {loading ? "Envoi en cours..." : "Confirmer le transfert"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">Transfert réussi ! 🎉</h2>
                    <p className="text-muted-foreground">
                      Votre transfert de {Number(formData.amount).toLocaleString()} FCFA a été envoyé avec succès.
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Référence de transaction</p>
                    <p className="font-mono text-lg">BCB{Date.now()}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => router.push("/dashboard")} className="flex-1">
                      Retour au tableau de bord
                    </Button>
                    <Button onClick={() => setStep(1)} className="flex-1">
                      Nouveau transfert
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
