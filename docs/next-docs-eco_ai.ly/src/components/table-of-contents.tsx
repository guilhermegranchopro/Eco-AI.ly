"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { List, ChevronRight } from 'lucide-react'

interface TOCItem {
  id: string
  title: string
  level: number
}

export function TableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Generate table of contents from headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const tocItems: TOCItem[] = []

    headings.forEach((heading) => {
      if (heading.id) {
        tocItems.push({
          id: heading.id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        })
      }
    })

    setToc(tocItems)

    // Set up intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    )

    headings.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      headings.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  if (toc.length === 0) return null

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl p-4 max-w-64 shadow-lg">
        <div className="flex items-center space-x-2 mb-3">
          <List className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            On this page
          </h3>
        </div>
        
        <nav className="space-y-1 max-h-80 overflow-y-auto">
          {toc.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`block w-full text-left px-2 py-1 text-sm rounded-md transition-colors ${
                activeId === item.id
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-l-2 border-green-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

// Mobile TOC toggle
export function MobileTableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Generate table of contents from headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const tocItems: TOCItem[] = []

    headings.forEach((heading) => {
      if (heading.id) {
        tocItems.push({
          id: heading.id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        })
      }
    })

    setToc(tocItems)

    // Set up intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    )

    headings.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      headings.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  if (toc.length === 0) return null

  return (
    <div className="xl:hidden fixed bottom-4 right-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-colors"
        aria-label="Table of contents"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="absolute bottom-16 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 w-72 shadow-xl max-h-80 overflow-y-auto"
        >
          <div className="flex items-center space-x-2 mb-3">
            <List className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              On this page
            </h3>
          </div>
          
          <nav className="space-y-1">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left px-2 py-1 text-sm rounded-md transition-colors ${
                  activeId === item.id
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-l-2 border-green-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </div>
  )
}
