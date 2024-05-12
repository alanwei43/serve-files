import './globals.css'
import "./bootstrap.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="tw-w-full tw-h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <link href={"/styles/bootstrap-icons.css"} rel='stylesheet' />
        <link href={"/styles/font-awesome.css"} rel='stylesheet' />
      </head>
      <body className="tw-w-full tw-h-full">{children}</body>
    </html>
  )
}
