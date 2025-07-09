"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const isAuthPage =
    pathname === "/admin/signin" || pathname === "/admin/signup"

  // If it's an auth page, render minimal layout
  if (isAuthPage) {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  // Otherwise render the admin shell with sidebar/header
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="flex-1 overflow-auto bg-muted/50 p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
