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
  StarIcon,
  ClockIcon,
  CheckIcon,
  ChefHatIcon,
  ArrowUpRightIcon,
  LeafIcon,
  ZapIcon,
  CrownIcon,
} from "lucide-react";
import Link from "next/link";

const MEAL_PLANS = [
  {
    id: "diet",
    name: "Diet Plan",
    price: 30000,
    icon: <LeafIcon className="w-8 h-8" />,
    color: "bg-green-500",
    borderColor: "border-green-500",
    description: "Perfect for healthy weight management",
    tagline: "Light & Nutritious",
    features: [
      "300-400 calories per meal",
      "High fiber content",
      "Low fat recipes",
      "Portion controlled",
      "Fresh vegetables daily",
    ],
    popular: false,
  },
  {
    id: "protein",
    name: "Protein Plan",
    price: 40000,
    icon: <ZapIcon className="w-8 h-8" />,
    color: "bg-orange-500",
    borderColor: "border-orange-500",
    description: "Ideal for muscle building & active lifestyle",
    tagline: "Power & Performance",
    features: [
      "25-35g protein per meal",
      "Lean meat & fish",
      "Post-workout friendly",
      "Balanced macronutrients",
      "Athletic performance focused",
    ],
    popular: true,
  },
  {
    id: "royal",
    name: "Royal Plan",
    price: 60000,
    icon: <CrownIcon className="w-8 h-8" />,
    color: "bg-purple-500",
    borderColor: "border-purple-500",
    description: "Premium experience",
    tagline: "Luxury & Elegance",
    features: [
      "Premium ingredients",
      "Chef-crafted recipes",
      "Restaurant quality",
      "Exclusive menu items",
    ],
    popular: false,
  },
];

const MealPlansPage = () => {
  return (
    <main className="pt-5 md:pt-10 px-4 md:px-10 relative">
      <div className="max-w-6xl mx-auto px-4 pb-2">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Choose Your Meal Plan
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Select the perfect plan for your lifestyle and goals
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEAL_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative shadow-none hover:shadow-xl transition-all duration-300 ${
                plan.popular ? "ring-2 ring-primary scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">
                    <StarIcon className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`${plan.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
                >
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-gray-600 font-medium">
                  {plan.tagline}
                </p>
                <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
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
                      className={`w-full ${plan.color} hover:${plan.color} hover:opacity-90 text-white`}
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
                          className={`${plan.color} p-1 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white`}
                        >
                          {plan.icon}
                        </div>
                        {plan.name}
                      </DialogTitle>
                      <p className="text-gray-600 text-center">
                        {plan.description}
                      </p>
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
                        {plan.features.map((feature, idx) => (
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
                      <Button
                        size="lg"
                        className={`flex-1 ${plan.color} hover:${plan.color} hover:opacity-90 text-white`}
                      >
                        Subscribe to {plan.name}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-white/80 shadow-none backdrop-blur">
            <h3 className="text-2xl font-bold mb-4">
              Why Choose SEA Catering?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <LeafIcon className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Fresh Ingredients</h4>
                <p className="text-sm text-gray-600">
                  Sourced daily from local farms and premium suppliers
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ClockIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">On-Time Delivery</h4>
                <p className="text-sm text-gray-600">
                  Reliable delivery across major cities in Indonesia
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ChefHatIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Chef Prepared</h4>
                <p className="text-sm text-gray-600">
                  Every meal crafted by professional chefs
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default MealPlansPage;
