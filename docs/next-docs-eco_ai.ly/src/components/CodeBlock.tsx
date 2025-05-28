'use client'

import React, { useState } from 'react'
import { Check, Copy, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  className?: string
  allowCopy?: boolean
  allowDownload?: boolean
}

export default function CodeBlock({
  children,
  language = 'text',
  filename,
  showLineNumbers = false,
  highlightLines = [],
  className = '',
  allowCopy = true,
  allowDownload = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([children], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename || `code.${getFileExtension(language)}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getFileExtension = (lang: string): string => {
    const extensions: { [key: string]: string } = {
      javascript: 'js',
      typescript: 'ts',
      jsx: 'jsx',
      tsx: 'tsx',
      python: 'py',
      bash: 'sh',
      shell: 'sh',
      json: 'json',
      css: 'css',
      html: 'html',
      markdown: 'md',
      yaml: 'yml',
      xml: 'xml',
      sql: 'sql',
      dockerfile: 'dockerfile',
    }
    return extensions[lang.toLowerCase()] || 'txt'
  }

  const getLanguageLabel = (lang: string): string => {
    const labels: { [key: string]: string } = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      jsx: 'React JSX',
      tsx: 'React TSX',
      python: 'Python',
      bash: 'Bash',
      shell: 'Shell',
      json: 'JSON',
      css: 'CSS',
      html: 'HTML',
      markdown: 'Markdown',
      yaml: 'YAML',
      xml: 'XML',
      sql: 'SQL',
      dockerfile: 'Dockerfile',
    }
    return labels[lang.toLowerCase()] || lang.toUpperCase()
  }

  const lines = children.split('\n')

  return (
    <div className={`relative group ${className}`}>
      {/* Header */}
      {(filename || language !== 'text' || allowCopy || allowDownload) && (
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700">
          <div className="flex items-center space-x-3">
            {filename && (
              <span className="text-sm font-medium text-gray-300">{filename}</span>
            )}
            {language !== 'text' && (
              <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                {getLanguageLabel(language)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {allowDownload && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                title="Download code"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            {allowCopy && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                title={copied ? 'Copied!' : 'Copy code'}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Code Content */}
      <div className="relative">
        <pre className={`
          overflow-x-auto p-4 text-sm 
          ${filename || language !== 'text' ? 'rounded-b-lg' : 'rounded-lg'}
          bg-gray-900 text-gray-100
          border border-gray-700
        `}>
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              <table className="w-full">
                <tbody>
                  {lines.map((line, index) => {
                    const lineNumber = index + 1
                    const isHighlighted = highlightLines.includes(lineNumber)
                    return (
                      <tr
                        key={index}
                        className={isHighlighted ? 'bg-yellow-900/20' : ''}
                      >
                        <td className="select-none pr-4 text-gray-500 text-right border-r border-gray-700 sticky left-0 bg-gray-900">
                          {lineNumber}
                        </td>
                        <td className="pl-4">
                          <div className="whitespace-pre-wrap break-all">
                            {line || '\n'}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="whitespace-pre-wrap break-all">
                {children}
              </div>
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}

// Syntax highlighting for common languages (basic implementation)
export function SyntaxHighlightedCodeBlock({
  children,
  language = 'text',
  ...props
}: CodeBlockProps) {
  const highlightSyntax = (code: string, lang: string): string => {
    // Basic syntax highlighting patterns
    const patterns: { [key: string]: { [key: string]: string } } = {
      javascript: {
        keywords: '\\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await|try|catch|finally)\\b',
        strings: '"([^"\\\\]|\\\\.)*"|\'([^\'\\\\]|\\\\.)*\'|`([^`\\\\]|\\\\.)*`',
        comments: '//.*$|/\\*[\\s\\S]*?\\*/',
        numbers: '\\b\\d+(\\.\\d+)?\\b',
      },
      python: {
        keywords: '\\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|pass|break|continue|and|or|not|in|is|None|True|False)\\b',
        strings: '"([^"\\\\]|\\\\.)*"|\'([^\'\\\\]|\\\\.)*\'|"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'',
        comments: '#.*$',
        numbers: '\\b\\d+(\\.\\d+)?\\b',
      },
      json: {
        strings: '"([^"\\\\]|\\\\.)*"',
        numbers: '\\b\\d+(\\.\\d+)?\\b',
        booleans: '\\b(true|false|null)\\b',
      },
    }

    if (!patterns[lang]) return code

    let highlighted = code
    const langPatterns = patterns[lang]

    // Apply syntax highlighting
    if (langPatterns.keywords) {
      highlighted = highlighted.replace(
        new RegExp(langPatterns.keywords, 'g'),
        '<span class="text-purple-400 font-semibold">$&</span>'
      )
    }

    if (langPatterns.strings) {
      highlighted = highlighted.replace(
        new RegExp(langPatterns.strings, 'g'),
        '<span class="text-green-400">$&</span>'
      )
    }

    if (langPatterns.comments) {
      highlighted = highlighted.replace(
        new RegExp(langPatterns.comments, 'gm'),
        '<span class="text-gray-500 italic">$&</span>'
      )
    }

    if (langPatterns.numbers) {
      highlighted = highlighted.replace(
        new RegExp(langPatterns.numbers, 'g'),
        '<span class="text-blue-400">$&</span>'
      )
    }

    if (langPatterns.booleans) {
      highlighted = highlighted.replace(
        new RegExp(langPatterns.booleans, 'g'),
        '<span class="text-orange-400">$&</span>'
      )
    }

    return highlighted
  }

  const highlightedCode = highlightSyntax(children, language)

  return (
    <CodeBlock {...props} language={language}>
      {children}
    </CodeBlock>
  )
}
