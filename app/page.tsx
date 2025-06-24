'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Zap, Smartphone, Globe, ChevronRight, User, Star, Award, Check, ArrowRight, CreditCard, Coins, Wallet, Send, Clock, Shield, SmartphoneCharging } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activePlan, setActivePlan] = useState('monthly')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const benefits = [
    {
      icon: Lock,
      title: "Sécurité bancaire avancée",
      description: "Protection de niveau militaire avec cryptage AES-256 et authentification biométrique",
    },
    {
      icon: Zap,
      title: "Transferts instantanés",
      description: "Envoyez et recevez de l'argent en quelques secondes 24h/24",
    },
    {
      icon: Smartphone,
      title: "Application 100% mobile",
      description: "Gérez votre compte depuis notre app intuitive et performante",
    },
    {
      icon: Globe,
      title: "Intégration Mobile Money",
      description: "Connectez vos comptes Orange Money, Moov, Wave et autres",
    },
    {
      icon: CreditCard,
      title: "Carte ZAYNO",
      description: "Virtuelle disponible, physique bientôt lancée (Visa/Mastercard)",
    },
    {
      icon: Coins,
      title: "Scoring crédit intelligent",
      description: "Accès à des prêts personnalisés basés sur votre historique",
    },
  ]

  const steps = [
    {
      step: "1",
      title: "Crée ton compte",
      description: "Télécharge l'app et enregistre-toi en 5 minutes avec ta pièce d'identité",
      icon: User
    },
    {
      step: "2",
      title: "Recharge facilement",
      description: "Alimente ton compte via Mobile Money ou virement bancaire",
      icon: Wallet
    },
    {
      step: "3",
      title: "Utilise et profite",
      description: "Effectue des paiements, transferts ou demande un crédit",
      icon: Send
    }
  ]

  const pricingPlans = [
    {
      name: "Zayno Start",
      price: "0 FCFA",
      period: "/mois",
      features: [
        "Compte gratuit",
        "Transferts entre utilisateurs",
        "App mobile complète",
        "Support standard"
      ],
      cta: "Commencer"
    },
    {
      name: "Zayno Plus",
      price: "1 500 FCFA",
      period: "/mois",
      features: [
        "Historique étendu (12 mois)",
        "Retraits instantanés",
        "Support prioritaire",
        "Limites augmentées"
      ],
      cta: "M'upgrader",
      popular: true
    },
    {
      name: "Zayno Credit",
      price: "Sur demande",
      period: "",
      features: [
        "Prêts personnalisés",
        "Scoring crédit intelligent",
        "Taux compétitifs",
        "Accès Lombard"
      ],
      cta: "En savoir plus"
    }
  ]

  const testimonials = [
    {
      name: "Aïssata D.",
      role: "Entrepreneure, Sénégal",
      content: "ZAYNO a révolutionné la gestion de mon entreprise. Les transferts vers mes fournisseurs sont instantanés et les frais minimes.",
      rating: 5
    },
    {
      name: "Mohamed K.",
      role: "Freelance, Côte d'Ivoire",
      content: "Enfin une banque qui comprend les besoins des travailleurs indépendants africains. L'interface est intuitive et le scoring crédit m'a permis d'obtenir un prêt pour mon matériel.",
      rating: 4
    },
    {
      name: "Fatou N.",
      role: "Étudiante, Mali",
      content: "L'application est tellement intuitive que même ma grand-mère l'utilise maintenant ! Le support client est réactif et disponible en français et en langues locales.",
      rating: 5
    },
  ]

  const partners = [
    { name: "Orange Money", logo: "/logos/orange.svg" },
    { name: "MTN Mobile Money", logo: "/logos/mtn.svg" },
    { name: "Wave", logo: "/logos/wave.svg" },
    { name: "Moov Money", logo: "/logos/moov.svg" },
    { name: "Ecobank", logo: "/logos/ecobank.svg" },
  ]

  const faqs = [
    {
      question: "Comment ouvrir un compte ZAYNO ?",
      answer: "Téléchargez notre application mobile, remplissez le formulaire d'inscription avec vos informations personnelles et une pièce d'identité valide. Votre compte sera activé après vérification (moins de 24h)."
    },
    {
      question: "Quels sont les frais sur les transferts ?",
      answer: "Les transferts entre utilisateurs ZAYNO sont gratuits. Les transferts vers d'autres banques ou Mobile Money sont facturés à 1% avec un minimum de 200 FCFA."
    },
    {
      question: "Comment recharger mon compte ?",
      answer: "Vous pouvez recharger via Mobile Money (Orange, MTN, Moov, Wave), virement bancaire ou dépôt chez nos partenaires."
    },
    {
      question: "Mon argent est-il en sécurité ?",
      answer: "Absolument. Nous utilisons les mêmes standards de sécurité que les grandes banques internationales avec cryptage AES-256 et authentification à deux facteurs."
    },
    {
      question: "Quand la carte physique sera-t-elle disponible ?",
      answer: "Les cartes physiques Visa ZAYNO seront lancées au Q1 2024. Vous pouvez déjà utiliser la carte virtuelle pour vos paiements en ligne."
    }
  ]

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#3A3F58]">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1E2A47] to-[#2A3655]">
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#F7F7F7] leading-tight">
                  La banque née <br /><span className="text-[#6C8C68]">pour l'Afrique</span>
                </h1>
                <p className="text-xl mb-8 text-[#B0B7C3]">Ton argent, ton pouvoir. Simple. Sécurisé. Puissant.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth">
                    <Button
                      size="lg"
                      className="bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7] font-medium px-8 py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-[#6C8C68]/30"
                    >
                      Créer mon compte gratuitement
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
              <div className="md:w-1/2 mt-10 md:mt-0">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-64 h-64 bg-[#3A3F58] opacity-20 rounded-full"></div>
                  <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-[#B0B7C3]/20">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-[#1E2A47] font-bold text-xl">ZAYNO</div>
                      <div className="text-[#6C8C68] font-medium">Premium</div>
                    </div>
                    <div className="h-40 bg-gradient-to-r from-[#1E2A47] to-[#3A3F58] rounded-lg mb-6 flex items-center justify-center">
                      <SmartphoneCharging className="h-16 w-16 text-[#F7F7F7]" />
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

      {/* Features Section */}
      <section className="py-20 bg-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3A3F58]">Une expérience bancaire révolutionnaire</h2>
            <p className="text-lg text-[#B0B7C3] max-w-3xl mx-auto">
              Conçue pour les ambitieux, par des Africains
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border border-[#B0B7C3]/30 bg-white hover:border-[#6C8C68]/50 transition-all duration-300 hover:shadow-lg group"
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-lg bg-[#6C8C68]/10 flex items-center justify-center mb-6 text-[#6C8C68] group-hover:bg-[#6C8C68] group-hover:text-white transition-all`}>
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#3A3F58]">{benefit.title}</h3>
                  <p className="text-[#3A3F58]/80 leading-relaxed">{benefit.description}</p>
                  <div className="mt-4 flex items-center text-[#6C8C68] font-medium">
                    <span className="text-sm">En savoir plus</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[#1E2A47] text-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-lg text-[#B0B7C3] max-w-3xl mx-auto">
              Commencez en moins de 5 minutes, sans paperasse
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#6C8C68] flex items-center justify-center text-white font-bold z-10">
                  {step.step}
                </div>
                <div className="bg-[#3A3F58]/30 p-8 pt-12 rounded-lg backdrop-blur-sm h-full border border-[#B0B7C3]/10">
                  <div className="w-12 h-12 rounded-lg bg-[#6C8C68]/10 flex items-center justify-center mb-6 text-[#6C8C68]">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-[#B0B7C3] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3A3F58]">Des offres adaptées à vos besoins</h2>
            <p className="text-lg text-[#B0B7C3] max-w-3xl mx-auto">
              Choisissez la formule qui correspond à votre usage
            </p>
            
            <div className="flex justify-center mt-6">
              <div className="inline-flex bg-[#F7F7F7] rounded-full p-1">
                <button 
                  onClick={() => setActivePlan('monthly')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activePlan === 'monthly' ? 'bg-[#6C8C68] text-white' : 'text-[#3A3F58]'}`}
                >
                  Facturation mensuelle
                </button>
                <button 
                  onClick={() => setActivePlan('yearly')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activePlan === 'yearly' ? 'bg-[#6C8C68] text-white' : 'text-[#3A3F58]'}`}
                >
                  Facturation annuelle (-15%)
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative rounded-xl overflow-hidden border transition-all hover:shadow-lg ${plan.popular ? 'border-[#6C8C68]' : 'border-[#B0B7C3]/30'}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#6C8C68] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAIRE
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-[#3A3F58]">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-[#3A3F58]">{plan.price}</span>
                    <span className="text-[#B0B7C3]">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-[#6C8C68] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-[#3A3F58]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`w-full ${plan.popular ? 'bg-[#6C8C68] hover:bg-[#5A7A56] text-white' : 'bg-white text-[#3A3F58] border border-[#B0B7C3] hover:bg-[#F7F7F7]'}`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3A3F58]">Ils nous font confiance</h2>
            <p className="text-lg text-[#B0B7C3] max-w-3xl mx-auto">
              Découvrez ce que nos clients disent de leur expérience ZAYNO
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-[#B0B7C3]/20">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-[#6C8C68] fill-[#6C8C68]' : 'text-[#B0B7C3]/30'}`} 
                    />
                  ))}
                </div>
                <p className="italic mb-6 text-[#3A3F58]">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#6C8C68] flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-[#3A3F58]">{testimonial.name}</div>
                    <div className="text-sm text-[#B0B7C3]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className="py-20 bg-gradient-to-br from-[#1E2A47] to-[#2A3655]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F7F7F7]">Téléchargez l'application ZAYNO</h2>
              <p className="text-lg mb-8 text-[#B0B7C3]">
                Disponible sur iOS et Android. Gérez votre argent où que vous soyez en Afrique.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black text-white hover:bg-black/90 h-14">
                  <div className="mr-3">
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                      <path d="M16.893 12.6157C16.9206 10.2408 17.8935 8.3421 19.8118 6.92063C18.7231 5.4186 16.9997 4.52734 15.0424 4.52734C13.1566 4.52734 11.8639 5.4186 10.948 5.4186C9.96801 5.4186 8.50801 4.47266 6.83945 4.47266C4.79401 4.47266 2.63001 5.74547 1.39145 7.79934C-0.32655 10.7233 0.559447 15.5855 2.62345 19.1655C3.59345 20.7455 4.76745 22.4727 6.31201 22.4727C7.79401 22.4727 8.30545 21.5813 10.176 21.5813C12.0466 21.5813 12.5034 22.4727 14.0394 22.4727C15.584 22.4727 16.648 21.0186 17.618 19.4293C18.4306 18.1013 18.784 17.3708 19.4306 15.9608C16.4306 14.6408 16.893 12.6764 16.893 12.6157Z" fill="white"/>
                      <path d="M13.3394 2.47266C14.3394 1.25447 14.3394 0.0185967 14.312 0C12.8394 0.0544702 11.1466 1.0186 10.1466 2.23678C9.14658 3.4186 8.63001 4.69016 8.70345 6.0186C10.2534 6.10934 11.8394 5.14521 13.3394 2.47266Z" fill="white"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Télécharger sur</div>
                    <div className="text-lg font-semibold -mt-1">App Store</div>
                  </div>
                </Button>
                
                <Button className="bg-white text-[#3A3F58] hover:bg-white/90 h-14">
                  <div className="mr-3">
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                      <path d="M13.372 1.74524C13.0347 1.74524 12.6973 1.85491 12.4153 2.07424L1.30933 10.5856C0.690667 11.0696 0.581333 11.9682 1.06533 12.5869L7.632 20.8616C7.85867 21.1436 8.19467 21.3076 8.55867 21.3076H18.632C19.288 21.3076 19.832 20.7636 19.832 20.1076V2.94524C19.832 2.28924 19.288 1.74524 18.632 1.74524H13.372Z" fill="#3DDC84"/>
                      <path d="M1.06533 11.4131C0.581333 12.0318 0.690667 12.9304 1.30933 13.4144L12.4153 21.9258C12.6973 22.1451 13.0347 22.2548 13.372 22.2548H18.632C19.288 22.2548 19.832 21.7108 19.832 21.0548V3.89244C19.832 3.23644 19.288 2.69244 18.632 2.69244H13.372C13.0347 2.69244 12.6973 2.80211 12.4153 3.02144L1.30933 11.5328C1.22733 11.5964 1.14533 11.6784 1.06533 11.7784V11.4131Z" fill="#3DDC84"/>
                      <path d="M7.632 20.8616C7.85867 21.1436 8.19467 21.3076 8.55867 21.3076H13.372C13.0347 21.3076 12.6973 21.1979 12.4153 20.9786L7.632 20.8616Z" fill="#2BB673"/>
                      <path d="M19.832 3.89244V2.94524C19.832 2.28924 19.288 1.74524 18.632 1.74524H13.372C13.0347 1.74524 12.6973 1.85491 12.4153 2.07424L12.5213 2.18024L19.832 3.89244Z" fill="#2BB673"/>
                      <path d="M12.5213 2.18024L1.30933 10.5856C0.690667 11.0696 0.581333 11.9682 1.06533 12.5869L1.17133 12.6929L12.5213 2.18024Z" fill="#2BB673"/>
                      <path d="M1.17133 11.3071L1.06533 11.4131C0.581333 12.0318 0.690667 12.9304 1.30933 13.4144L1.41533 13.5204L1.17133 11.3071Z" fill="#2BB673"/>
                      <path d="M12.5213 21.8198L1.41533 13.5204L7.632 20.8616L12.5213 21.8198Z" fill="#2BB673"/>
                      <path d="M19.832 3.89244V20.1076C19.832 20.7636 19.288 21.3076 18.632 21.3076H13.372C13.0347 21.3076 12.6973 21.1979 12.4153 20.9786L12.5213 21.0846L19.832 3.89244Z" fill="#2BB673"/>
                      <path d="M13.372 22.2548C13.0347 22.2548 12.6973 22.1451 12.4153 21.9258L12.5213 22.0318L13.372 22.2548Z" fill="#2BB673"/>
                      <path d="M12.5213 2.18024L19.832 3.89244L12.5213 2.18024Z" fill="#2BB673"/>
                      <path d="M12.5213 22.0318L7.632 20.8616L12.5213 22.0318Z" fill="#2BB673"/>
                      <path d="M1.17133 11.3071L12.5213 21.8198L1.17133 11.3071Z" fill="#2BB673"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Disponible sur</div>
                    <div className="text-lg font-semibold -mt-1">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-[#3A3F58] opacity-20 rounded-full"></div>
                <div className="relative">
                  <div className="w-64 h-auto">
                    <div className="bg-white p-4 rounded-3xl shadow-2xl border border-[#B0B7C3]/20">
                      <div className="bg-[#F7F7F7] rounded-xl p-4">
                        <div className="flex justify-between items-center mb-6">
                          <div className="text-[#1E2A47] font-bold">ZAYNO</div>
                          <div className="text-[#6C8C68] text-xs font-medium">SOLDE</div>
                        </div>
                        <div className="text-2xl font-bold text-[#3A3F58] mb-6">1 450 000 FCFA</div>
                        <div className="flex justify-between text-[#3A3F58] text-xs">
                          <div>•••• •••• •••• 1234</div>
                          <div>09/25</div>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-4 gap-2">
                        {[Wallet, Send, CreditCard, Clock].map((Icon, i) => (
                          <div key={i} className="p-2 rounded-lg bg-[#F7F7F7] flex items-center justify-center">
                            <Icon className="h-5 w-5 text-[#6C8C68]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#3A3F58]">Nos partenaires stratégiques</h2>
            <p className="text-[#B0B7C3] max-w-3xl mx-auto">
              ZAYNO collabore avec les institutions financières et technologiques les plus innovantes d'Afrique
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center max-w-6xl mx-auto">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center h-12 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                <div className="text-lg font-medium text-[#3A3F58]">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3A3F58]">Questions fréquentes</h2>
            <p className="text-lg text-[#B0B7C3] max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-[#B0B7C3]/30 bg-white">
                <CardContent className="p-6">
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span className="text-[#3A3F58]">{faq.question}</span>
                      <svg className="h-5 w-5 text-[#6C8C68] group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-4 text-[#3A3F58]/80">{faq.answer}</p>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1E2A47] to-[#2A3655]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-[#B0B7C3]/10">
              <Shield className="h-12 w-12 text-[#6C8C68] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F7F7F7]">Prêt à rejoindre la révolution bancaire ZAYNO ?</h2>
              <p className="text-lg text-[#B0B7C3] mb-8 max-w-2xl mx-auto">
                Ouvrez votre compte en 5 minutes et découvrez une nouvelle façon de gérer votre argent en Afrique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7] font-medium px-8 py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-[#6C8C68]/30"
                  >
                    Créer mon compte gratuitement
                    <ChevronRight className="ml-2 h-5 w-5" />
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