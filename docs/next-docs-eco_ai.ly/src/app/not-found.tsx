"use client"

import Link from "next/link"
import { ArrowLeft, Leaf, Home, FileText, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center animate-pulse">
            <Leaf className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/" className="flex items-center justify-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
          </Button>

          <div className="flex space-x-2">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/quick-start" className="flex items-center justify-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Quick Start</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="flex-1">
              <Link href="/features" className="flex items-center justify-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Features</span>
              </Link>
            </Button>
          </div>

          <Button asChild variant="ghost" className="w-full">
            <Link href="javascript:history.back()" className="flex items-center justify-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </Link>
          </Button>
        </div>

        {/* Additional Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Popular documentation sections:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/installation"
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Installation
            </Link>
            <Link
              href="/showcase"
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Showcase
            </Link>
            <Link
              href="/ai-models"
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              AI Models
            </Link>
            <Link
              href="/api-reference"
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              API Reference
            </Link>
            <Link
              href="/contributing"
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Contributing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
