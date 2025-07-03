'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Clock, Smartphone, Building, Loader2 } from "lucide-react"
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
          <Card className="bg-[#1E2A47] border-[#3A3F58]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F7F7F7]">Recharger votre compte</CardTitle>
              <CardDescription className="text-[#B0B7C3]">
                Ajoutez des fonds à votre compte ZAYNO en toute sécurité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-[#F7F7F7]">
                    Montant à déposer (FCFA)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1000"
                    max="1000000"
                    placeholder="Ex: 50000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                    className="bg-[#3A3F58] border-[#3A3F58] text-[#F7F7F7] focus:border-[#6C8C68]"
                  />
                  <p className="text-sm text-[#B0B7C3]">
                    Montant minimum: 1,000 FCFA - Maximum: 1,000,000 FCFA
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod" className="text-[#F7F7F7]">
                    Méthode de paiement
                  </Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    required
                  >
                    <SelectTrigger className="bg-[#3A3F58] border-[#3A3F58] text-[#F7F7F7]">
                      <SelectValue placeholder="Choisissez votre méthode de paiement" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E2A47] border-[#3A3F58]">
                      {paymentMethods.map((method) => (
                        <SelectItem
                          key={method.value}
                          value={method.value}
                          className="hover:bg-[#3A3F58] focus:bg-[#3A3F58]"
                        >
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
                    <Label htmlFor="phoneNumber" className="text-[#F7F7F7]">
                      Numéro de téléphone
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+223 XX XX XX XX"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      required
                      className="bg-[#3A3F58] border-[#3A3F58] text-[#F7F7F7] focus:border-[#6C8C68]"
                    />
                  </div>
                )}

                <div className="bg-[#6C8C68]/10 border border-[#6C8C68]/30 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-[#6C8C68] mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Important</span>
                  </div>
                  <ul className="text-sm text-[#6C8C68] space-y-1">
                    <li>• Vous aurez 50 minutes pour effectuer le paiement</li>
                    <li>• Un numéro de paiement vous sera fourni</li>
                    <li>• Votre compte sera crédité après vérification</li>
                    <li>• Gardez votre reçu de paiement comme preuve</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#6C8C68] hover:bg-[#5A7A56]"
                  disabled={loading || !formData.amount || !formData.paymentMethod}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    "Créer la demande de dépôt"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}