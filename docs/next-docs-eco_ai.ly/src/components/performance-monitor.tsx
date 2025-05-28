"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function PerformanceMonitor() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views
    const trackPageView = () => {
      console.log(`Page view: ${pathname}`)
      // In a real app, you would send this to your analytics service
    }

    // Measure Core Web Vitals
    const measureWebVitals = () => {
      // Performance Observer for Core Web Vitals
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          const lastEntry = entries[entries.length - 1] as PerformanceEntry
          console.log('LCP:', lastEntry.startTime)
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // First Input Delay
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          entries.forEach((entry: PerformanceEntry) => {
            console.log('FID:', entry.startTime)
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0
          const entries = entryList.getEntries()
          entries.forEach((entry: PerformanceEntry) => {
            clsValue += entry.startTime
          })
          console.log('CLS:', clsValue)
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      }

      // Page Load Time
      window.addEventListener('load', () => {
        const loadTime = performance.now()
        console.log('Page Load Time:', loadTime)
      })
    }

    trackPageView()
    measureWebVitals()
  }, [pathname])

  return null
}

export function ImagePerformanceOptimizer() {
  useEffect(() => {
    // Lazy load images that don't use Next.js Image component
    const images = document.querySelectorAll('img[data-src]')
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = img.dataset.src || ''
            img.classList.remove('lazy')
            imageObserver.unobserve(img)
          }
        })
      })

      images.forEach((img) => imageObserver.observe(img))
    }

    // Preload critical images
    const preloadImages = [
      '/eco-ai-ly-hero.png',
      '/streamlit-dashboard-1.png',
      '/streamlit-dashboard-2.png'
    ]

    preloadImages.forEach((src) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  return null
}

export function ProgressIndicator() {
  useEffect(() => {
    const progressBar = document.createElement('div')
    progressBar.id = 'reading-progress'
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #10b981, #3b82f6);
      z-index: 9999;
      transition: width 0.1s ease;
    `
    document.body.appendChild(progressBar)

    const updateProgress = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      progressBar.style.width = `${Math.min(scrolled, 100)}%`
    }

    window.addEventListener('scroll', updateProgress)
    
    return () => {
      window.removeEventListener('scroll', updateProgress)
      if (progressBar.parentNode) {
        progressBar.parentNode.removeChild(progressBar)
      }
    }
  }, [])

  return null
}
