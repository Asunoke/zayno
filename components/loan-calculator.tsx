"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, TrendingDown, Clock, Shield, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

interface LoanCalculatorProps {
  maxAmount: number
  creditTier: string
  onRequestLoan?: (amount: number, duration: number) => void
}

const tierRates = {
  BOIS: 4.5,
  BRONZE: 3.8,
  FER: 3.2,
  CUIVRE: 2.8,
  OR: 2.5,
  PLATINE: 2.0,
}

export function LoanCalculator({ maxAmount, creditTier, onRequestLoan }: LoanCalculatorProps) {
  const [amount, setAmount] = useState(50000)
  const [duration, setDuration] = useState([12])
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const interestRate = tierRates[creditTier as keyof typeof tierRates] || 4.5

  useEffect(() => {
    calculateLoan()
  }, [amount, duration, interestRate])

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12
    const months = duration[0]

    if (monthlyRate === 0) {
      const monthly = amount / months
      setMonthlyPayment(monthly)
      setTotalInterest(0)
      setTotalAmount(amount)
    } else {
      const monthly =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      const total = monthly * months
      const interest = total - amount

      setMonthlyPayment(monthly)
      setTotalInterest(interest)
      setTotalAmount(total)
    }
  }

  const handleAmountChange = (value: string) => {
    const numValue = Number.parseInt(value) || 0
    setAmount(Math.min(numValue, maxAmount))
  }

  const handleRequestLoan = () => {
    if (onRequestLoan) {
      onRequestLoan(amount, duration[0])
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2 text-primary" />
            Simulateur de Prêt
          </CardTitle>
          <CardDescription>Calculez votre prêt avec un taux préférentiel de {interestRate}% par an</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Montant */}
          <div className="space-y-3">
            <Label htmlFor="amount">Montant du prêt</Label>
            <div className="space-y-2">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                max={maxAmount}
                min={10000}
                step={5000}
                className="text-lg font-semibold"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Min: 10,000 FCFA</span>
                <span>Max: {maxAmount.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>

          {/* Durée */}
          <div className="space-y-3">
            <Label>Durée du prêt: {duration[0]} mois</Label>
            <Slider value={duration} onValueChange={setDuration} max={36} min={3} step={3} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>3 mois</span>
              <span>36 mois</span>
            </div>
          </div>

          <Separator />

          {/* Résultats */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <TrendingDown className="h-4 w-4 mr-2 text-green-500" />
              Détails du remboursement
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-primary/5 rounded-lg"
              >
                <div className="text-sm text-muted-foreground">Mensualité</div>
                <div className="text-2xl font-bold text-primary">
                  {monthlyPayment.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} FCFA
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 bg-secondary/5 rounded-lg"
              >
                <div className="text-sm text-muted-foreground">Intérêts totaux</div>
                <div className="text-2xl font-bold text-secondary">
                  {totalInterest.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} FCFA
                </div>
              </motion.div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Montant total à rembourser</span>
                <span className="text-xl font-bold">
                  {totalAmount.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} FCFA
                </span>
              </div>
            </div>
          </div>

          {/* Avantages */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              Vos avantages
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Taux préférentiel niveau {creditTier}</span>
                <Badge variant="secondary">{interestRate}% / an</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Pas de frais de dossier</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Gratuit
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Remboursement anticipé</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Autorisé
                </Badge>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
              <div className="text-sm text-orange-800 dark:text-orange-200">
                <p className="font-medium mb-1">Système Lombard</p>
                <p>
                  Un montant équivalent à 150% du prêt sera bloqué sur votre compte jusqu'au remboursement complet.
                  Montant bloqué: {(amount * 1.5).toLocaleString()} FCFA
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleRequestLoan}
            className="w-full"
            size="lg"
            disabled={amount < 10000 || amount > maxAmount}
          >
            <Clock className="h-4 w-4 mr-2" />
            Demander ce prêt
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
