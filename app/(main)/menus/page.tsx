import MenuCard from "@/components/menus/menu-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MENU_ITEMS } from "@/lib/menu-data";
import { FilterIcon, SearchIcon } from "lucide-react";
import React from "react";

const MenusPage = () => {
  return (
    <main className="pt-5 md:pt-10 px-4 md:px-10 relative min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pb-2">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Discover Our Menu
          </h2>
        </div>
      </div>

      <div className="mt-4 md:mt-8 flex items-center justify-center">
        <div className="max-w-2xl w-full flex items-center gap-2">
          <form action="" className="flex-1">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <div className="relative">
              <Input placeholder="Search for menu..." className="p-4 pl-8" />
              <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </div>
          </form>
          <div>
            <Button variant={`outline`}>
              <FilterIcon />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6 md:py-8">
        {MENU_ITEMS.map((item, idx) => (
          <MenuCard menu={item} key={idx} />
        ))}
      </div>
    </main>
  );
};

export default MenusPage;
