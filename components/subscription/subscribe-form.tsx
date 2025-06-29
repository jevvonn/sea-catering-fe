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
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  CloudSunIcon,
  InfoIcon,
  MoonStarIcon,
  SunMediumIcon,
} from "lucide-react";
import { z } from "zod";
import { Plan } from "@/types/plan";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TagsInput } from "@/components/ui/tags-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getPlans } from "@/services/plans";
import { useSession } from "@/hooks/use-auth";
import { subscribeSchema } from "@/schema/subscription";
import { toast } from "sonner";
import { createSubscription } from "@/services/subscription";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SubscribeForm = () => {
  const { session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [selectedMealPlan, setSelectedMealPlan] = useState<Plan["id"]>("diet");

  const [totalPrice, setTotalPrice] = useState(0);
  const form = useForm<z.infer<typeof subscribeSchema>>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      mealPlan: selectedMealPlan,
      mealType: [],
      deliveryDays: [],
      allergies: [],
    },
  });

  const mealType = useWatch({ control: form.control, name: "mealType" });
  const deliveryDays = useWatch({
    control: form.control,
    name: "deliveryDays",
  });

  const fetchPlans = async () => {
    const response = await getPlans();

    if (response.data) {
      setPlans(response.data);
    } else {
      console.error("failed to fetch plans:", response.errors);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (session) {
      form.setValue("name", session.user?.name || "");
    }
  }, [session, form]);

  useEffect(() => {
    form.setValue("mealPlan", selectedMealPlan);
  }, [selectedMealPlan, form]);

  useEffect(() => {
    const planPrice =
      plans?.find((plan) => plan.id === selectedMealPlan)?.price || 0;

    const mealTypeCount = form.watch("mealType").length;
    const deliveryDaysCount = form.watch("deliveryDays").length;

    const taxRate = 4.3; // 4.3%
    const total = planPrice * mealTypeCount * deliveryDaysCount * taxRate;

    setTotalPrice(total);
  }, [selectedMealPlan, form, mealType, deliveryDays, plans]);

  async function onSubmit(data: z.infer<typeof subscribeSchema>) {
    setIsLoading(true);
    const result = await createSubscription(data);

    if (!result.errors) {
      toast.success("You've successfully subscribed!");
      form.reset();
      router.push("/dashboard");
    } else {
      toast.error(result.errors);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4 md:gap-2 flex-col w-full md:flex-row items-center">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1 w-full md:w-auto">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input required placeholder="Jevon Mozart" {...field} />
                  </div>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1 w-full md:w-auto">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm ">
                      +62
                    </span>
                    <Input
                      required
                      placeholder="81234567890"
                      type="tel"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="mealPlan"
          render={() => (
            <FormItem>
              <FormLabel>Meal Plan</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  {plans?.map((plan) => (
                    <Label
                      key={plan.id}
                      className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50"
                    >
                      <Checkbox
                        className="hidden"
                        checked={selectedMealPlan === plan.id}
                        onCheckedChange={() => setSelectedMealPlan(plan.id)}
                      />
                      <div className="flex justify-between w-full">
                        <div className="grid gap-3">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm leading-none font-medium">
                              {plan.name}
                            </p>
                          </div>
                          <p className="text-muted-foreground text-xs">
                            {plan.slogan}
                          </p>
                        </div>
                        <div>
                          <p>{formatPrice(plan.price)}</p>
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
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          name="mealType"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal Type</FormLabel>
              <FormControl>
                <div className="flex gap-2 flex-wrap">
                  <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50">
                    <Checkbox
                      className="hidden data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                      checked={field.value.includes("Breakfast")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, "Breakfast"]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v !== "Breakfast")
                          );
                        }
                      }}
                    />
                    <div className="flex items-center gap-1.5 font-normal">
                      <SunMediumIcon className="size-4" />
                      <p className="text-sm leading-none font-medium">
                        Breakfast
                      </p>
                    </div>
                  </Label>

                  <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50">
                    <Checkbox
                      className="hidden data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                      checked={field.value.includes("Lunch")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, "Lunch"]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v !== "Lunch")
                          );
                        }
                      }}
                    />
                    <div className="flex items-center gap-1.5 font-normal">
                      <CloudSunIcon className="size-4" />
                      <p className="text-sm leading-none font-medium">Lunch</p>
                    </div>
                  </Label>

                  <Label className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50">
                    <Checkbox
                      className="hidden data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                      checked={field.value.includes("Dinner")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, "Dinner"]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v !== "Dinner")
                          );
                        }
                      }}
                    />
                    <div className="flex items-center gap-1.5 font-normal">
                      <MoonStarIcon className="size-4" />
                      <p className="text-sm leading-none font-medium">Dinner</p>
                    </div>
                  </Label>
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          name="deliveryDays"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Days</FormLabel>
              <FormControl>
                <div className="flex gap-2 flex-wrap">
                  {DAYS.map((day) => (
                    <Label
                      key={day}
                      className="cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50"
                    >
                      <Checkbox
                        className="hidden data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                        checked={field.value.includes(day)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, day]);
                          } else {
                            field.onChange(
                              field.value.filter((v) => v !== day)
                            );
                          }
                        }}
                      />
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
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          name="allergies"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  className="px-2 rounded-md shadow-sm"
                  placeholder="e.g. nuts, dairy"
                />
              </FormControl>
              <FormDescription />
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <div>
          <Label className="text-base">Price</Label>

          <Table className="mt-2">
            <TableBody>
              <TableRow>
                <TableCell>Meal Plan</TableCell>
                <TableCell className="text-right">
                  {plans
                    ?.find((plan) => plan.id === selectedMealPlan)
                    ?.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) || "Rp0"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Meal Types</TableCell>
                <TableCell className="text-right">
                  {form.watch("mealType").length} types
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Delivery Days</TableCell>
                <TableCell className="text-right">
                  {form.watch("deliveryDays").length} days
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell className="text-right">4.3</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold">Total Price</h2>

              <Popover>
                <PopoverTrigger>
                  <InfoIcon className="text-blue-800" size={20} />
                </PopoverTrigger>
                <PopoverContent className="text-sm">
                  (Plan Price) × (Number of Meal Types Selected) × (Number of
                  Delivery Days Selected) × 4.3
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-xl md:text-2xl font-bold">
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>

        <div>
          <Button type="submit" disabled={isLoading} className="w-full">
            Subscribe Now
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubscribeForm;
