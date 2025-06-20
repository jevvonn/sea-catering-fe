import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MENU_ITEMS } from "@/lib/menu-data";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  CloudSunIcon,
  CrossIcon,
  CrownIcon,
  CupSodaIcon,
  FilterIcon,
  LeafIcon,
  MoonStarIcon,
  SearchIcon,
  SunMediumIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
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
          <Card key={idx} className="p-4 rounded-md gap-1 shadow-none">
            <CardHeader className="p-0 m-0">
              <Image
                src={item.image}
                alt="Menu Placeholder"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-md"
              />
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <h3 className="text-lg font-semibold">{item.name}</h3>

              <div className="flex items-center gap-2">
                {item.plans.map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className={cn({
                      "bg-green-100 text-green-800": type === "Diet",
                      "bg-orange-100 text-orange-800": type === "Protein",
                      "bg-purple-100 text-purple-800": type === "Royal",
                    })}
                  >
                    {type === "Diet" ? <LeafIcon /> : null}
                    {type === "Protein" ? <ZapIcon /> : null}
                    {type === "Royal" ? <CrownIcon /> : null}
                    {type} Plan
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {item.mealTypes.map((type) => (
                  <Badge key={type} variant="secondary">
                    {type === "Breakfast" ? <SunMediumIcon /> : null}
                    {type === "Lunch" ? <CloudSunIcon /> : null}
                    {type === "Dinner" ? <MoonStarIcon /> : null}
                    {type}
                  </Badge>
                ))}
              </div>

              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    className={cn({
                      "bg-green-100 text-green-800": item.allergenFree,
                      "bg-red-100 text-red-800": !item.allergenFree,
                    })}
                  >
                    {item.allergenFree ? <CheckIcon /> : <CrossIcon />}
                    {item.allergenFree
                      ? "Allergen Free"
                      : "Allergen Restricted"}
                  </Badge>
                </TooltipTrigger>
                {!item.allergenFree ? (
                  <TooltipContent>
                    <p>{item.allergenInfo}</p>
                  </TooltipContent>
                ) : null}
              </Tooltip>

              <div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>

              <Button variant={`outline`} className="">
                <CupSodaIcon /> See More Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default MenusPage;
