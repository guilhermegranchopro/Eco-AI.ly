"use client"

import Link from "next/link"
import { Github, ExternalLink, Mail, Linkedin, Twitter, Leaf, Heart, Code, Database, Brain } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Overview", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Live Demo", href: "https://ecoaily.streamlit.app/", external: true },
    { name: "API Reference", href: "/api" },
  ],
  resources: [
    { name: "Quick Start", href: "/quick-start" },
    { name: "Installation", href: "/installation" },
    { name: "AI & ML Models", href: "/ai-ml" },
    { name: "Contributing", href: "/contributing" },
  ],
  technology: [
    { name: "Python & FastAPI", href: "/api#backend" },
    { name: "Next.js Frontend", href: "/features#nextjs" },
    { name: "Streamlit Dashboard", href: "/features#streamlit" },
    { name: "TensorFlow & LSTM", href: "/ai-ml#models" },
  ],
  connect: [
    { name: "GitHub", href: "https://github.com/guilhermegranchopro/Eco-AI.ly", external: true, icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/guilhermegrancho", external: true, icon: Linkedin },
    { name: "Email", href: "mailto:contact@ecoai.ly", external: true, icon: Mail },
    { name: "Twitter", href: "https://twitter.com/ecoaily", external: true, icon: Twitter },
  ],
}

const technologies = [
  { name: "Python", icon: Code, color: "text-blue-500" },
  { name: "FastAPI", icon: Database, color: "text-green-500" },
  { name: "TensorFlow", icon: Brain, color: "text-orange-500" },
  { name: "Next.js", icon: Code, color: "text-black dark:text-white" },
]

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Eco AI.ly
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              Revolutionizing environmental monitoring through artificial intelligence. 
              Real-time carbon intensity tracking, renewable energy forecasting, and sustainability insights.
            </p>
            <div className="flex items-center space-x-4">
              {footerLinks.connect.map((item) => {
                const Icon = item.icon!
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center"
                  >
                    {item.name}
                    {item.external && <ExternalLink className="w-3 h-3 ml-1" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Technology</h3>
            <ul className="space-y-3">
              {footerLinks.technology.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <span className="text-gray-600 dark:text-gray-300 text-sm">Built with</span>
              <div className="flex items-center space-x-3">
                {technologies.map((tech) => {
                  const Icon = tech.icon
                  return (
                    <div key={tech.name} className="flex items-center space-x-1">
                      <Icon className={`w-4 h-4 ${tech.color}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{tech.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for a sustainable future</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Eco AI.ly. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link 
                href="https://github.com/guilhermegranchopro/Eco-AI.ly/blob/main/LICENSE" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
              >
                MIT License
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
