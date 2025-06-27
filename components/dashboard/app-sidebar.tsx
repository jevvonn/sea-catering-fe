"use client";

import * as React from "react";
import { BanknoteIcon, HomeIcon, UsersIcon } from "lucide-react";

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
    title: "All Subscriptions",
    url: "/dashboard/users/subscriptions",
    icon: BanknoteIcon,
    actives: ["/dashboard/users/subscriptions"],
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: UsersIcon,
    actives: ["/dashboard/users"],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession({
    authenticated: true,
  });

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
