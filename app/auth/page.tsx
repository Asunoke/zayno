"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Shield, User, Mail, Phone, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

// Déclaration de type pour étendre l'interface User de NextAuth

export default function AuthPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        alert("Email ou mot de passe incorrect")
      } else {
        const session = await getSession()
        if (session?.user?.isAdmin) {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Erreur lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.error) {
          alert("Compte créé mais erreur de connexion automatique")
        } else {
          router.push("/dashboard")
        }
      } else {
        alert(data.error || "Erreur lors de la création du compte")
      }
    } catch (error) {
      console.error("Signup error:", error)
      alert("Erreur lors de la création du compte")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="min-h-screen bg-[#1E2A47]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Retour */}
          <Link href="/" className="inline-flex items-center text-[#F7F7F7] hover:text-[#6C8C68] transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>

          <Card className="shadow-2xl border border-[#3A3F58] bg-[#1E2A47] text-[#F7F7F7]">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-[#6C8C68] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#F7F7F7]" />
              </div>
              <CardTitle className="text-2xl font-bold">Bienvenue sur ZAYNO</CardTitle>
              <CardDescription className="text-[#B0B7C3]">Votre solution bancaire nouvelle génération</CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#3A3F58]">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-[#6C8C68] data-[state=active]:text-[#F7F7F7]"
                  >
                    Connexion
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-[#6C8C68] data-[state=active]:text-[#F7F7F7]"
                  >
                    Inscription
                  </TabsTrigger>
                </TabsList>

                {/* Formulaire de Connexion */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-[#B0B7C3]" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          className="pl-10 border-[#3A3F58] bg-[#1E2A47] text-[#F7F7F7] focus:border-[#6C8C68]"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="font-medium">
                        Mot de passe
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-[#B0B7C3]" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 border-[#3A3F58] bg-[#1E2A47] text-[#F7F7F7] focus:border-[#6C8C68]"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-[#B0B7C3] hover:text-[#F7F7F7]"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 text-[#B0B7C3]">
                        <input type="checkbox" className="rounded border-[#3A3F58]" />
                        <span>Se souvenir de moi</span>
                      </label>
                      <Link href="#" className="text-[#6C8C68] hover:text-[#5A7A56] transition-colors">
                        Mot de passe oublié ?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7] font-medium py-3"
                    >
                      {loading ? "Connexion..." : "Se connecter"}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-[#3A3F58]" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#1E2A47] px-2 text-[#B0B7C3]">Ou continuer avec</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      className="w-full border-[#3A3F58] hover:bg-[#3A3F58]"
                      disabled={loading}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                  </form>
                </TabsContent>

                {/* Formulaire d'Inscription */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="font-medium">
                          Prénom
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-[#B0B7C3]" />
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Prénom"
                            className="pl-10 border-[#3A3F58] bg-[#1E2A47] text-[#F7F7F7] focus:border-[#6C8C68]"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="font-medium">
                          Nom
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Nom"
                          className="border-[#3A3F58] bg-[#1E2A47] text-[#F7F7F7] focus:border-[#6C8C68]"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupEmail" className="font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-[#B0B7C3]" />
                        <Input
                          id="signupEmail"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          className="pl-10 border-[#3A3F58] bg-[#1E2A47] text-[#F7F7F7] focus:border-[#6C8C68]"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-medium">
                        Téléphone
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-[#B0B7C3]" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+221 XX XXX XX XX"
                          className="pl-10 border-[#3A3F58] bg-[#1E2A47] text-[#F7F7F7] focus:border-[#6C8C68]"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupPassword" className="font-medium">
                        Mot de passe
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-[#B0B7C3]" />
                        <Input
                          id="signupPassword"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 border-[#3A3F58] bg-[#1E2A47] text-[#F7F7F7] focus:border-[#6C8C68]"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-[#B0B7C3] hover:text-[#F7F7F7]"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="font-medium">
                        Confirmer le mot de passe
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-[#B0B7C3]" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 border-[#3A3F58] bg-[#1E2A47] text-[#F7F7F7] focus:border-[#6C8C68]"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-[#B0B7C3] hover:text-[#F7F7F7]"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-sm">
                      <label className="flex items-start space-x-2 text-[#B0B7C3]">
                        <input type="checkbox" className="rounded border-[#3A3F58] mt-1" required />
                        <span>
                          J'accepte les{" "}
                          <Link href="#" className="text-[#6C8C68] hover:text-[#5A7A56] transition-colors">
                            conditions d'utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link href="#" className="text-[#6C8C68] hover:text-[#5A7A56] transition-colors">
                            politique de confidentialité
                          </Link>
                        </span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7] font-medium py-3"
                    >
                      {loading ? "Création..." : "Créer mon compte"}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-[#3A3F58]" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#1E2A47] px-2 text-[#B0B7C3]">Ou continuer avec</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      className="w-full border-[#3A3F58] hover:bg-[#3A3F58]"
                      disabled={loading}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Sécurité */}
              <div className="mt-6 p-4 bg-[#3A3F58]/20 rounded-lg border border-[#6C8C68]/30">
                <div className="flex items-center space-x-2 text-[#6C8C68]">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Sécurité garantie</span>
                </div>
                <p className="text-xs text-[#B0B7C3] mt-1">
                  Vos données sont protégées par un chiffrement de niveau bancaire
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}