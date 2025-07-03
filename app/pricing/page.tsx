'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Send, Download, CreditCard, Smartphone, ArrowLeft, Zap, Shield, Clock } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Starter",
      price: "0 FCFA",
      description: "Parfait pour essayer ZAYNO",
      features: [
        "Transferts gratuits entre utilisateurs",
        "Retraits jusqu'à 25,000 FCFA/mois",
        "Support standard",
        "Carte virtuelle incluse",
      ],
      cta: "Commencer gratuitement",
      popular: false,
    },
    {
      name: "Premium",
      price: "2,500 FCFA",
      description: "Pour une utilisation régulière",
      features: [
        "Tous les avantages Starter",
        "Retraits jusqu'à 100,000 FCFA/mois",
        "Support prioritaire",
        "Carte physique (frais séparés)",
        "Statistiques avancées",
      ],
      cta: "Passer à Premium",
      popular: true,
    },
    {
      name: "Business",
      price: "5,000 FCFA",
      description: "Pour professionnels et entreprises",
      features: [
        "Tous les avantages Premium",
        "Retraits illimités",
        "Comptes multi-utilisateurs",
        "API d'intégration",
        "Gestion de paie",
        "Dédicated account manager",
      ],
      cta: "Pour les entreprises",
      popular: false,
    },
  ]

  const features = [
    {
      icon: Send,
      title: "Transferts instantanés",
      description: "Envoyez de l'argent en quelques secondes 24h/24",
    },
    {
      icon: Download,
      title: "Retraits sans frais",
      description: "Retirez jusqu'à 25,000 FCFA/mois gratuitement",
    },
    {
      icon: CreditCard,
      title: "Cartes virtuelles",
      description: "Payez en ligne en toute sécurité",
    },
    {
      icon: Shield,
      title: "Sécurité bancaire",
      description: "Protection de niveau institutionnel",
    },
    {
      icon: Zap,
      title: "Mobile Money",
      description: "Intégration avec Orange Money et Moov Money",
    },
    {
      icon: Clock,
      title: "Historique complet",
      description: "Suivez toutes vos transactions",
    },
  ]

  const faqs = [
    {
      question: "Puis-je changer de formule ?",
      answer: "Oui, vous pouvez changer de formule à tout moment depuis votre tableau de bord."
    },
    {
      question: "Y a-t-il des frais cachés ?",
      answer: "Non, tous nos tarifs sont transparents. Vous voyez exactement ce que vous payez."
    },
    {
      question: "Comment sont facturés les services supplémentaires ?",
      answer: "Les services non-inclus dans votre formule sont facturés à l'usage et vous êtes prévenu avant tout débit."
    },
    {
      question: "Puis-je annuler à tout moment ?",
      answer: "Oui, vous pouvez annuler votre abonnement premium à tout moment sans frais."
    }
  ]

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge variant="outline" className="bg-[#6C8C68]/10 text-[#6C8C68] border-[#6C8C68]/30 mb-4">
            Tarifs transparents
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E2A47] mb-4">
            Une banque adaptée à <span className="text-[#6C8C68]">vos besoins</span>
          </h1>
          <p className="text-xl text-[#3A3F58] max-w-2xl mx-auto">
            Choisissez la formule qui correspond à votre usage et payez seulement ce dont vous avez besoin.
          </p>
        </div>

        {/* Pricing Tabs */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden border-2 ${
                  plan.popular 
                    ? "border-[#6C8C68] shadow-lg" 
                    : "border-[#B0B7C3]/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#6C8C68] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAIRE
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1E2A47]">{plan.name}</CardTitle>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-[#1E2A47]">{plan.price}</span>
                    {plan.price !== "0 FCFA" && <span className="text-[#3A3F58] ml-1">/mois</span>}
                  </div>
                  <CardDescription className="text-[#3A3F58]">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-[#6C8C68] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-[#3A3F58]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular 
                        ? "bg-[#6C8C68] hover:bg-[#5A7A56] text-white" 
                        : "bg-white text-[#1E2A47] border border-[#B0B7C3] hover:bg-[#F7F7F7]"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E2A47] mb-4">
              Tout ce dont vous avez besoin pour <span className="text-[#6C8C68]">gérer votre argent</span>
            </h2>
            <p className="text-xl text-[#3A3F58] max-w-2xl mx-auto">
              Des fonctionnalités puissantes conçues pour simplifier vos finances
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border-[#B0B7C3]/30 hover:border-[#6C8C68]/50 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#6C8C68]/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-[#6C8C68]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1E2A47] mb-2">{feature.title}</h3>
                  <p className="text-[#3A3F58]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E2A47] mb-4">Questions fréquentes</h2>
            <p className="text-xl text-[#3A3F58]">Trouvez rapidement les réponses à vos questions</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-[#B0B7C3]/30">
                <CardHeader className="pb-0">
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span className="text-lg text-[#1E2A47]">{faq.question}</span>
                      <svg 
                        className="h-5 w-5 text-[#6C8C68] group-open:rotate-180 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-4 text-[#3A3F58]">{faq.answer}</p>
                  </details>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#1E2A47] to-[#3A3F58] rounded-2xl p-8 md:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F7F7F7] mb-4">
              Prêt à rejoindre la révolution bancaire ?
            </h2>
            <p className="text-xl text-[#B0B7C3] mb-8">
              Créez votre compte en 5 minutes et découvrez une nouvelle façon de gérer votre argent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7] px-8 py-4 text-lg"
                >
                  Créer mon compte gratuitement
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#F7F7F7] text-[#F7F7F7] hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}