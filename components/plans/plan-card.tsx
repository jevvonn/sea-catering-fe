import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ClockIcon,
  CheckIcon,
  ChefHatIcon,
  ArrowUpRightIcon,
  StarIcon,
  LeafIcon,
  ZapIcon,
  CrownIcon,
} from "lucide-react";
import Link from "next/link";
import { Plan } from "@/types/plan";

const PlanCard = ({ plan }: { plan: Plan }) => {
  let planColor = "bg-green-500";
  let PlanIcon = LeafIcon;
  const planPopular = plan.id === "protein";

  if (plan.id === "protein") {
    planColor = "bg-orange-500";
    PlanIcon = ZapIcon;
  } else if (plan.id === "royal") {
    planColor = "bg-purple-500";
    PlanIcon = CrownIcon;
  }

  return (
    <Card
      key={plan.id}
      className={`relative shadow-none hover:shadow-xl transition-all duration-300 ${
        planPopular ? "ring-2 ring-primary scale-105" : ""
      }`}
    >
      {planPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-white px-4 py-1">
            <StarIcon className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <div
          className={`${planColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
        >
          <PlanIcon className="w-8 h-8" />
        </div>
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <p className="text-sm text-gray-600 font-medium">{plan.slogan}</p>
        <div className="mt-4">
          <div className="text-3xl font-bold text-gray-900">
            Rp{plan.price.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">per meal</div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className={`w-full ${planColor} hover:${planColor} hover:opacity-90 text-white`}
              size="lg"
            >
              <ChefHatIcon className="w-4 h-4 mr-2" />
              See Benefits
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-2 md:space-y-4">
            <DialogHeader>
              <DialogTitle className="flex flex-wrap justify-center items-center gap-3 text-xl md:text-2xl">
                <div
                  className={`${planColor} p-1 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white`}
                >
                  <PlanIcon className="w-8 h-8" />
                </div>
                {plan.name}
              </DialogTitle>
            </DialogHeader>

            <div className="flex items-center flex-wrap gap-2 justify-center">
              <Badge variant={`outline`} className="text-sm">
                <CheckIcon className="w-3 h-3 text-green-500" />
                Breakfast
              </Badge>
              <Badge variant={`outline`} className="text-sm">
                <CheckIcon className="w-3 h-3 text-green-500" />
                Lunch
              </Badge>
              <Badge variant={`outline`} className="text-sm">
                <CheckIcon className="w-3 h-3 text-green-500" />
                Dinner
              </Badge>
            </div>

            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Plan Benefits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                {plan.features.split(",").map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckIcon className="w-3 h-3 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={`/menus`} className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  <span>See Our Menus</span>
                  <ArrowUpRightIcon />
                </Button>
              </Link>
              <Link href={`/subscribe`} className="flex-1">
                <Button
                  size="lg"
                  className={`${planColor} w-full hover:${planColor} hover:opacity-90 text-white`}
                >
                  Subscribe to {plan.name}
                </Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
