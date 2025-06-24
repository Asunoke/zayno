"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Banknote, Calculator, Clock, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { LoanCalculator } from "@/components/loan-calculator"

export default function LoansPage() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const data = await response.json()
        setUserData(data.user)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const tierLimits = {
    BOIS: 25000,
    BRONZE: 75000,
    FER: 150000,
    CUIVRE: 250000,
    OR: 400000,
    PLATINE: 750000,
  }

  const tierRates = {
    BOIS: 4.5,
    BRONZE: 3.8,
    FER: 3.2,
    CUIVRE: 2.8,
    OR: 2.5,
    PLATINE: 2.0,
  }

  if (loading) {
    return <div>Chargement...</div>
  }

  if (!session || !userData) {
    return <div>Erreur de chargement des données</div>
  }

  const maxLoanAmount = tierLimits[userData.tier as keyof typeof tierLimits] || 25000
  const interestRate = tierRates[userData.tier as keyof typeof tierRates] || 4.5
  const isEligible = userData.creditScore >= 250

  const handleLoanRequest = async (amount: number, duration: number) => {
    try {
      // Simulate loan request
      alert(`Demande de prêt de ${amount.toLocaleString()} FCFA sur ${duration} mois créée avec succès !`)
    } catch (error) {
      console.error("Loan request error:", error)
      alert("Erreur lors de la demande de prêt")
    }
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

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Prêts BCB</h1>
            <p className="text-muted-foreground">Obtenez un prêt instantané basé sur votre score de crédit</p>
          </div>

          {/* Eligibility Status */}
          <Card
            className={`border-2 ${isEligible ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                {isEligible ? (
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                )}
                Statut d'éligibilité
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEligible ? (
                <div className="space-y-4">
                  <p className="text-green-800">🎉 Félicitations ! Vous êtes éligible pour un prêt BCB.</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <p className="text-sm text-muted-foreground">Montant maximum</p>
                      <p className="text-2xl font-bold text-primary">{maxLoanAmount.toLocaleString()} FCFA</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <p className="text-sm text-muted-foreground">Taux d'intérêt</p>
                      <p className="text-2xl font-bold text-primary">{interestRate}% / an</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <p className="text-sm text-muted-foreground">Votre niveau</p>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {userData.tier}
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-orange-800">
                    Vous n'êtes pas encore éligible pour un prêt. Il vous faut un score minimum de 250 points.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Votre score actuel</span>
                      <span>{userData.creditScore} / 250</span>
                    </div>
                    <Progress value={(userData.creditScore / 250) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Il vous manque {250 - userData.creditScore} points pour être éligible
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Loan Calculator */}
          {isEligible && (
            <LoanCalculator maxAmount={maxLoanAmount} creditTier={userData.tier} onRequestLoan={handleLoanRequest} />
          )}

          {/* How it works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Comment ça marche
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">1. Calculez votre prêt</h3>
                  <p className="text-sm text-muted-foreground">
                    Utilisez notre simulateur pour voir le montant et les mensualités
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">2. Validation instantanée</h3>
                  <p className="text-sm text-muted-foreground">
                    Votre demande est approuvée automatiquement selon votre score
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Banknote className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">3. Fonds disponibles</h3>
                  <p className="text-sm text-muted-foreground">L'argent est crédité sur votre compte immédiatement</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lombard System Info */}
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100">Système Lombard BCB</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-blue-800 dark:text-blue-200">
                <p>
                  <strong>Qu'est-ce que le système Lombard ?</strong>
                </p>
                <p>
                  Pour sécuriser votre prêt, nous bloquons temporairement 150% du montant emprunté sur votre compte.
                  Cette garantie est libérée dès le remboursement complet du prêt.
                </p>
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                  <p className="font-medium mb-2">Exemple :</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Prêt demandé : 100,000 FCFA</li>
                    <li>• Montant bloqué : 150,000 FCFA</li>
                    <li>• Vous recevez : 100,000 FCFA utilisables</li>
                    <li>• Solde requis : 150,000 FCFA minimum</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Avantages des prêts BCB</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Approbation instantanée</h4>
                    <p className="text-sm text-muted-foreground">Pas d'attente, décision immédiate</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Taux préférentiels</h4>
                    <p className="text-sm text-muted-foreground">Taux réduits selon votre niveau</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Remboursement flexible</h4>
                    <p className="text-sm text-muted-foreground">Remboursement anticipé autorisé</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Pas de frais cachés</h4>
                    <p className="text-sm text-muted-foreground">Transparence totale sur les coûts</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
