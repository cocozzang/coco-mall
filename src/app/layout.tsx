import Navbar from "@/components/layout/Navbar"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "coco mall",
  description: "야무진 상품들을 찾아 구매해보세용",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navbar />
        <div className="max-w-7xl mx-auto px-6">{children}</div>
      </body>
    </html>
  )
}
