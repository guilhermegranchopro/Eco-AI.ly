"use client"

import { useState, useEffect, useRef } from 'react'
import { Search, X, FileText, Zap, Settings, BarChart3, Brain, Github } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchResult {
  title: string
  href: string
  icon: React.ComponentType<any>
  description: string
  section?: string
}

const searchData: SearchResult[] = [
  {
    title: "Overview",
    href: "/",
    icon: FileText,
    description: "Introduction to Eco AI.ly platform and features",
    section: "Getting Started"
  },
  {
    title: "Quick Start",
    href: "/quick-start", 
    icon: Zap,
    description: "Get up and running with Eco AI.ly in minutes",
    section: "Getting Started"
  },
  {
    title: "Installation",
    href: "/installation",
    icon: Settings,
    description: "Complete installation guide for all platforms",
    section: "Setup"
  },
  {
    title: "Features",
    href: "/features",
    icon: BarChart3,
    description: "Explore platform capabilities and dashboard features",
    section: "Platform"
  },
  {
    title: "AI Models",
    href: "/ai-models",
    icon: Brain,
    description: "Neural networks, LSTM models, and ML architecture",
    section: "Technical"
  },
  {
    title: "API Reference",
    href: "/api-reference",
    icon: FileText,
    description: "FastAPI endpoints, authentication, and examples",
    section: "Development"
  },
  {
    title: "Contributing",
    href: "/contributing",
    icon: Github,
    description: "How to contribute to the Eco AI.ly project",
    section: "Community"
  }
]

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
      }
      
      // Arrow navigation
      if (isOpen && filteredResults.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % filteredResults.length)
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length)
        }
        if (e.key === 'Enter') {
          e.preventDefault()
          const selected = filteredResults[selectedIndex]
          if (selected) {
            window.location.href = selected.href
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredResults, selectedIndex])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Filter results based on query
  useEffect(() => {
    if (!query.trim()) {
      setFilteredResults(searchData)
    } else {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.section?.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredResults(filtered)
    }
    setSelectedIndex(0)
  }, [query])

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
        aria-label="Search documentation"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search docs...</span>
        <span className="hidden lg:inline text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded border">
          ⌘K
        </span>
      </button>

      {/* Search modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredResults.length > 0 ? (
                  <div className="py-2">
                    {filteredResults.map((result, index) => {
                      const Icon = result.icon
                      return (
                        <Link
                          key={result.href}
                          href={result.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                            index === selectedIndex ? 'bg-gray-50 dark:bg-gray-800' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  {result.title}
                                </h3>
                                {result.section && (
                                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                                    {result.section}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {result.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try a different search term
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <kbd className="px-1.5 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">↑↓</kbd>
                      <span>navigate</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <kbd className="px-1.5 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">↵</kbd>
                      <span>select</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <kbd className="px-1.5 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">esc</kbd>
                      <span>close</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
