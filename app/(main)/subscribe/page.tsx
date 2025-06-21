"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CloudSunIcon, MoonStarIcon, SunMediumIcon } from "lucide-react";
import { PLANS_ITEM } from "@/lib/plans-data";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SubscribePlan = () => {
  const form = useForm();
  const [selectedMealPlan, setSelectedMealPlan] = useState<
    "diet" | "protein" | "royal"
  >("diet");

  return (
    <main className="pt-5 md:pt-10 px-4 md:px-10 relative">
      <div className="max-w-6xl mx-auto px-4 pb-2">
        <h2 className="text-3xl text-center font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Subscribe Meal Plan
        </h2>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <Form {...form}>
          <div className="flex gap-4 md:gap-2 flex-col md:flex-row items-center">
            <FormField
              name="fullName"
              render={() => (
                <FormItem className="flex-1">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl className="w-full">
                    <div className="relative">
                      <Input placeholder="Jevon Mozart" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="phoneNumber"
              render={() => (
                <FormItem className="flex-1">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm ">
                        +62
                      </span>
                      <Input
                        placeholder="812-3456-7890"
                        type="tel"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="mealPlan"
            render={() => (
              <FormItem className="mt-4">
                <FormLabel>Meal Plan</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    {PLANS_ITEM.map((plan) => (
                      <Label
                        key={plan.id}
                        className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50"
                      >
                        <Checkbox
                          className="hidden"
                          checked={selectedMealPlan === plan.id}
                          onCheckedChange={() =>
                            setSelectedMealPlan(
                              plan.id as "diet" | "protein" | "royal"
                            )
                          }
                        />
                        <div className="flex justify-between w-full">
                          <div className="grid gap-3">
                            <div className="flex items-center gap-1.5">
                              <plan.icon className="w-4 h-4" />
                              <p className="text-sm leading-none font-medium">
                                {plan.name}
                              </p>
                            </div>
                            <p className="text-muted-foreground text-xs">
                              {plan.description}
                            </p>
                          </div>
                          <div>
                            <p>Rp{plan.price.toLocaleString()}</p>
                            <p className="text-xs text-right text-muted-foreground">
                              per meal
                            </p>
                          </div>
                        </div>
                      </Label>
                    ))}
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="mealType"
            render={() => (
              <FormItem className="mt-4">
                <FormLabel>Meal Type</FormLabel>
                <FormControl>
                  <div className="flex gap-2 flex-wrap">
                    <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50">
                      <Checkbox className="hidden data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white" />
                      <div className="flex items-center gap-1.5 font-normal">
                        <SunMediumIcon className="size-4" />
                        <p className="text-sm leading-none font-medium">
                          Breakfast
                        </p>
                      </div>
                    </Label>

                    <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50">
                      <Checkbox className="hidden data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white" />
                      <div className="flex items-center gap-1.5 font-normal">
                        <CloudSunIcon className="size-4" />
                        <p className="text-sm leading-none font-medium">
                          Lunch
                        </p>
                      </div>
                    </Label>

                    <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50">
                      <Checkbox className="hidden data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white" />
                      <div className="flex items-center gap-1.5 font-normal">
                        <MoonStarIcon className="size-4" />
                        <p className="text-sm leading-none font-medium">
                          Dinner
                        </p>
                      </div>
                    </Label>
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="days"
            render={() => (
              <FormItem className="mt-4">
                <FormLabel>Days</FormLabel>
                <FormControl>
                  <div className="flex gap-2 flex-wrap">
                    {DAYS.map((day) => (
                      <Label
                        key={day}
                        className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50"
                      >
                        <Checkbox className="hidden data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white" />
                        <div className="flex items-center gap-1.5 font-normal">
                          <p className="text-sm leading-none font-medium">
                            {day}
                          </p>
                        </div>
                      </Label>
                    ))}
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>
    </main>
  );
};

export default SubscribePlan;
