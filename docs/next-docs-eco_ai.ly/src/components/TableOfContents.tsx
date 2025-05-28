'use client'

import React, { useState, useEffect } from 'react'
import { ChevronRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  text: string
  level: number
  element?: HTMLElement
}

interface TableOfContentsProps {
  className?: string
  maxLevel?: number
  showMobileToggle?: boolean
  sticky?: boolean
}

export default function TableOfContents({
  className = '',
  maxLevel = 3,
  showMobileToggle = true,
  sticky = true,
}: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const generateToc = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const tocItems: TocItem[] = []

      headings.forEach((heading) => {
        const id = heading.id
        const text = heading.textContent || ''
        const level = parseInt(heading.tagName.charAt(1))

        if (id && text && level <= maxLevel) {
          tocItems.push({
            id,
            text,
            level,
            element: heading as HTMLElement,
          })
        }
      })

      setToc(tocItems)
    }

    // Generate TOC after a short delay to ensure all components are rendered
    const timer = setTimeout(generateToc, 100)
    
    // Regenerate on route changes or dynamic content
    const observer = new MutationObserver((mutations) => {
      const hasNewHeadings = mutations.some((mutation) =>
        Array.from(mutation.addedNodes).some((node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as Element).matches('h1, h2, h3, h4, h5, h6')
        )
      )
      if (hasNewHeadings) {
        generateToc()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [maxLevel])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for better UX

      // Find the currently visible heading
      let currentId = ''
      for (let i = toc.length - 1; i >= 0; i--) {
        const item = toc[i]
        if (item.element) {
          const elementTop = item.element.offsetTop
          if (scrollPosition >= elementTop) {
            currentId = item.id
            break
          }
        }
      }

      setActiveId(currentId)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Set initial active heading

    return () => window.removeEventListener('scroll', handleScroll)
  }, [toc])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setIsOpen(false) // Close mobile menu
    }
  }

  const getIndentClass = (level: number): string => {
    const indents = {
      1: 'ml-0',
      2: 'ml-4',
      3: 'ml-8',
      4: 'ml-12',
      5: 'ml-16',
      6: 'ml-20',
    }
    return indents[level as keyof typeof indents] || 'ml-0'
  }

  if (toc.length === 0) {
    return null
  }

  const TocContent = () => (
    <nav className="space-y-1">
      <div className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">
        Table of Contents
      </div>
      {toc.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToHeading(item.id)}
          className={cn(
            'block w-full text-left py-1 px-2 rounded text-sm transition-colors',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            getIndentClass(item.level),
            activeId === item.id
              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium'
              : 'text-gray-600 dark:text-gray-400'
          )}
        >
          <div className="flex items-center">
            <ChevronRight 
              className={cn(
                'w-3 h-3 mr-1 transition-transform',
                activeId === item.id ? 'rotate-90' : ''
              )} 
            />
            <span className="truncate">{item.text}</span>
          </div>
        </button>
      ))}
    </nav>
  )

  return (
    <>
      {/* Mobile Toggle Button */}
      {showMobileToggle && (
        <div className="lg:hidden fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white dark:bg-gray-900 shadow-lg"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      )}

      {/* Mobile Overlay */}
      {isOpen && showMobileToggle && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop TOC */}
      <div className={cn(
        'hidden lg:block',
        sticky ? 'sticky top-6' : '',
        className
      )}>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <TocContent />
        </div>
      </div>

      {/* Mobile TOC */}
      {showMobileToggle && (
        <div className={cn(
          'lg:hidden fixed top-16 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]',
          'bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700',
          'shadow-xl p-4 max-h-[70vh] overflow-y-auto',
          'transition-transform transform',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <TocContent />
        </div>
      )}
    </>
  )
}

// Utility component for pages that want to include TOC in their layout
export function withTableOfContents<P extends object>(
  Component: React.ComponentType<P>,
  tocProps?: Partial<TableOfContentsProps>
) {
  return function WrappedComponent(props: P) {
    return (
      <div className="relative">
        <div className="flex">
          <div className="flex-1 min-w-0">
            <Component {...props} />
          </div>
          <div className="hidden lg:block w-64 ml-8 flex-shrink-0">
            <TableOfContents {...tocProps} />
          </div>
        </div>
        <TableOfContents showMobileToggle={true} className="lg:hidden" {...tocProps} />
      </div>
    )
  }
}
