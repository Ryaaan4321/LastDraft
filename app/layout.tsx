import "@/app/globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import 'react-datepicker/dist/react-datepicker.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="__variable_5cfdac __variable_9a8899 antialiased">
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  )
}

