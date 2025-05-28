"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, X, Leaf, Brain, BarChart3, Zap, Settings, FileText, Github, ExternalLink, Image } from "lucide-react"
import { useState, useEffect } from "react"
import { SearchModal } from "./search-modal"

const navigation = [
  { name: "Overview", href: "/", icon: Leaf },
  { name: "Quick Start", href: "/quick-start", icon: Zap },
  { name: "Installation", href: "/installation", icon: Settings },
  { name: "Features", href: "/features", icon: BarChart3 },
  { name: "Showcase", href: "/showcase", icon: Image },
  { name: "AI Models", href: "/ai-models", icon: Brain },
  { name: "API Reference", href: "/api-reference", icon: FileText },
  { name: "Contributing", href: "/contributing", icon: Github },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Eco AI.ly
              </span>
              <span className="hidden sm:inline-block text-sm text-gray-500 dark:text-gray-400 font-medium">
                Docs
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <SearchModal />

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* GitHub Link */}
            <Link
              href="https://github.com/guilhermegranchopro/Eco-AI.ly"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>

            {/* Live Demo Link */}
            <Link
              href="https://ecoaily.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-green-700 hover:to-blue-700 transition-all"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              {/* Mobile Live Demo */}
              <Link
                href="https://ecoaily.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg text-base font-medium hover:from-green-700 hover:to-blue-700 transition-all mt-4"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
