import Link from "next/link"
import {
  Heart,
  Mail,
  Linkedin,
  Globe,
  Shield,
  Award,
  Users,
  Clock,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Heart className="h-10 w-10 text-blue-400" />
                <div className="absolute inset-0 h-10 w-10 bg-blue-400 rounded-full blur-lg opacity-30 animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  DiabetesAI
                </span>
                <div className="text-xs text-blue-300 font-medium">Health Intelligence</div>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed">
              Empowering individuals with AI-driven diabetes risk assessment and personalized health insights for better
              preventive care and healthier lives.
            </p>
            {/* Social/contact links removed as requested */}
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/predict"
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                  Risk Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                  Prediction History
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-slate-300 flex items-center">
                <Shield className="w-4 h-4 text-blue-400 mr-3" />
                AI Risk Assessment
              </li>
              <li className="text-slate-300 flex items-center">
                <Award className="w-4 h-4 text-blue-400 mr-3" />
                Health Recommendations
              </li>
              <li className="text-slate-300 flex items-center">
                <Users className="w-4 h-4 text-blue-400 mr-3" />
                Progress Tracking
              </li>
              <li className="text-slate-300 flex items-center">
                <Clock className="w-4 h-4 text-blue-400 mr-3" />
                24/7 Availability
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <div className="flex space-x-4">
              <a
                href="mailto:darapureddymanikanta8@gmail.com"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/manikanta-darapureddy-6a1125314/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://dmanikanta.site" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Portfolio"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/918143091519" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} DiabetesAI. All rights reserved. | Powered by Advanced AI Technology
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
