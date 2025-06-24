"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, MapPin, Phone, Building } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function WithdrawPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    method: "",
    destination: "", // Utilisez 'destination' au lieu de 'location' pour correspondre à votre API
    phoneNumber: "",
  })

  const withdrawalMethods = [
    { value: "AGENT", label: "Agent BCB", icon: MapPin, fee: "150 FCFA" },
    { value: "BANK_TRANSFER", label: "Virement bancaire", icon: Building, fee: "300 FCFA" },
    { value: "MOBILE_MONEY", label: "Mobile Money", icon: Phone, fee: "200 FCFA" },
  ]

  const agentLocations = [
    "Bamako - Centre ville",
    "Bamako - Hippodrome",
    "Bamako - Magnambougou",
    "Bamako - Kalaban Coro",
    "Sikasso - Centre",
    "Mopti - Centre",
    "Gao - Centre",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Préparer les données pour l'API
      const payload = {
        amount: formData.amount,
        method: formData.method,
        destination: formData.method === "MOBILE_MONEY" ? formData.phoneNumber : formData.destination
      }

      const response = await fetch("/api/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      const data = await response.json()

      toast({
        title: "Succès",
        description: "Votre demande de retrait a été créée avec succès",
      })

      // Rediriger vers l'historique ou le dashboard
      router.push("/dashboard/withdrawals")
    } catch (error) {
      console.error("Withdrawal error:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
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
                <Download className="h-6 w-6 mr-2" />
                Retirer de l'argent
              </CardTitle>
              <CardDescription>Retirez vos fonds via notre réseau d'agents ou par virement</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant à retirer (FCFA)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1000"
                    max="500000"
                    placeholder="Ex: 50000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Montant minimum: 1,000 FCFA - Maximum: 500,000 FCFA par jour
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method">Méthode de retrait</Label>
                  <Select
                    value={formData.method}
                    onValueChange={(value) => setFormData({ ...formData, method: value, destination: "" })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez votre méthode de retrait" />
                    </SelectTrigger>
                    <SelectContent>
                      {withdrawalMethods.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2">
                              <method.icon className="h-4 w-4" />
                              <span>{method.label}</span>
                            </div>
                            <Badge variant="secondary" className="ml-2">
                              {method.fee}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.method === "AGENT" && (
                  <div className="space-y-2">
                    <Label htmlFor="destination">Localisation de l'agent</Label>
                    <Select
                      value={formData.destination}
                      onValueChange={(value) => setFormData({ ...formData, destination: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisissez un agent près de chez vous" />
                      </SelectTrigger>
                      <SelectContent>
                        {agentLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.method === "MOBILE_MONEY" && (
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

                {formData.method === "BANK_TRANSFER" && (
                  <div className="space-y-2">
                    <Label htmlFor="destination">Informations bancaires</Label>
                    <Input
                      id="destination"
                      type="text"
                      placeholder="IBAN ou numéro de compte"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      required
                    />
                  </div>
                )}

                {formData.amount && formData.method && (
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Résumé du retrait</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300">Montant</span>
                        <span className="font-medium">{Number(formData.amount).toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300">Frais</span>
                        <span className="font-medium">
                          {withdrawalMethods.find((m) => m.value === formData.method)?.fee}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-blue-200 dark:border-blue-800 pt-2">
                        <span className="font-medium text-blue-900 dark:text-blue-100">Total à débiter</span>
                        <span className="font-bold">
                          {(
                            Number(formData.amount) +
                            Number.parseInt(
                              withdrawalMethods.find((m) => m.value === formData.method)?.fee.split(" ")[0] || "0",
                            )
                          ).toLocaleString()}{" "}
                          FCFA
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Important</h4>
                  <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                    <li>• Vous recevrez un code de retrait par SMS</li>
                    <li>• Le code est valable 24 heures</li>
                    <li>• Présentez une pièce d'identité valide</li>
                    <li>• Les retraits sont traités sous 2 heures</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" disabled={loading || !formData.amount || !formData.method}>
                  {loading ? "Création en cours..." : "Créer la demande de retrait"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}