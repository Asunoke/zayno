"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Download, Plus, Banknote, CreditCard, Smartphone, Building, Users, Zap, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface QuickAction {
  id: string
  icon: React.ElementType
  label: string
  description: string
  color: string
  href?: string
  onClick?: () => void
  badge?: string
  disabled?: boolean
}

interface QuickActionsProps {
  onSendMoney?: () => void
  onWithdraw?: () => void
  onTopup?: () => void
  onLoanRequest?: () => void
}

export function QuickActions({ onSendMoney, onWithdraw, onTopup, onLoanRequest }: QuickActionsProps) {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)

  const quickActions: QuickAction[] = [
    {
      id: "send",
      icon: Send,
      label: "Envoyer",
      description: "Transfert instantané",
      color: "bg-blue-500 hover:bg-blue-600",
      onClick: onSendMoney,
      badge: "Gratuit",
    },
    {
      id: "withdraw",
      icon: Download,
      label: "Retirer",
      description: "Chez nos agents",
      color: "bg-green-500 hover:bg-green-600",
      onClick: onWithdraw,
    },
    {
      id: "topup",
      icon: Plus,
      label: "Recharger",
      description: "Ajouter des fonds",
      color: "bg-purple-500 hover:bg-purple-600",
      href: "/deposit",
    },
    {
      id: "loan",
      icon: Banknote,
      label: "Prêt",
      description: "Demande express",
      color: "bg-orange-500 hover:bg-orange-600",
      onClick: onLoanRequest,
      badge: "2.5%",
    },
  ]

  const additionalServices = [
    {
      id: "card",
      icon: CreditCard,
      label: "Commander une carte",
      description: "Carte physique BCB",
      color: "bg-gray-600 hover:bg-gray-700",
      href: "/card-request",
    },
    {
      id: "mobile",
      icon: Smartphone,
      label: "Recharge mobile",
      description: "Orange, Moov, Telecel",
      color: "bg-indigo-500 hover:bg-indigo-600",
      href: "/mobile-recharge",
    },
    {
      id: "bills",
      icon: Building,
      label: "Factures",
      description: "EDM, SOMAGEP, etc.",
      color: "bg-teal-500 hover:bg-teal-600",
      href: "/bills",
    },
    {
      id: "referral",
      icon: Users,
      label: "Parrainer",
      description: "Inviter des amis",
      color: "bg-pink-500 hover:bg-pink-600",
      href: "/referral",
      badge: "5000 FCFA",
    },
  ]

  const ActionButton = ({ action }: { action: QuickAction }) => {
    const content = (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setHoveredAction(action.id)}
        onHoverEnd={() => setHoveredAction(null)}
        className={`relative p-6 rounded-xl ${action.color} text-white transition-all duration-300 cursor-pointer group overflow-hidden ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <action.icon className="h-6 w-6" />
            </div>
            {action.badge && (
              <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                {action.badge}
              </Badge>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg">{action.label}</h3>
            <p className="text-white/80 text-sm">{action.description}</p>
          </div>

          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{
              x: hoveredAction === action.id ? 0 : -10,
              opacity: hoveredAction === action.id ? 1 : 0,
            }}
            className="flex items-center text-sm font-medium"
          >
            <span>Continuer</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </motion.div>
        </div>
      </motion.div>
    )

    if (action.href) {
      return <Link href={action.href}>{content}</Link>
    }

    return (
      <button onClick={action.onClick} disabled={action.disabled} className="w-full text-left">
        {content}
      </button>
    )
  }

  return (
    <div className="space-y-6">
      {/* Actions principales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <ActionButton key={action.id} action={action} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services additionnels */}
      <Card>
        <CardHeader>
          <CardTitle>Services BCB</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalServices.map((service) => (
              <ActionButton key={service.id} action={service} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
