import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "./prisma"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function generateBCBId(): Promise<string> {
  let bcbId: string
  let isUnique = false

  while (!isUnique) {
    const randomNum = Math.floor(Math.random() * 999999) + 1
    bcbId = `BCB${randomNum.toString().padStart(6, "0")}`

    const existingUser = await prisma.user.findUnique({
      where: { bcbId },
    })

    if (!existingUser) {
      isUnique = true
      return bcbId
    }
  }

  throw new Error("Unable to generate unique BCB ID")
}

export function generateIBAN(): string {
  const randomNum = Math.floor(Math.random() * 9999999999) + 1000000000
  return `ML34 BCB1 ${randomNum.toString()}`
}

export function generateCardNumber(): string {
  const randomNum = Math.floor(Math.random() * 9999999999999999) + 1000000000000000
  return randomNum
    .toString()
    .replace(/(.{4})/g, "$1 ")
    .trim()
}

export function calculateCreditScore(transactions: number, totalAmount: number): number {
  // Simple credit score calculation
  const baseScore = Math.min(transactions * 10, 500)
  const amountScore = Math.min(totalAmount / 10000, 500)
  return Math.floor(baseScore + amountScore)
}

export function getCreditTier(score: number): string {
  if (score >= 900) return "PLATINE"
  if (score >= 750) return "OR"
  if (score >= 600) return "CUIVRE"
  if (score >= 450) return "FER"
  if (score >= 300) return "BRONZE"
  return "BOIS"
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("XOF", "FCFA")
}

export function generateReference(): string {
  return `BCB${Date.now()}${Math.floor(Math.random() * 1000)}`
}
