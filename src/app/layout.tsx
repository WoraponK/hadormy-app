'use client'

import { Prompt } from 'next/font/google'
import '@/styles/globals.css'

import { cn } from '@/lib/utils'
import NextTopLoader from 'nextjs-toploader'
import { Toast, ToastProvider } from '@/components/ui/toast'

const font = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

import { Navbar, Footer } from '@/components/shared'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-main', font.className)} suppressHydrationWarning={true}>
        <ToastProvider>
          <NextTopLoader color="#00bbf9" showSpinner={false} />
          <Navbar />
          <main className="py-16">{children}</main>
          <Footer />
          <Toast />
        </ToastProvider>
      </body>
    </html>
  )
}
