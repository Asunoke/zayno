"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  CreditCard,
  Star,
  Search,
  Filter,
  Calendar,
  TrendingUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Transaction {
  id: string
  type: "received" | "sent" | "withdrawal" | "loan_repayment" | "credit_earned" | "deposit"
  amount: number
  description: string
  date: string
  time: string
  status: "completed" | "pending" | "failed"
  creditPoints?: number
  reference?: string
  recipient?: string
  sender?: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
  onLoadMore?: () => void
  loading?: boolean
}

export function TransactionHistory({ transactions, onLoadMore, loading }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)

  useEffect(() => {
    let filtered = transactions

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.reference?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((t) => t.type === selectedType)
    }

    setFilteredTransactions(filtered)
  }, [transactions, searchTerm, selectedType])

  const getTransactionIcon = (type: string) => {
    const iconClass = "h-5 w-5"
    switch (type) {
      case "received":
        return <ArrowDownLeft className={`${iconClass} text-green-600`} />
      case "sent":
        return <ArrowUpRight className={`${iconClass} text-red-600`} />
      case "withdrawal":
        return <Download className={`${iconClass} text-blue-600`} />
      case "loan_repayment":
        return <CreditCard className={`${iconClass} text-purple-600`} />
      case "credit_earned":
        return <Star className={`${iconClass} text-yellow-600`} />
      case "deposit":
        return <TrendingUp className={`${iconClass} text-green-600`} />
      default:
        return <ArrowUpRight className={`${iconClass} text-gray-600`} />
    }
  }

  const getTransactionBg = (type: string) => {
    switch (type) {
      case "received":
      case "deposit":
        return "bg-green-100 dark:bg-green-950"
      case "sent":
        return "bg-red-100 dark:bg-red-950"
      case "withdrawal":
        return "bg-blue-100 dark:bg-blue-950"
      case "loan_repayment":
        return "bg-purple-100 dark:bg-purple-950"
      case "credit_earned":
        return "bg-yellow-100 dark:bg-yellow-950"
      default:
        return "bg-gray-100 dark:bg-gray-950"
    }
  }

  const getAmountColor = (type: string, amount: number) => {
    if (type === "received" || type === "deposit" || type === "credit_earned") {
      return "text-green-600"
    }
    return "text-red-600"
  }

  const formatAmount = (amount: number, type: string) => {
    if (type === "credit_earned") return ""
    const prefix = type === "received" || type === "deposit" ? "+" : "-"
    return `${prefix}${Math.abs(amount).toLocaleString()} FCFA`
  }

  const transactionTypes = [
    { value: "all", label: "Toutes", count: transactions.length },
    { value: "received", label: "Reçues", count: transactions.filter((t) => t.type === "received").length },
    { value: "sent", label: "Envoyées", count: transactions.filter((t) => t.type === "sent").length },
    { value: "deposit", label: "Dépôts", count: transactions.filter((t) => t.type === "deposit").length },
    { value: "withdrawal", label: "Retraits", count: transactions.filter((t) => t.type === "withdrawal").length },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Historique des Transactions
            </CardTitle>
            <CardDescription>{filteredTransactions.length} transaction(s) trouvée(s)</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une transaction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedType} onValueChange={setSelectedType}>
            <TabsList className="grid w-full grid-cols-5">
              {transactionTypes.map((type) => (
                <TabsTrigger key={type.value} value={type.value} className="text-xs">
                  {type.label}
                  {type.count > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {type.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Transactions List */}
        <div className="space-y-2">
          <AnimatePresence>
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${getTransactionBg(transaction.type)}`}
                  >
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span>{transaction.time}</span>
                      {transaction.reference && (
                        <>
                          <span>•</span>
                          <span className="font-mono text-xs">{transaction.reference}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-2">
                    {transaction.type === "credit_earned" ? (
                      <p className="font-semibold text-yellow-600">+{transaction.creditPoints} pts</p>
                    ) : (
                      <p className={`font-semibold ${getAmountColor(transaction.type, transaction.amount)}`}>
                        {formatAmount(transaction.amount, transaction.type)}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={
                      transaction.status === "completed"
                        ? "default"
                        : transaction.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {transaction.status === "completed" && "Terminé"}
                    {transaction.status === "pending" && "En cours"}
                    {transaction.status === "failed" && "Échoué"}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {onLoadMore && (
          <div className="text-center pt-4">
            <Button variant="outline" onClick={onLoadMore} disabled={loading} className="w-full">
              {loading ? "Chargement..." : "Charger plus de transactions"}
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Aucune transaction trouvée</h3>
            <p className="text-muted-foreground text-sm">
              {searchTerm ? "Essayez de modifier vos critères de recherche" : "Vos transactions apparaîtront ici"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
