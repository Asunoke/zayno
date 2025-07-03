'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // Import ajouté ici
import { 
  Smartphone, 
  Zap, 
  Shield, 
  CreditCard, 
  Globe, 
  Coins,
  ArrowRight,
  Banknote,
  Clock,
  Send,
  Wallet
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function FeaturesPage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const features = [
    {
      icon: Zap,
      title: "Transferts Instantanés",
      description: "Envoyez de l'argent en quelques secondes 24h/24 à n'importe quel utilisateur ZAYNO",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Technologie bancaire de niveau militaire avec authentification biométrique",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: CreditCard,
      title: "Cartes Virtuelles",
      description: "Générez des cartes virtuelles sécurisées pour vos paiements en ligne",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      icon: Globe,
      title: "Mobile Money Intégré",
      description: "Connectez vos comptes Orange Money, Moov Money et Wave en un clic",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      icon: Coins,
      title: "Gestion d'Épargne",
      description: "Créez des espaces d'épargne avec des objectifs et des rendements attractifs",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      icon: Banknote,
      title: "Accès au Crédit",
      description: "Obtenez des prêts personnalisés basés sur votre historique financier",
      color: "text-red-500",
      bg: "bg-red-500/10"
    }
  ]

  const howItWorks = [
    {
      step: "1",
      icon: Smartphone,
      title: "Téléchargez l'App",
      description: "Disponible sur iOS et Android"
    },
    {
      step: "2",
      icon: Wallet,
      title: "Créez Votre Compte",
      description: "Enregistrement en 5 minutes seulement"
    },
    {
      step: "3",
      icon: Send,
      title: "Commencez à Utiliser",
      description: "Effectuez votre premier dépôt ou transfert"
    }
  ]

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />

      {/* Hero Section with Parallax */}
      <div 
        ref={ref}
        className="relative h-[80vh] overflow-hidden bg-gradient-to-br from-[#1E2A47] to-[#3A3F58] flex items-center justify-center"
      >
        <motion.div 
          style={{ y: yBg, opacity: opacityBg }}
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-cover opacity-10"
        />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="bg-[#6C8C68]/10 text-[#6C8C68] border-[#6C8C68]/30 mb-6">
              La révolution bancaire
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-[#F7F7F7] mb-6">
              Votre <span className="text-[#6C8C68]">banque digitale</span> africaine
            </h1>
            <p className="text-xl text-[#B0B7C3] max-w-3xl mx-auto mb-8">
              Découvrez une nouvelle façon de gérer votre argent avec des fonctionnalités conçues pour l'Afrique moderne
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7] px-8 py-6 text-lg"
                >
                  Commencer maintenant
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#F7F7F7] text-[#F7F7F7] hover:bg-white/10 px-8 py-6 text-lg"
                >
                  Explorer les fonctionnalités
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E2A47] mb-4">
              Tout ce dont vous avez besoin pour <span className="text-[#6C8C68]">vos finances</span>
            </h2>
            <p className="text-xl text-[#3A3F58] max-w-3xl mx-auto">
              Une suite complète d'outils bancaires dans votre poche
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-[#B0B7C3]/30 bg-white hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-[#1E2A47]">{feature.title}</CardTitle>
                    <CardDescription className="text-[#3A3F58]">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="text-[#6C8C68] pl-0 hover:bg-transparent">
                      En savoir plus <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-[#1E2A47] to-[#3A3F58] text-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comment <span className="text-[#6C8C68]">commencer</span> ?
            </h2>
            <p className="text-xl text-[#B0B7C3] max-w-3xl mx-auto">
              En seulement 3 étapes simples, vous serez prêt à utiliser ZAYNO
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#6C8C68] flex items-center justify-center text-white font-bold z-10">
                  {step.step}
                </div>
                <Card className="bg-[#3A3F58]/30 backdrop-blur-sm border-[#B0B7C3]/10 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-[#6C8C68]/10 rounded-lg flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-[#6C8C68]" />
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription className="text-[#B0B7C3]">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#6C8C68] to-[#5A7A56] rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Prêt à rejoindre la révolution bancaire ZAYNO ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Créez votre compte en 5 minutes et découvrez une nouvelle façon de gérer votre argent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-white text-[#6C8C68] hover:bg-white/90 px-8 py-6 text-lg"
                >
                  Créer mon compte gratuitement
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}