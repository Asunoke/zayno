'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowLeft,
  HelpCircle,
  Shield,
  CreditCard,
  Users,
  ChevronDown,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [chatOpen, setChatOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simuler un envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.")
    setFormData({ name: "", email: "", subject: "", message: "" })
    setLoading(false)
  }

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Support Client",
      description: "Notre équipe est disponible 24/7",
      value: "+223 20 22 24 26",
      available: "24h/24, 7j/7",
      color: "bg-[#6C8C68]"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Pour les demandes détaillées",
      value: "support@zayno.ml",
      available: "Réponse sous 2h",
      color: "bg-[#1E2A47]"
    },
    {
      icon: MapPin,
      title: "Siège Social",
      description: "Rencontrez notre équipe",
      value: "Avenue Modibo Keita, Bamako",
      available: "Lun-Ven: 8h-18h",
      color: "bg-[#3A3F58]"
    },
  ]

  const faqItems = [
    {
      icon: CreditCard,
      question: "Comment créer un compte ZAYNO ?",
      answer: "Téléchargez notre application et suivez le processus d'inscription en 3 étapes simples."
    },
    {
      icon: Shield,
      question: "Mes données sont-elles sécurisées ?",
      answer: "Nous utilisons un chiffrement bancaire de niveau militaire pour protéger toutes vos informations."
    },
    {
      icon: Send,
      question: "Combien de temps prend un transfert ?",
      answer: "Les transferts entre utilisateurs ZAYNO sont instantanés, 24h/24."
    },
    {
      icon: Users,
      question: "Comment contacter le support ?",
      answer: "Utilisez le chat en direct dans l'application, appelez notre centre de contact ou envoyez un email."
    },
  ]

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Retour */}
        <Link href="/" className="inline-flex items-center text-[#6C8C68] hover:text-[#5A7A56] transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>

        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="bg-[#6C8C68]/10 text-[#6C8C68] border-[#6C8C68]/30 mb-4">
            Nous sommes là pour vous
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E2A47] mb-4">
            Contactez notre <span className="text-[#6C8C68]">équipe support</span>
          </h1>
          <p className="text-xl text-[#3A3F58]">
            Notre équipe dédiée est disponible pour répondre à toutes vos questions et préoccupations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className="bg-white border-[#B0B7C3]/30 hover:border-[#6C8C68]/50 transition-all">
                  <CardHeader>
                    <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <method.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-[#1E2A47] text-center">{method.title}</CardTitle>
                    <CardDescription className="text-center">{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-semibold text-[#1E2A47] mb-2">{method.value}</p>
                    <Badge variant="secondary" className="bg-[#6C8C68]/10 text-[#6C8C68] border-[#6C8C68]/30">
                      {method.available}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <Card className="border-[#B0B7C3]/30 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1E2A47] flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-[#6C8C68]" />
                  Formulaire de contact
                </CardTitle>
                <CardDescription className="text-[#3A3F58]">
                  Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#3A3F58]">
                        Nom complet
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Votre nom complet"
                        className="bg-white border-[#B0B7C3]/50 focus:border-[#6C8C68]"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#3A3F58]">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        className="bg-white border-[#B0B7C3]/50 focus:border-[#6C8C68]"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#3A3F58]">
                      Sujet
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Objet de votre message"
                      className="bg-white border-[#B0B7C3]/50 focus:border-[#6C8C68]"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#3A3F58]">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre demande en détail..."
                      rows={6}
                      className="bg-white border-[#B0B7C3]/50 focus:border-[#6C8C68]"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#6C8C68] hover:bg-[#5A7A56]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat Widget */}
            <Card className="bg-[#1E2A47] border-[#3A3F58] text-[#F7F7F7]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-[#6C8C68]" />
                  Chat en Direct
                </CardTitle>
                <CardDescription className="text-[#B0B7C3]">
                  Connectez-vous pour accéder au chat instantané
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="w-full bg-[#6C8C68] hover:bg-[#5A7A56]"
                >
                  {chatOpen ? "Fermer le chat" : "Ouvrir le chat"}
                </Button>
                {chatOpen && (
                  <div className="mt-4 p-4 bg-[#3A3F58]/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[#6C8C68] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">Z</span>
                      </div>
                      <div>
                        <p className="font-medium">Support ZAYNO</p>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs text-[#B0B7C3]">En ligne</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="bg-[#6C8C68]/20 p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">Bonjour ! Comment puis-je vous aider aujourd'hui ?</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Tapez votre message..."
                        className="flex-1 bg-[#3A3F58] border-[#3A3F58] text-[#F7F7F7] placeholder:text-[#B0B7C3]"
                      />
                      <Button size="icon" className="bg-[#6C8C68] hover:bg-[#5A7A56]">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="border-[#B0B7C3]/30 bg-white">
              <CardHeader>
                <CardTitle className="text-[#1E2A47] flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-[#6C8C68]" />
                  Heures d'ouverture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#3A3F58]">Lundi - Vendredi</span>
                  <span className="font-medium text-[#1E2A47]">8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A3F58]">Samedi</span>
                  <span className="font-medium text-[#1E2A47]">9h00 - 15h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A3F58]">Dimanche</span>
                  <span className="font-medium text-red-500">Fermé</span>
                </div>
                <div className="pt-3 border-t border-[#B0B7C3]/30">
                  <div className="flex justify-between items-center">
                    <span className="text-[#3A3F58]">Support téléphonique</span>
                    <Badge className="bg-[#6C8C68]/10 text-[#6C8C68]">24h/24</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Urgence Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-600 mb-4">
                  En cas de problème de sécurité ou de transaction suspecte sur votre compte
                </p>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Appel d'urgence
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E2A47] mb-4">Questions Fréquentes</h2>
            <p className="text-xl text-[#3A3F58]">Trouvez rapidement les réponses à vos questions</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card 
                key={index} 
                className="border-[#B0B7C3]/30 hover:border-[#6C8C68]/50 cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#6C8C68]/10 rounded-lg flex items-center justify-center mr-4">
                        <item.icon className="h-5 w-5 text-[#6C8C68]" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#1E2A47]">{item.question}</h3>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-[#6C8C68] transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </CardHeader>
                {activeFaq === index && (
                  <CardContent className="pt-4 pl-16">
                    <p className="text-[#3A3F58]">{item.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-[#6C8C68] text-[#6C8C68] hover:bg-[#6C8C68]/10">
              <HelpCircle className="h-4 w-4 mr-2" />
              Voir toutes les FAQ
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}