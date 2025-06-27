"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import {
  EllipsisVerticalIcon,
  HamburgerIcon,
  HomeIcon,
  LogOutIcon,
} from "lucide-react";
import Logo from "../assets/logo";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  const navigationLinks: { title: string; href: string; active: string[] }[] = [
    {
      title: "Home",
      href: "/",
      active: ["/"],
    },
    {
      title: "Menu",
      href: "/menus",
      active: ["/menus"],
    },
    {
      title: "Plans",
      href: "/plans",
      active: ["/plans", "/subscribe"],
    },
    {
      title: "Contact Us",
      href: "/contact-us",
      active: ["/contact-us"],
    },
  ];

  return (
    <>
      <nav className="w-full md:h-[80px] h-[70px] flex items-center justify-between px-4 md:px-10 border-b sticky top-0 bg-white z-50">
        <Logo />

        <Button
          variant={`outline`}
          className="justify-self-start md:hidden"
          size={`icon`}
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <HamburgerIcon />
        </Button>
        <ul className="items-center gap-6 hidden md:flex flex-1 justify-center">
          {navigationLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.href}
                className={cn(
                  `hover:bg-slate-100 transition-all hover:text-foreground rounded-sm p-4 py-2`,
                  {
                    "bg-primary text-primary-foreground":
                      link.active.includes(pathname),
                  }
                )}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          {!session ? (
            <Link href={`/sign-in`}>
              <Button variant="outline">Sign In</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-4 p-2 px-3 border rounded-md cursor-pointer hover:bg-slate-100 transition-all">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-sm">
                    {session.user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {session.user?.name.split(" ")[0] || "Account"}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {session.user?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {session.user?.name}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {session.user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="py-2 cursor-pointer">
                  <Link href={`/dashboard`}>
                    <HomeIcon />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-2 cursor-pointer"
                  onClick={session.logout}
                >
                  <LogOutIcon className="text-red-500" />
                  <span className="text-red-500">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTitle className="sr-only">Navigation Sidebar</SheetTitle>
        <SheetContent className="p-4 w-full sm:w-[400px]">
          <Logo />

          <ul className="mt-4 space-y-4 w-full">
            {navigationLinks.map((link, idx) => (
              <li
                key={idx}
                className={cn(
                  `md:hover:translate-x-4 transition-all w-full text-base border text-center py-2 rounded-md`,
                  {
                    "bg-primary text-primary-foreground":
                      link.active.includes(pathname),
                  }
                )}
                onClick={() => {
                  router.push(link.href);
                  setSidebarOpen(false);
                }}
              >
                {link.title}
              </li>
            ))}
          </ul>

          <SheetFooter className="w-full flex flex-col gap-2 px-0">
            {!session ? (
              <Link href={`/sign-in`}>
                <Button className="w-full" size={`lg`} variant="outline">
                  Sign In
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    variant={`outline`}
                    className="p-8 hover:bg-secondary/80 hover:text-secondary-foreground flex"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {session.user?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {session.user?.name}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {session.user?.email}
                      </span>
                    </div>
                    <EllipsisVerticalIcon className="ml-auto size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side="top"
                  align="center"
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">
                          {session.user?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {session.user?.name}
                        </span>
                        <span className="text-muted-foreground truncate text-xs">
                          {session.user?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="py-2 cursor-pointer">
                    <Link href={`/dashboard`}>
                      <HomeIcon />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="py-2 cursor-pointer"
                    onClick={session.logout}
                  >
                    <LogOutIcon className="text-red-500" />
                    <span className="text-red-500">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navbar;
