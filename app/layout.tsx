import "@/app/globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import 'react-datepicker/dist/react-datepicker.css'
import { ThemeProvider } from "@/components/ThemeProvider"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="__variable_5cfdac __variable_9a8899 antialiased">
        <Header />
        <ThemeProvider>{children}</ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}

