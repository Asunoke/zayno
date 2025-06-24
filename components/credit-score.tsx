"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Award, Star, Crown, Zap, Shield, Info, ChevronRight, Target, Calendar, Coins } from "lucide-react"
import { motion } from "framer-motion"

interface CreditScoreProps {
  score: number
  tier: string
  transactions: number
  totalAmount: number
  onImprove?: () => void
}

const tierConfig = {
  BOIS: {
    min: 0,
    max: 299,
    color: "bg-amber-800",
    icon: Award,
    name: "Bois",
    loanLimit: 25000,
    benefits: ["Transferts gratuits", "Support standard"],
    nextTier: "BRONZE",
  },
  BRONZE: {
    min: 300,
    max: 449,
    color: "bg-amber-600",
    icon: Award,
    name: "Bronze",
    loanLimit: 75000,
    benefits: ["Transferts gratuits", "Support prioritaire", "Prêt express"],
    nextTier: "FER",
  },
  FER: {
    min: 450,
    max: 599,
    color: "bg-gray-500",
    icon: Shield,
    name: "Fer",
    loanLimit: 150000,
    benefits: ["Tous les avantages Bronze", "Taux préférentiels", "Limite élevée"],
    nextTier: "CUIVRE",
  },
  CUIVRE: {
    min: 600,
    max: 749,
    color: "bg-orange-600",
    icon: Star,
    name: "Cuivre",
    loanLimit: 250000,
    benefits: ["Tous les avantages Fer", "Conseiller dédié", "Assurance incluse"],
    nextTier: "OR",
  },
  OR: {
    min: 750,
    max: 899,
    color: "bg-yellow-500",
    icon: Crown,
    name: "Or",
    loanLimit: 400000,
    benefits: ["Tous les avantages Cuivre", "Carte premium", "Investissements"],
    nextTier: "PLATINE",
  },
  PLATINE: {
    min: 900,
    max: 1000,
    color: "bg-purple-600",
    icon: Zap,
    name: "Platine",
    loanLimit: 750000,
    benefits: ["Tous les avantages Or", "Concierge 24/7", "Événements VIP"],
    nextTier: null,
  },
}

export function CreditScore({ score, tier, transactions, totalAmount, onImprove }: CreditScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const currentTier = tierConfig[tier as keyof typeof tierConfig]
  const nextTierKey = currentTier.nextTier
  const nextTier = nextTierKey ? tierConfig[nextTierKey as keyof typeof tierConfig] : null

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 500)
    return () => clearTimeout(timer)
  }, [score])

  const progressPercentage = nextTier ? ((score - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100

  const pointsToNext = nextTier ? nextTier.min - score : 0

  const getScoreColor = (score: number) => {
    if (score >= 900) return "text-purple-600"
    if (score >= 750) return "text-yellow-600"
    if (score >= 600) return "text-orange-600"
    if (score >= 450) return "text-gray-600"
    if (score >= 300) return "text-amber-600"
    return "text-amber-800"
  }

  const improvementTips = [
    { icon: Target, text: "Effectuez plus de transactions", points: "+10 pts par transaction" },
    { icon: Calendar, text: "Maintenez un historique régulier", points: "+5 pts par mois" },
    { icon: Coins, text: "Augmentez vos volumes", points: "+1 pt par 10k FCFA" },
  ]

  return (
    <div className="space-y-6">
      {/* Score Principal */}
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Score de Crédit BCB</CardTitle>
              <CardDescription>Votre niveau de confiance financière</CardDescription>
            </div>
            <div className={`w-12 h-12 rounded-full ${currentTier.color} flex items-center justify-center`}>
              <currentTier.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-6">
            {/* Score Display */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {animatedScore}
                  </motion.span>
                </div>
                <Badge variant="secondary" className={`${currentTier.color} text-white border-0`}>
                  Niveau {currentTier.name}
                </Badge>
              </motion.div>
            </div>

            {/* Progress Bar */}
            {nextTier && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progression vers {nextTier.name}</span>
                  <span className="font-medium">{pointsToNext} points restants</span>
                </div>
                <Progress value={Math.min(progressPercentage, 100)} className="h-3" />
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{transactions}</div>
                <div className="text-xs text-muted-foreground">Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{(totalAmount / 1000000).toFixed(1)}M</div>
                <div className="text-xs text-muted-foreground">Volume FCFA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{currentTier.loanLimit.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Limite prêt</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avantages du niveau actuel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="h-5 w-5 mr-2 text-secondary" />
            Vos Avantages {currentTier.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentTier.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm font-medium">Limite de prêt</span>
              <Badge variant="outline" className="text-primary border-primary">
                {currentTier.loanLimit.toLocaleString()} FCFA
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conseils d'amélioration */}
      {nextTier && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Comment atteindre {nextTier.name}
            </CardTitle>
            <CardDescription>Il vous faut {pointsToNext} points pour débloquer le niveau suivant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {improvementTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <tip.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{tip.text}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tip.points}
                  </Badge>
                </div>
              ))}

              {onImprove && (
                <Button onClick={onImprove} className="w-full mt-4" variant="outline">
                  <Info className="h-4 w-4 mr-2" />
                  Voir plus de conseils
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Niveau maximum atteint */}
      {!nextTier && (
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Félicitations ! 🎉</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Vous avez atteint le niveau maximum Platine
                </p>
              </div>
              <Badge className="bg-purple-600 text-white">Membre VIP BCB</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
