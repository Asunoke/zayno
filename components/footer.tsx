// components/footer.tsx
import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
export function Footer() {
  return (
    <footer className="bg-[#1E2A47] text-[#F7F7F7]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#6C8C68] rounded-lg flex items-center justify-center">
                <span className="text-[#F7F7F7] font-bold text-lg">Z</span>
              </div>
              <div className="font-bold text-xl">ZAYNO</div>
            </div>
            <p className="text-[#B0B7C3] mb-6 max-w-md">
              La solution financière mobile qui révolutionne votre rapport à l'argent en Afrique et au-delà.
            </p>
            <Link href="/auth">
              <Button className="bg-[#6C8C68] hover:bg-[#5A7A56] text-[#F7F7F7] font-medium">
                Ouvrir un compte
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#6C8C68]">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-[#B0B7C3] hover:text-[#F7F7F7] transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-[#6C8C68]" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-[#B0B7C3] hover:text-[#F7F7F7] transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-[#6C8C68]" />
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#B0B7C3] hover:text-[#F7F7F7] transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-[#6C8C68]" />
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#B0B7C3] hover:text-[#F7F7F7] transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-[#6C8C68]" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#6C8C68]">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#6C8C68]" />
                <span className="text-[#B0B7C3]">+223 33 123 45 67</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#6C8C68]" />
                <span className="text-[#B0B7C3]">contact@zayno.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[#6C8C68] mt-1" />
                <span className="text-[#B0B7C3]">
                  Immeuble asuno
                  <br />
                  Bamako, Mali
                </span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Facebook className="h-5 w-5 text-[#B0B7C3] hover:text-[#6C8C68] cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-[#B0B7C3] hover:text-[#6C8C68] cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-[#B0B7C3] hover:text-[#6C8C68] cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-[#3A3F58] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#B0B7C3] text-sm">
            © {new Date().getFullYear()} ZAYNO. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-[#B0B7C3] hover:text-[#F7F7F7] text-sm transition-colors">
              CGU
            </Link>
            <Link href="#" className="text-[#B0B7C3] hover:text-[#F7F7F7] text-sm transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="text-[#B0B7C3] hover:text-[#F7F7F7] text-sm transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}