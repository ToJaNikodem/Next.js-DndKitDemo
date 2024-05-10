import NavigationBar from '@/components/navigationBar'
import './globals.css'
import { Rubik } from 'next/font/google'

const font = Rubik({
  subsets: ['latin'],
  weight: '400',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang="en" className={font.className}>
      <body>
        <NavigationBar />
        {children}
      </body>
    </html>
  )
}
