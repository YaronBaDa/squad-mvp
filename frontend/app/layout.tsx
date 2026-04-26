export const metadata = {
  title: 'SQUAD — Mission Control for Founders',
  description: 'Your AI team builds while you steer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
