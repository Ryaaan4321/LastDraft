"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconDownload,
  IconAi,
  IconMoneybag
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useCurrentAdmin } from "@/hooks/use-admin"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Users",
      url: "/admin/users",
      icon: IconUsers,
    },
    {
      title: "AiFeatures",
      url: "/admin/aiusers",
      icon: IconAi,
    },
    {
      title: "DownloadFeatures",
      url: "/admin/downloadusers",
      icon: IconDownload,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  payment: [
    {
      name: "Paid Users",
      url: "/admin/paidusers",
      icon: IconMoneybag,
    },

    {
      name: "Payment Status",
      url: "/admin/paymentstatus",
      icon: IconReport,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { admin, loading, error } = useCurrentAdmin();
  if (loading) {
    return (
      <span>admin loading...</span>
    )
  }
  if(!admin){
    return (
      <span>loading</span>
    )
  }
  const data1 = {
    user: {
      name: admin?.fullname,
      email: admin?.email,
      avatar: "/avatars/shadcn.jpg",
    },
  }
    return(
    <Sidebar collapsible = "offcanvas" { ...props }>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/admin">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">LastDraft.</span>

              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.payment} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data1.user} />
      </SidebarFooter>
    </Sidebar >
  )
}
