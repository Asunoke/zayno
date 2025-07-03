'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, User, DollarSign, MessageSquare, CheckCircle, AlertTriangle, Loader2 } from "lucide-react"
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
    return (
      <div className="min-h-screen bg-[#1F2937] flex items-center justify-center">
        <div className="flex items-center space-x-2 text-[#F7F7F7]">
          <Loader2 className="h-6 w-6 animate-spin text-[#6C8C68]" />
          <span>Chargement...</span>
        </div>
      </div>
    )
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

        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-[#6C8C68] text-white" : "bg-[#3A3F58] text-[#B0B7C3]"
                }`}
              >
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? "bg-[#6C8C68]" : "bg-[#3A3F58]"}`}></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-[#6C8C68] text-white" : "bg-[#3A3F58] text-[#B0B7C3]"
                }`}
              >
                2
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? "bg-[#6C8C68]" : "bg-[#3A3F58]"}`}></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-[#6C8C68] text-white" : "bg-[#3A3F58] text-[#B0B7C3]"
                }`}
              >
                3
              </div>
            </div>
          </div>

          {/* Step 1: Enter Details */}
          {step === 1 && (
            <Card className="bg-[#1E2A47] border-[#3A3F58]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#F7F7F7] flex items-center">
                  <Send className="h-6 w-6 mr-2 text-[#6C8C68]" />
                  Envoyer de l'argent
                </CardTitle>
                <CardDescription className="text-[#B0B7C3]">
                  Entrez les détails du destinataire et le montant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="recipientBcbId" className="flex items-center text-[#F7F7F7]">
                    <User className="h-4 w-4 mr-2 text-[#6C8C68]" />
                    BCB ID du destinataire
                  </Label>
                  <Input
                    id="recipientBcbId"
                    placeholder="BCB123456"
                    value={formData.recipientBcbId}
                    onChange={(e) => setFormData({ ...formData, recipientBcbId: e.target.value })}
                    required
                    className="bg-[#3A3F58] border-[#3A3F58] text-[#F7F7F7] focus:border-[#6C8C68]"
                  />
                  <p className="text-sm text-[#B0B7C3]">
                    Le BCB ID est un identifiant unique de 9 caractères (ex: BCB123456)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center text-[#F7F7F7]">
                    <DollarSign className="h-4 w-4 mr-2 text-[#6C8C68]" />
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
                    className="bg-[#3A3F58] border-[#3A3F58] text-[#F7F7F7] focus:border-[#6C8C68]"
                  />
                  <div className="flex justify-between text-sm text-[#B0B7C3]">
                    <span>Minimum: 100 FCFA</span>
                    <span>Frais: Gratuit</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center text-[#F7F7F7]">
                    <MessageSquare className="h-4 w-4 mr-2 text-[#6C8C68]" />
                    Description (optionnel)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Motif du transfert..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="bg-[#3A3F58] border-[#3A3F58] text-[#F7F7F7] focus:border-[#6C8C68]"
                  />
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-[#6C8C68] hover:bg-[#5A7A56]"
                  disabled={!formData.recipientBcbId || !formData.amount}
                >
                  Continuer
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && (
            <Card className="bg-[#1E2A47] border-[#3A3F58]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#F7F7F7]">Confirmer le transfert</CardTitle>
                <CardDescription className="text-[#B0B7C3]">Vérifiez les détails avant de confirmer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-[#3A3F58]/50 p-4 rounded-lg space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#B0B7C3]">Destinataire</span>
                    <span className="font-medium text-[#F7F7F7]">{formData.recipientBcbId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B0B7C3]">Montant</span>
                    <span className="font-medium text-lg text-[#F7F7F7]">
                      {Number(formData.amount).toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B0B7C3]">Frais</span>
                    <Badge className="bg-[#6C8C68]/20 text-[#6C8C68] border-[#6C8C68]/30">
                      Gratuit
                    </Badge>
                  </div>
                  <div className="flex justify-between border-t border-[#3A3F58] pt-4">
                    <span className="font-medium text-[#F7F7F7]">Total à débiter</span>
                    <span className="font-bold text-lg text-[#F7F7F7]">
                      {Number(formData.amount).toLocaleString()} FCFA
                    </span>
                  </div>
                  {formData.description && (
                    <div className="border-t border-[#3A3F58] pt-4">
                      <span className="text-[#B0B7C3]">Description</span>
                      <p className="mt-1 text-[#F7F7F7]">{formData.description}</p>
                    </div>
                  )}
                </div>

                <div className="bg-[#6C8C68]/10 border border-[#6C8C68]/30 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-[#6C8C68] mt-0.5" />
                    <div className="text-sm text-[#6C8C68]">
                      <p className="font-medium mb-1">Important</p>
                      <p>Assurez-vous que le BCB ID est correct. Les transferts sont instantanés et irréversibles.</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 border-[#3A3F58] text-[#F7F7F7] hover:bg-[#3A3F58]"
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-[#6C8C68] hover:bg-[#5A7A56]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Confirmer le transfert"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <Card className="bg-[#1E2A47] border-[#3A3F58]">
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-[#6C8C68]/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-[#6C8C68]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#F7F7F7] mb-2">Transfert réussi ! 🎉</h2>
                    <p className="text-[#B0B7C3]">
                      Votre transfert de {Number(formData.amount).toLocaleString()} FCFA a été envoyé avec succès.
                    </p>
                  </div>
                  <div className="bg-[#3A3F58]/50 p-4 rounded-lg">
                    <p className="text-sm text-[#B0B7C3] mb-2">Référence de transaction</p>
                    <p className="font-mono text-lg text-[#F7F7F7]">BCB{Date.now()}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => router.push("/dashboard")}
                      className="flex-1 border-[#3A3F58] text-[#F7F7F7] hover:bg-[#3A3F58]"
                    >
                      Retour au tableau de bord
                    </Button>
                    <Button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-[#6C8C68] hover:bg-[#5A7A56]"
                    >
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