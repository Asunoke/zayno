"use client"

import type React from "react"

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique d'envoi du formulaire
    alert("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Téléphone",
      description: "Appelez-nous directement",
      value: "+223 20 22 24 26",
      available: "24h/24, 7j/7",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Écrivez-nous",
      value: "support@bcb.ml",
      available: "Réponse sous 2h",
    },
    {
      icon: MapPin,
      title: "Adresse",
      description: "Visitez notre siège",
      value: "Avenue Modibo Keita, Bamako",
      available: "Lun-Ven: 8h-18h",
    },
  ]

  const faqItems = [
    {
      icon: CreditCard,
      question: "Comment créer un compte BCB ?",
      answer:
        "Cliquez sur 'Créer un compte', remplissez vos informations personnelles et vérifiez votre numéro de téléphone. C'est tout !",
    },
    {
      icon: Shield,
      question: "Mes données sont-elles sécurisées ?",
      answer:
        "Absolument ! Nous utilisons un chiffrement de niveau bancaire et respectons toutes les normes de sécurité internationales.",
    },
    {
      icon: Send,
      question: "Combien de temps prend un transfert ?",
      answer: "Les transferts BCB sont instantanés ! Votre argent arrive en quelques secondes chez le destinataire.",
    },
    {
      icon: Users,
      question: "Comment contacter le support ?",
      answer: "Utilisez le chat en direct, appelez-nous au +223 20 22 24 26 ou envoyez un email à support@bcb.ml",
    },
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
          <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">Contactez-Nous</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe est là pour vous aider. Contactez-nous par le moyen qui vous convient le mieux.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#003366] to-[#004080] rounded-full flex items-center justify-center mx-auto mb-4">
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-[#003366]">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-[#003366] mb-2">{method.value}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {method.available}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#003366] flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Envoyez-nous un message
                </CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#003366] font-medium">
                        Nom complet
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Votre nom complet"
                        className="border-gray-300 focus:border-[#003366] focus:ring-[#003366]"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#003366] font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        className="border-gray-300 focus:border-[#003366] focus:ring-[#003366]"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#003366] font-medium">
                      Sujet
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Objet de votre message"
                      className="border-gray-300 focus:border-[#003366] focus:ring-[#003366]"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#003366] font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre demande en détail..."
                      rows={6}
                      className="border-gray-300 focus:border-[#003366] focus:ring-[#003366]"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-[#003366] font-semibold py-3 transition-all duration-300 hover:scale-105"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat Widget */}
            <Card className="bg-gradient-to-br from-[#003366] to-[#004080] text-white border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat en Direct
                </CardTitle>
                <CardDescription className="text-blue-200">Obtenez une réponse immédiate</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-[#003366] font-semibold"
                >
                  {chatOpen ? "Fermer le chat" : "Démarrer une conversation"}
                </Button>
                {chatOpen && (
                  <div className="mt-4 p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-[#DAA520] rounded-full flex items-center justify-center">
                        <span className="text-[#003366] text-sm font-bold">A</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Assistant BCB</p>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs text-blue-200">En ligne</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blue-100 mb-3">Bonjour ! Comment puis-je vous aider aujourd'hui ?</p>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Tapez votre message..."
                        className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-blue-200"
                      />
                      <Button size="sm" className="bg-[#DAA520] hover:bg-[#B8860B] text-[#003366]">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#003366] flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Heures d'ouverture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lundi - Vendredi</span>
                  <span className="font-semibold text-[#003366]">8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Samedi</span>
                  <span className="font-semibold text-[#003366]">9h00 - 15h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimanche</span>
                  <span className="font-semibold text-red-600">Fermé</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Support téléphonique</span>
                    <Badge className="bg-green-100 text-green-700">24h/24</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Urgence Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-600 mb-3">En cas de problème de sécurité ou de transaction suspecte</p>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Appel d'urgence
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">Questions Fréquentes</h2>
            <p className="text-xl text-gray-600">Trouvez rapidement les réponses à vos questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {faqItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-[#003366] flex items-center text-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#003366] to-[#004080] rounded-lg flex items-center justify-center mr-3">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
            <Button variant="outline" className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white">
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
