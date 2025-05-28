"use client"

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ 
  children, 
  language = 'text', 
  filename, 
  showLineNumbers = false 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      {filename && (
        <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
          <span className="font-mono">{filename}</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 uppercase">{language}</span>
          </div>
        </div>
      )}
      
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-colors opacity-0 group-hover:opacity-100 z-10"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>

        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            borderRadius: filename ? '0 0 8px 8px' : '8px',
            fontSize: '14px',
            padding: '16px',
            background: '#1a1a1a',
          }}
          lineNumberStyle={{
            color: '#6b7280',
            fontSize: '12px',
            paddingRight: '16px',
          }}
        >
          {children.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
