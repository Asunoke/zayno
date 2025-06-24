// components/header.tsx
"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, ChevronRight } from "lucide-react"
import Link from "next/link"

export function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Fonctionnalités", href: "/features" },
    { name: "Tarifs", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-[#1E2A47] text-[#F7F7F7] sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#6C8C68] rounded-lg flex items-center justify-center">
              <span className="text-[#F7F7F7] font-bold text-lg">Z</span>
            </div>
            <div className="font-bold text-xl">ZAYNO</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#F7F7F7] hover:text-[#6C8C68] transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-[#F7F7F7] hover:text-[#6C8C68] hover:bg-[#3A3F58]/50">
                    Tableau de bord
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  className="text-[#F7F7F7] border-[#6C8C68] hover:bg-[#6C8C68] hover:text-[#1E2A47]"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button className="bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7] font-medium">
                  Créer mon compte
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#3A3F58]">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[#F7F7F7] hover:text-[#6C8C68] px-2 py-1 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-[#3A3F58]">
                {session ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost" className="w-full text-[#F7F7F7] hover:text-[#6C8C68] hover:bg-[#3A3F58]/50">
                        Tableau de bord
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => signOut()}
                      className="w-full text-[#F7F7F7] border-[#6C8C68] hover:bg-[#6C8C68] hover:text-[#1E2A47]"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <Link href="/auth">
                    <Button className="w-full bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7] font-medium">
                      Créer mon compte
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}