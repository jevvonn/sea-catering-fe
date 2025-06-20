import { MenuItem } from "@/types/menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CloudSunIcon,
  CrossIcon,
  CrownIcon,
  LeafIcon,
  MoonStarIcon,
  SunMediumIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

type Props = {
  menu: MenuItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MenuCardDialog = ({ menu, open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-4 h-[100svh] md:h-[90svh] overflow-y-auto w-screen max-w-screen sm:max-w-2xl">
        <DialogHeader className="gap-4">
          <DialogTitle>{menu.name}</DialogTitle>
          <Image
            src={menu.image}
            alt="Menu Placeholder"
            width={600}
            height={400}
            className="w-auto h-auto object-cover rounded-md"
          />
        </DialogHeader>

        <div className="flex items-center flex-wrap gap-2">
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

          {menu.mealTypes.map((type) => (
            <Badge key={type} variant="secondary">
              {type === "Breakfast" ? <SunMediumIcon /> : null}
              {type === "Lunch" ? <CloudSunIcon /> : null}
              {type === "Dinner" ? <MoonStarIcon /> : null}
              {type}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">Description</Label>
          <DialogDescription className="md:text-base text-sm text-justify">
            {menu.description}
          </DialogDescription>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 justify-between flex-wrap">
            <Label className="font-semibold">Allergen</Label>
            <Badge
              className={cn({
                "bg-green-100 text-green-800": menu.allergenFree,
                "bg-red-100 text-red-800": !menu.allergenFree,
              })}
            >
              {menu.allergenFree ? <CheckIcon /> : <CrossIcon />}
              {menu.allergenFree ? "Allergen Free" : "Allergen Restricted"}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            {menu.allergenFree
              ? "This menu item is free from common allergens."
              : menu.allergenInfo}
          </p>
        </div>

        <div>
          <Label className="font-semibold">Nutrial Information</Label>

          <Table className="mt-2">
            <TableHeader>
              <TableRow>
                <TableHead>Nutrients</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Calories</TableCell>
                <TableCell className="text-right">
                  {menu.nutrition.calories} kcal
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Protein</TableCell>
                <TableCell className="text-right">
                  {menu.nutrition.protein} g
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fat</TableCell>
                <TableCell className="text-right">
                  {menu.nutrition.fat} g
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carbs</TableCell>
                <TableCell className="text-right">
                  {menu.nutrition.carbs} g
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sugar</TableCell>
                <TableCell className="text-right">
                  {menu.nutrition.sugar} g
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <DialogFooter className="w-full">
          <Link href={`/plans`}>
            <Button variant={`outline`}>
              Subscribe Meal Plan <ArrowUpRightIcon />
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MenuCardDialog;
