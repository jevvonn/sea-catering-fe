import { Card } from "@/components/ui/card";
import { ClockIcon, ChefHatIcon, LeafIcon } from "lucide-react";
import PlansList from "@/components/plans/plan-list";

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
        <PlansList />

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
