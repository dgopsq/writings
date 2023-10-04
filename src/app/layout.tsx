import './global.css'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <div className='mx-auto max-w-4xl'>
          <div className='mt-12'>
            <h1 className='font-bold text-3xl uppercase tracking-widest'>
              Diego Pasquali
            </h1>
          </div>

          <div className='mt-6'>{children}</div>
        </div>
      </body>
    </html>
  )
}
