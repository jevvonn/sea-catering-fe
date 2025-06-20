"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { MenuItem } from "@/types/menu";
import {
  CheckIcon,
  CloudSunIcon,
  CrossIcon,
  CrownIcon,
  CupSodaIcon,
  LeafIcon,
  MoonStarIcon,
  SunMediumIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import MenuCardDialog from "./menu-card-dialog";

const MenuCard = ({ menu }: { menu: MenuItem }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <Card className="p-4 rounded-md gap-1 shadow-none">
        <CardHeader className="p-0 m-0">
          <Image
            src={menu.image}
            alt="Menu Placeholder"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-md"
          />
        </CardHeader>
        <CardContent className="p-0 space-y-3">
          <h3 className="text-lg font-semibold">{menu.name}</h3>

          <div className="flex items-center gap-2">
            {menu.plans.map((type) => (
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
            {menu.mealTypes.map((type) => (
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
                  "bg-green-100 text-green-800": menu.allergenFree,
                  "bg-red-100 text-red-800": !menu.allergenFree,
                })}
              >
                {menu.allergenFree ? <CheckIcon /> : <CrossIcon />}
                {menu.allergenFree ? "Allergen Free" : "Allergen Restricted"}
              </Badge>
            </TooltipTrigger>
            {!menu.allergenFree ? (
              <TooltipContent>
                <p>{menu.allergenInfo}</p>
              </TooltipContent>
            ) : null}
          </Tooltip>

          <div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {menu.description}
            </p>
          </div>

          <Button variant={`outline`} onClick={() => setIsDetailOpen(true)}>
            <CupSodaIcon /> See More Details
          </Button>
        </CardContent>
      </Card>

      {isDetailOpen && (
        <MenuCardDialog
          menu={menu}
          open={isDetailOpen}
          onOpenChange={() => setIsDetailOpen(false)}
        />
      )}
    </>
  );
};

export default MenuCard;
