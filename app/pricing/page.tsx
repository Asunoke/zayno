"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Send, Download, CreditCard, Smartphone, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PricingPage() {
  const services = [
    {
      icon: Send,
      title: "Transferts d'argent",
      description: "Envoyez de l'argent instantanément",
      pricing: [
        { range: "0 - 10,000 FCFA", fee: "Gratuit", popular: true },
        { range: "10,001 - 50,000 FCFA", fee: "100 FCFA" },
        { range: "50,001 - 100,000 FCFA", fee: "200 FCFA" },
        { range: "100,001 - 500,000 FCFA", fee: "500 FCFA" },
        { range: "500,001 FCFA et plus", fee: "0.1%" },
      ],
    },
    {
      icon: Download,
      title: "Retraits d'argent",
      description: "Retirez votre argent chez nos agents partenaires",
      pricing: [
        { range: "0 - 25,000 FCFA", fee: "Gratuit", popular: true },
        { range: "25,001 - 100,000 FCFA", fee: "150 FCFA" },
        { range: "100,001 - 250,000 FCFA", fee: "300 FCFA" },
        { range: "250,001 FCFA et plus", fee: "500 FCFA" },
      ],
    },
    {
      icon: CreditCard,
      title: "Paiements marchands",
      description: "Payez vos factures et achats en ligne",
      pricing: [
        { range: "Factures d'électricité", fee: "Gratuit", popular: true },
        { range: "Factures d'eau", fee: "Gratuit", popular: true },
        { range: "Recharge téléphonique", fee: "Gratuit", popular: true },
        { range: "Achats en ligne", fee: "1.5%" },
      ],
    },
    {
      icon: Smartphone,
      title: "Services premium",
      description: "Fonctionnalités avancées pour les utilisateurs premium",
      pricing: [
        { range: "Compte premium mensuel", fee: "2,500 FCFA" },
        { range: "Limite de transfert élevée", fee: "Inclus" },
        { range: "Support prioritaire", fee: "Inclus" },
        { range: "Rapports détaillés", fee: "Inclus" },
      ],
    },
  ]

  const advantages = [
    "Aucun frais caché",
    "Transparence totale",
    "Tarifs compétitifs",
    "Promotions régulières",
    "Réductions pour gros volumes",
    "Support client gratuit",
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Retour */}
        <Link href="/" className="inline-flex items-center text-[#003366] hover:text-[#DAA520] transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">Tarifs & Frais</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des tarifs transparents et compétitifs pour tous vos besoins financiers. Chez BCB, nous croyons en la
            transparence totale.
          </p>
        </div>

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white rounded-2xl p-8 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">🎉 Offre de lancement</h2>
          <p className="text-lg mb-4">
            Profitez de <strong>3 mois gratuits</strong> sur tous les transferts jusqu'à 50,000 FCFA
          </p>
          <Badge variant="secondary" className="bg-white text-[#003366] font-semibold">
            Valable jusqu'au 31 Mars 2024
          </Badge>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-2 border-gray-100 hover:border-[#003366] transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004080] rounded-lg flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-[#003366]">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {service.pricing.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-gray-700">{item.range}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-[#003366]">{item.fee}</span>
                        {item.popular && (
                          <Badge variant="secondary" className="bg-[#DAA520] text-white text-xs">
                            Populaire
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advantages Section */}
        <div className="bg-gradient-to-br from-[#003366] to-[#004080] text-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Pourquoi Choisir BCB ?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#DAA520] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-[#003366]" />
                  </div>
                  <span className="text-lg">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[#003366] text-center mb-12">Questions Fréquentes</h2>
          <div className="space-y-6">
            {[
              {
                question: "Y a-t-il des frais cachés ?",
                answer:
                  "Non, absolument aucun frais caché. Tous nos tarifs sont affichés de manière transparente et vous êtes informé du coût exact avant chaque transaction.",
              },
              {
                question: "Comment sont calculés les frais de transfert ?",
                answer:
                  "Les frais sont calculés selon le montant transféré. Plus le montant est élevé, plus le pourcentage de frais diminue, rendant les gros transferts plus avantageux.",
              },
              {
                question: "Puis-je bénéficier de réductions ?",
                answer:
                  "Oui ! Nous offrons des réductions pour les utilisateurs fréquents et les gros volumes. Contactez notre équipe commerciale pour des tarifs préférentiels.",
              },
              {
                question: "Les tarifs peuvent-ils changer ?",
                answer:
                  "Nos tarifs sont stables, mais peuvent évoluer. Vous serez toujours informé 30 jours à l'avance de tout changement tarifaire.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-[#003366]">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#003366] mb-4">Prêt à Commencer ?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Créez votre compte BCB dès maintenant et profitez de nos tarifs avantageux
          </p>
          <Link href="/auth">
            <Button
              size="lg"
              className="bg-[#DAA520] hover:bg-[#B8860B] text-[#003366] font-semibold px-12 py-4 text-xl transition-all duration-300 hover:scale-105"
            >
              Créer mon compte gratuitement
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
