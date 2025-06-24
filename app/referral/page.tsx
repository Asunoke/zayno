"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Gift, Copy, Share2, Trophy, Star } from "lucide-react"
import Link from "next/link"

export default function ReferralPage() {
  const { data: session } = useSession()
  const [copied, setCopied] = useState(false)

  const referralCode = session?.user?.bcbId || "BCB123456"
  const referralLink = `https://bcb.ml/signup?ref=${referralCode}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: "Rejoignez BCB avec mon code de parrainage",
        text: `Utilisez mon code ${referralCode} pour obtenir 5000 FCFA de bonus !`,
        url: referralLink,
      })
    }
  }

  if (!session) {
    return <div>Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au tableau de bord
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Programme de Parrainage BCB</h1>
            <p className="text-muted-foreground">Invitez vos amis et gagnez ensemble des récompenses</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Referral Info */}
            <div className="space-y-6">
              {/* How it works */}
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Gift className="h-6 w-6 mr-2" />
                    Comment ça marche
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Partagez votre code</h3>
                      <p className="text-white/80 text-sm">Envoyez votre code de parrainage à vos amis</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Ils s'inscrivent</h3>
                      <p className="text-white/80 text-sm">Vos amis créent un compte avec votre code</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Vous gagnez tous</h3>
                      <p className="text-white/80 text-sm">Recevez 5000 FCFA chacun après leur première transaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rewards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                    Vos récompenses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">5,000</p>
                      <p className="text-sm text-green-700">FCFA par parrainage</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">3</p>
                      <p className="text-sm text-blue-700">Amis parrainés</p>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-3xl font-bold text-yellow-600">15,000</p>
                    <p className="text-sm text-yellow-700">FCFA gagnés au total</p>
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    Top Parrains du mois
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Amadou K.", referrals: 12, reward: "60,000 FCFA" },
                      { name: "Fatoumata S.", referrals: 8, reward: "40,000 FCFA" },
                      { name: "Ibrahim D.", referrals: 6, reward: "30,000 FCFA" },
                    ].map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                            } text-white font-bold`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.referrals} parrainages</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{user.reward}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Actions */}
            <div className="space-y-6">
              {/* Share Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Votre code de parrainage
                  </CardTitle>
                  <CardDescription>Partagez ce code avec vos amis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Votre code</p>
                    <p className="text-3xl font-bold font-mono text-primary">{referralCode}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input value={referralLink} readOnly className="flex-1" />
                      <Button variant="outline" onClick={() => copyToClipboard(referralLink)} className="flex-shrink-0">
                        <Copy className="h-4 w-4 mr-2" />
                        {copied ? "Copié !" : "Copier"}
                      </Button>
                    </div>

                    <Button onClick={shareReferral} className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager le lien
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Referral History */}
              <Card>
                <CardHeader>
                  <CardTitle>Vos parrainages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Moussa T.", date: "15 Nov 2024", status: "Confirmé", reward: "5,000 FCFA" },
                      { name: "Aïcha B.", date: "10 Nov 2024", status: "Confirmé", reward: "5,000 FCFA" },
                      { name: "Sekou K.", date: "5 Nov 2024", status: "Confirmé", reward: "5,000 FCFA" },
                      { name: "Mariam D.", date: "2 Nov 2024", status: "En attente", reward: "Pending" },
                    ].map((referral, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{referral.name}</p>
                          <p className="text-sm text-muted-foreground">{referral.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={referral.status === "Confirmé" ? "default" : "secondary"}
                            className={referral.status === "Confirmé" ? "bg-green-100 text-green-700" : ""}
                          >
                            {referral.status}
                          </Badge>
                          {referral.status === "Confirmé" && (
                            <p className="text-sm font-medium text-green-600 mt-1">{referral.reward}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Terms */}
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900 dark:text-blue-100">Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <li>• Le bonus est versé après la première transaction du filleul</li>
                    <li>• Minimum 1,000 FCFA pour la première transaction</li>
                    <li>• Pas de limite sur le nombre de parrainages</li>
                    <li>• Les récompenses sont créditées sous 24h</li>
                    <li>• Programme valable pour tous les utilisateurs BCB</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
