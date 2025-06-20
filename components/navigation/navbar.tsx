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
import { HamburgerIcon } from "lucide-react";
import Logo from "../assets/logo";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
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
      href: "/contact",
      active: ["/contact"],
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
          <Link href={`/sign-in`}>
            <Button variant="outline">Sign In</Button>
          </Link>
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
            <Link href={`/sign-in`}>
              <Button className="w-full" size={`lg`} variant="outline">
                Sign In
              </Button>
            </Link>
            {/* <Button className="w-full" size={`lg`} variant="default">
              Dashboard
            </Button>
            <Button className="w-full" size={`lg`} variant="destructive">
              Logout
            </Button> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navbar;
