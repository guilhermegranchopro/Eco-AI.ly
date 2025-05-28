import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TableOfContents, MobileTableOfContents } from "@/components/table-of-contents";
import { PerformanceMonitor, ImagePerformanceOptimizer, ProgressIndicator } from "@/components/performance-monitor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Eco AI.ly Documentation - Environmental Monitoring Through AI",
    template: "%s | Eco AI.ly Documentation"
  },
  description: "Official documentation for Eco AI.ly - A cutting-edge environmental technology platform that revolutionizes sustainability monitoring through artificial intelligence.",
  keywords: ["eco ai.ly", "environmental monitoring", "artificial intelligence", "sustainability", "carbon intensity", "renewable energy", "portugal energy", "lstm", "machine learning", "fastapi", "streamlit", "nextjs", "environmental ai", "carbon footprint", "green energy"],
  authors: [{ name: "Guilherme Grancho", url: "https://github.com/guilhermegranchopro" }],
  creator: "Guilherme Grancho",
  publisher: "Eco AI.ly",
  applicationName: "Eco AI.ly Documentation",
  generator: "Next.js",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ecoaily.streamlit.app/",
    title: "Eco AI.ly Documentation",
    description: "Environmental monitoring through artificial intelligence - Real-time carbon intensity tracking, renewable energy forecasting, and AI-powered sustainability insights.",
    siteName: "Eco AI.ly",
    images: [
      {
        url: "/eco-ai-ly-og-image.png",
        width: 1200,
        height: 630,
        alt: "Eco AI.ly - Environmental Monitoring Through AI"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Eco AI.ly Documentation",
    description: "Environmental monitoring through artificial intelligence - Real-time carbon intensity tracking, renewable energy forecasting, and AI-powered sustainability insights.",
    images: ["/eco-ai-ly-twitter-image.png"],
    creator: "@guilhermegrancho"
  },
  alternates: {
    canonical: "https://ecoaily.streamlit.app/",
  },
  category: "technology"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PerformanceMonitor />
          <ImagePerformanceOptimizer />
          <ProgressIndicator />
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <TableOfContents />
            <MobileTableOfContents />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
