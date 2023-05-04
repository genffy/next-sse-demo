import { Header } from '@/component/Header'
import '@/app/globals.css'

export const metadata = {
  title: 'SSE Demo',
  description: 'How Dose SSE Work?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
