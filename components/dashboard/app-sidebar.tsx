"use client";

import * as React from "react";
import { BanknoteIcon, HomeIcon, NotepadTextIcon } from "lucide-react";

import NavMain from "./nav-main";
import NavUser from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LogoSidebar } from "./logo-sidebar";
import { useSession } from "@/hooks/use-auth";

const userNav = [
  {
    title: "Home",
    url: "/dashboard",
    icon: HomeIcon,
    actives: ["/dashboard"],
  },
];

const adminNav = [
  {
    title: "Subscriptions",
    url: "/dashboard/subscriptions",
    icon: BanknoteIcon,
    actives: ["/dashboard/subscriptions"],
  },
  {
    title: "Report",
    url: "/dashboard/subscriptions/report",
    icon: NotepadTextIcon,
    actives: ["/dashboard/subscriptions/report"],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSession(true);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoSidebar />
      </SidebarHeader>
      <SidebarContent>
        <NavMain title="Dashboard" items={userNav} />
        {session && session.user?.role === "ADMIN" && (
          <NavMain title="Admin" items={adminNav} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
