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
import { ArrowLeft, CreditCard, Truck, Shield, Star, Crown } from "lucide-react"
import Link from "next/link"

export default function CardRequestPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardType: "",
    deliveryAddress: "",
    city: "",
    phoneNumber: "",
  })

  const cardTypes = [
    {
      value: "STANDARD",
      label: "Carte Standard",
      icon: CreditCard,
      color: "bg-gray-600",
      fee: "5,000 FCFA",
      features: ["Retraits ATM", "Paiements en ligne", "Limite: 100,000 FCFA/jour"],
    },
    {
      value: "GOLD",
      label: "Carte Gold",
      icon: Star,
      color: "bg-yellow-500",
      fee: "15,000 FCFA",
      features: ["Tous les avantages Standard", "Limite: 500,000 FCFA/jour", "Assurance voyage"],
    },
    {
      value: "PLATINUM",
      label: "Carte Platinum",
      icon: Crown,
      color: "bg-purple-600",
      fee: "25,000 FCFA",
      features: ["Tous les avantages Gold", "Limite: 1,000,000 FCFA/jour", "Concierge 24/7"],
    },
  ]

  const cities = ["Bamako", "Sikasso", "Mopti", "Gao", "Tombouctou", "Kayes", "Ségou", "Koutiala", "Kidal"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("Demande de carte créée avec succès ! Vous recevrez votre carte sous 7 jours ouvrables.")
    } catch (error) {
      console.error("Card request error:", error)
      alert("Erreur lors de la demande")
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return <div>Chargement...</div>
  }

  const selectedCard = cardTypes.find((card) => card.value === formData.cardType)

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

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Commander votre carte BCB</h1>
            <p className="text-muted-foreground">Choisissez la carte qui correspond à vos besoins</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Card Selection */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Choisissez votre carte</CardTitle>
                  <CardDescription>Sélectionnez le type de carte qui vous convient</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cardTypes.map((card) => (
                    <div
                      key={card.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.cardType === card.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setFormData({ ...formData, cardType: card.value })}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                            <card.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{card.label}</h3>
                            <Badge variant="outline">{card.fee}</Badge>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {card.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Informations de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryAddress">Adresse de livraison</Label>
                      <Input
                        id="deliveryAddress"
                        placeholder="Ex: Rue 123, Quartier Hippodrome"
                        value={formData.deliveryAddress}
                        onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => setFormData({ ...formData, city: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez votre ville" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

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

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading || !formData.cardType || !formData.deliveryAddress || !formData.city}
                    >
                      {loading ? "Commande en cours..." : "Commander la carte"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Card Preview & Summary */}
            <div className="space-y-6">
              {/* Card Preview */}
              {selectedCard && (
                <Card>
                  <CardHeader>
                    <CardTitle>Aperçu de votre carte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`w-full h-48 rounded-xl ${selectedCard.color} p-6 text-white relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm opacity-80">BCB BANK</p>
                            <p className="text-xs opacity-60">{selectedCard.label}</p>
                          </div>
                          <div className="w-8 h-6 bg-white/20 rounded"></div>
                        </div>
                        <div>
                          <p className="font-mono text-lg tracking-wider">•••• •••• •••• 3456</p>
                          <div className="flex justify-between items-end mt-2">
                            <div>
                              <p className="text-xs opacity-60">Titulaire</p>
                              <p className="text-sm font-medium">{session?.user?.name?.toUpperCase()}</p>
                            </div>
                            <div>
                              <p className="text-xs opacity-60">Expire</p>
                              <p className="text-sm">12/28</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Order Summary */}
              {formData.cardType && (
                <Card>
                  <CardHeader>
                    <CardTitle>Résumé de la commande</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Type de carte</span>
                      <span className="font-medium">{selectedCard?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais de carte</span>
                      <span className="font-medium">{selectedCard?.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Gratuite
                      </Badge>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>{selectedCard?.fee}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Security Info */}
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Sécurité garantie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <li>• Puce sécurisée EMV</li>
                    <li>• Technologie sans contact</li>
                    <li>• Notifications en temps réel</li>
                    <li>• Blocage instantané via l'app</li>
                    <li>• Assurance contre la fraude</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Livraison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Délai de livraison</span>
                      <span className="font-medium">5-7 jours ouvrables</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Suivi</span>
                      <span className="font-medium">SMS + Email</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Activation</span>
                      <span className="font-medium">Automatique</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
