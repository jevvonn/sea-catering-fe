"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import Logo from "../assets/logo";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigationLinks: { title: string; href: string }[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Menu",
      href: "/",
    },
    {
      title: "Plans",
      href: "/",
    },
    {
      title: "Contact Us",
      href: "/",
    },
  ];

  return (
    <>
      <nav className="w-full md:h-[80px] h-[70px] flex items-center justify-between px-4 md:px-10 border-b sticky top-0 bg-white z-20">
        <Logo />

        <Button
          variant={`outline`}
          className="justify-self-start md:hidden"
          size={`icon`}
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <MenuIcon />
        </Button>
        <ul className="items-center gap-6 hidden md:flex">
          {navigationLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.href}
                className="hover:bg-slate-100 transition-all rounded-md px-4 py-2 "
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link href={`/login`}>
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </nav>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent className="p-4 w-full sm:w-[400px]">
          <Logo />

          <ul className="mt-4 space-y-4 w-full">
            {navigationLinks.map((link, idx) => (
              <li key={idx} className="hover:translate-x-4 transition-all">
                <Link
                  href={link.href}
                  className="w-full text-xl transition-all rounded-md"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <SheetFooter className="w-full flex flex-col gap-2 px-0">
            <Link href={`/login`}>
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
