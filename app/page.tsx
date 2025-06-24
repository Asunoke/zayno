"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Zap, Smartphone, Globe, ChevronRight, User, Star, Award, Check } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const benefits = [
    {
      icon: Lock,
      title: "Sécurité bancaire",
      description: "Standard international avec chiffrement de niveau militaire",
    },
    {
      icon: Zap,
      title: "Transferts instantanés",
      description: "Envoyez de l'argent en quelques secondes 24h/24",
    },
    {
      icon: Smartphone,
      title: "Application mobile",
      description: "Interface simple et intuitive pour gérer votre argent",
    },
    {
      icon: Globe,
      title: "Accessibilité",
      description: "Services disponibles partout en Afrique",
    },
  ]

  const testimonials = [
    {
      name: "Aïssata D.",
      role: "Entrepreneure, Sénégal",
      content: "ZAYNO a simplifié la gestion de mon entreprise. Les transferts vers mes fournisseurs sont instantanés.",
      rating: 5
    },
    {
      name: "Mohamed K.",
      role: "Freelance, Côte d'Ivoire",
      content: "Enfin une banque qui comprend les besoins des travailleurs indépendants africains.",
      rating: 4
    },
    {
      name: "Fatou N.",
      role: "Étudiante, Mali",
      content: "L'application est tellement intuitive que même ma grand-mère l'utilise maintenant !",
      rating: 5
    },
  ]

  const partners = [
    { name: "Ecobank", logo: "/logos/ecobank.svg" },
    { name: "MTN", logo: "/logos/mtn.svg" },
    { name: "Orange Money", logo: "/logos/orange.svg" },
    { name: "CBAO", logo: "/logos/cbao.svg" },
  ]

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#3A3F58]">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1E2A47]">
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F7F7F7] leading-tight">
                  La banque née <br />pour l'Afrique.
                </h1>
                <p className="text-xl mb-8 text-[#B0B7C3]">Ton argent, ton pouvoir.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth">
                    <Button
                      size="lg"
                      className="bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7] font-medium px-8 py-4 text-lg transition-all duration-300"
                    >
                      Ouvrir un compte gratuitement
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0">
                {/* Illustration stylisée */}
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-64 h-64 bg-[#3A3F58] opacity-20 rounded-full"></div>
                  <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-[#B0B7C3]/20">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-[#1E2A47] font-bold text-xl">ZAYNO</div>
                      <div className="text-[#6C8C68] font-medium">Premium</div>
                    </div>
                    <div className="h-40 bg-gradient-to-r from-[#1E2A47] to-[#3A3F58] rounded-lg mb-6 flex items-center justify-center">
                      <Smartphone className="h-16 w-16 text-[#F7F7F7]" />
                    </div>
                    <div className="flex justify-between text-[#3A3F58] text-sm">
                      <div>•••• •••• •••• 1234</div>
                      <div>09/25</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3A3F58]">Pourquoi choisir ZAYNO ?</h2>
            <p className="text-lg text-[#B0B7C3] max-w-3xl mx-auto">
              Une solution bancaire moderne conçue pour les réalités africaines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border border-[#B0B7C3]/30 bg-white hover:border-[#6C8C68]/50 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-[#6C8C68]/10 flex items-center justify-center mb-4 text-[#6C8C68]`}>
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#3A3F58]">{benefit.title}</h3>
                  <p className="text-[#3A3F58]/80 leading-relaxed text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#1E2A47] text-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils nous font confiance</h2>
            <p className="text-lg text-[#B0B7C3] max-w-3xl mx-auto">
              Découvrez ce que nos clients disent de leur expérience ZAYNO
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#3A3F58]/30 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-[#6C8C68] fill-[#6C8C68]' : 'text-[#B0B7C3]/30'}`} 
                    />
                  ))}
                </div>
                <p className="italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#6C8C68] flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-[#B0B7C3]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#3A3F58]">Nos partenaires</h2>
            <p className="text-[#B0B7C3] max-w-3xl mx-auto">
              ZAYNO collabore avec les institutions financières et technologiques les plus innovantes
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center max-w-6xl mx-auto">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center h-12 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                <div className="text-lg font-medium text-[#3A3F58]">{partner.name}</div>
                {/* En production, utiliser une balise Image Next.js avec le logo réel */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1E2A47] to-[#3A3F58]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-[#B0B7C3]/10">
              <Award className="h-12 w-12 text-[#6C8C68] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F7F7F7]">Prêt à rejoindre la révolution ZAYNO ?</h2>
              <p className="text-lg text-[#B0B7C3] mb-8 max-w-2xl mx-auto">
                Ouvrez votre compte en 5 minutes et découvrez une nouvelle façon de gérer votre argent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7] font-medium px-8 py-4 text-lg transition-all duration-300"
                  >
                    Créer mon compte
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#F7F7F7] text-[#F7F7F7] hover:bg-white/10 px-8 py-4 text-lg"
                  >
                    Découvrir les fonctionnalités
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}