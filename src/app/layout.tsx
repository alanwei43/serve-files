import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import "./bootstrap.scss";
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Files Service",
  description: "File managment system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href={"/styles/bootstrap-icons.css"} rel='stylesheet' />
        <link href={"/styles/font-awesome.css"} rel='stylesheet' />
      </head>
      <body style={{ marginTop: "1em" }}>{children}</body>
    </html>
  )
}
