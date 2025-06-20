"use client";

import MenuCard from "@/components/menus/menu-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MENU_ITEMS } from "@/lib/menu-data";
import {
  CheckIcon,
  CloudSunIcon,
  CrossIcon,
  CrownIcon,
  FilterIcon,
  LeafIcon,
  MoonStarIcon,
  SearchIcon,
  SunMediumIcon,
  ZapIcon,
} from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const MenusPage = () => {
  const [menus, setMenus] = useState(MENU_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [filter, setFilter] = useState<{
    mealPlans: ("Diet" | "Protein" | "Royal")[];
    mealTypes: ("Breakfast" | "Lunch" | "Dinner")[];
    allergens: ("Free" | "Restricted")[];
  }>({
    mealPlans: [],
    mealTypes: [],
    allergens: [],
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredMenus = MENU_ITEMS.filter((menu) =>
      menu.name.toLowerCase().includes(query)
    );

    setMenus(filteredMenus);
  };

  const applyFilters = () => {
    const filteredMenus = MENU_ITEMS.filter((menu) => {
      const matchesMealPlan =
        filter.mealPlans.length === 0 ||
        filter.mealPlans.some((plan) => menu.plans.includes(plan));

      const matchesMealType =
        filter.mealTypes.length === 0 ||
        filter.mealTypes.some((type) => menu.mealTypes.includes(type));

      const matchesAllergen =
        filter.allergens.length === 0 ||
        filter.allergens.some(
          (allergen) =>
            (allergen === "Free" && menu.allergenFree) ||
            (allergen === "Restricted" && !menu.allergenFree)
        );

      return matchesMealPlan && matchesMealType && matchesAllergen;
    });

    setMenus(filteredMenus);
    setOpenFilterDialog(false);
  };

  const resetFilters = () => {
    setFilter({
      mealPlans: [],
      mealTypes: [],
      allergens: [],
    });
    setMenus(MENU_ITEMS);
    setSearchQuery("");
    setOpenFilterDialog(false);
  };

  return (
    <>
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
                <Input
                  placeholder="Search for menu..."
                  className="p-4 pl-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
              </div>
            </form>
            <div>
              <Button
                variant={`outline`}
                onClick={() => setOpenFilterDialog(true)}
              >
                <FilterIcon />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6 md:py-8">
          {menus.map((item, idx) => (
            <MenuCard menu={item} key={idx} />
          ))}
        </div>
      </main>

      <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
        <DialogContent className="overflow-y-auto max-h">
          <DialogHeader>
            <DialogTitle>Filter Menu</DialogTitle>
          </DialogHeader>

          <hr />

          <div className="space-y-2">
            <Label>
              <span className="text-lg font-semibold">Meal Plans</span>
            </Label>
            <div className="flex gap-2 flex-wrap">
              <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50">
                <Checkbox
                  checked={filter.mealPlans.includes("Diet")}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => ({
                      ...prev,
                      mealPlans: checked
                        ? [...prev.mealPlans, "Diet"]
                        : prev.mealPlans.filter((plan) => plan !== "Diet"),
                    }));
                  }}
                  className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                />
                <div className="flex items-center gap-1.5 font-normal">
                  <LeafIcon className="size-4" />
                  <p className="text-sm leading-none font-medium">Diet Plan</p>
                </div>
              </Label>
              <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-orange-600 has-[[aria-checked=true]]:bg-orange-50">
                <Checkbox
                  checked={filter.mealPlans.includes("Protein")}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => ({
                      ...prev,
                      mealPlans: checked
                        ? [...prev.mealPlans, "Protein"]
                        : prev.mealPlans.filter((plan) => plan !== "Protein"),
                    }));
                  }}
                  className="data-[state=checked]:border-orange-600 data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
                <div className="flex items-center gap-1.5 font-normal">
                  <ZapIcon className="size-4" />
                  <p className="text-sm leading-none font-medium">
                    Protein Plan
                  </p>
                </div>
              </Label>
              <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-purple-600 has-[[aria-checked=true]]:bg-purple-50">
                <Checkbox
                  checked={filter.mealPlans.includes("Royal")}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => ({
                      ...prev,
                      mealPlans: checked
                        ? [...prev.mealPlans, "Royal"]
                        : prev.mealPlans.filter((plan) => plan !== "Royal"),
                    }));
                  }}
                  className="data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                />
                <div className="flex items-center gap-1.5 font-normal">
                  <CrownIcon className="size-4" />
                  <p className="text-sm leading-none font-medium">Royal Plan</p>
                </div>
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              <span className="text-lg font-semibold">Meal Type</span>
            </Label>
            <div className="flex gap-2 flex-wrap">
              <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50">
                <Checkbox
                  checked={filter.mealTypes.includes("Breakfast")}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => ({
                      ...prev,
                      mealTypes: checked
                        ? [...prev.mealTypes, "Breakfast"]
                        : prev.mealTypes.filter((plan) => plan !== "Breakfast"),
                    }));
                  }}
                  className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                />
                <div className="flex items-center gap-1.5 font-normal">
                  <SunMediumIcon className="size-4" />
                  <p className="text-sm leading-none font-medium">Breakfast</p>
                </div>
              </Label>

              <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50">
                <Checkbox
                  checked={filter.mealTypes.includes("Lunch")}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => ({
                      ...prev,
                      mealTypes: checked
                        ? [...prev.mealTypes, "Lunch"]
                        : prev.mealTypes.filter((plan) => plan !== "Lunch"),
                    }));
                  }}
                  className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                />
                <div className="flex items-center gap-1.5 font-normal">
                  <CloudSunIcon className="size-4" />
                  <p className="text-sm leading-none font-medium">Lunch</p>
                </div>
              </Label>

              <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50">
                <Checkbox
                  checked={filter.mealTypes.includes("Dinner")}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => ({
                      ...prev,
                      mealTypes: checked
                        ? [...prev.mealTypes, "Dinner"]
                        : prev.mealTypes.filter((plan) => plan !== "Dinner"),
                    }));
                  }}
                  className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                />
                <div className="flex items-center gap-1.5 font-normal">
                  <MoonStarIcon className="size-4" />
                  <p className="text-sm leading-none font-medium">Dinner</p>
                </div>
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              <span className="text-lg font-semibold">Allergen</span>
            </Label>
            <div className="flex gap-2 flex-wrap">
              <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50">
                <Checkbox
                  checked={filter.allergens.includes("Free")}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => ({
                      ...prev,
                      allergens: checked
                        ? [...prev.allergens, "Free"]
                        : prev.allergens.filter((plan) => plan !== "Free"),
                    }));
                  }}
                  className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                />
                <div className="flex items-center gap-1.5 font-normal">
                  <CheckIcon className="size-4" />
                  <p className="text-sm leading-none font-medium">Free</p>
                </div>
              </Label>

              <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-red-600 has-[[aria-checked=true]]:bg-red-50">
                <Checkbox
                  checked={filter.allergens.includes("Restricted")}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => ({
                      ...prev,
                      allergens: checked
                        ? [...prev.allergens, "Restricted"]
                        : prev.allergens.filter(
                            (plan) => plan !== "Restricted"
                          ),
                    }));
                  }}
                  className="data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                />
                <div className="flex items-center gap-1.5 font-normal">
                  <CrossIcon className="size-4" />
                  <p className="text-sm leading-none font-medium">Restricted</p>
                </div>
              </Label>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 w-full flex-wrap">
            <Button
              variant={`outline`}
              className="flex-1"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
            <Button
              variant={`default`}
              className="flex-1"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenusPage;
