import type { Metadata } from 'next'
import './globals.css'
import { CosmicBadge } from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'Quotes Collection Dashboard',
  description: 'Manage your quotes collection with authors and categories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className="bg-gray-50 min-h-screen">
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}