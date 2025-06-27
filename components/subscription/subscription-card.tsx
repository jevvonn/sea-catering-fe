"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Calendar,
  Utensils,
  AlertTriangle,
  PauseIcon,
  XIcon,
  PlayIcon,
  CirclePauseIcon,
} from "lucide-react";
import { format, isToday } from "date-fns";
import { cn, formatPrice } from "@/lib/utils";
import { useState } from "react";
import { CalendarIcon } from "lucide-react"; // Import CalendarIcon
import { Subscription } from "@/types/subscription";
import { updateSubscription } from "@/services/subscription";
import { toast } from "sonner";

type Props = {
  data: Subscription;
  refetch?: () => Promise<void>;
};

const SubscriptionCard = ({ data, refetch }: Props) => {
  const [pauseStartDate, setPauseStartDate] = useState<Date>();
  const [pauseEndDate, setPauseEndDate] = useState<Date>();
  const [isPauseDialogOpen, setIsPauseDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePauseSubscription = async () => {
    if (!pauseStartDate || !pauseEndDate) {
      toast.error("Please select both start and end dates for pausing.");
      return;
    }

    setIsLoading(true);
    const result = await updateSubscription(data.id, {
      name: null,
      phone_number: null,
      status: null,
      pause_end_date: pauseEndDate,
      pause_start_date: pauseStartDate,
    });

    if (!result.errors) {
      toast.success("Subscription paused successfully");
      setPauseStartDate(undefined);
      setPauseEndDate(undefined);
      setIsPauseDialogOpen(false);

      refetch?.();
    } else {
      toast.error(result.errors);
    }

    setIsLoading(false);
  };

  const handleReactivateSubscription = async () => {
    setIsLoading(true);
    setPauseStartDate(undefined);
    setPauseEndDate(undefined);

    const result = await updateSubscription(data.id, {
      name: null,
      phone_number: null,
      status: "ACTIVE",
      pause_start_date: null,
      pause_end_date: null,
    });

    if (!result.errors) {
      toast.success("Subscription reactivated successfully");
      refetch?.();
    } else {
      toast.error(result.errors);
    }

    setIsLoading(false);
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    setPauseStartDate(undefined);
    setPauseEndDate(undefined);

    const result = await updateSubscription(data.id, {
      name: null,
      phone_number: null,
      status: "CANCELLED",
      pause_start_date: null,
      pause_end_date: null,
    });

    if (!result.errors) {
      toast.success("Subscription cancelled successfully");
      refetch?.();
    } else {
      toast.error(result.errors);
    }

    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Card className="w-full shadow-none py-4">
        <CardHeader className="pb-0 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">
                {data.plan.name}
              </CardTitle>
              <p className="text-sm text-orange-600 font-medium">
                {data.plan.slogan}
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              {data.status === "CANCELLED" && (
                <Badge
                  variant="default"
                  className="bg-red-100 text-red-800 hover:bg-red-100"
                >
                  <XIcon className="w-4 h-4 mr-1" />
                  {data.status}
                </Badge>
              )}

              {data.status === "ACTIVE" && !data.is_paused && (
                <>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800 hover:bg-green-100"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {data.status}
                  </Badge>
                  <Button
                    disabled={isLoading}
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsPauseDialogOpen(true)}
                    className="hidden md:flex"
                  >
                    <PauseIcon className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                </>
              )}
              {data.status === "ACTIVE" && data.is_paused && (
                <Badge variant="secondary">
                  <CirclePauseIcon className="w-4 h-4 mr-1" />
                  Paused
                </Badge>
              )}

              {data.is_paused && data.status != "CANCELLED" && (
                <Button
                  disabled={isLoading}
                  variant="default"
                  size="sm"
                  onClick={() => handleReactivateSubscription()}
                  className="hidden md:flex"
                >
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Reactivate
                </Button>
              )}
              {data.status === "ACTIVE" && (
                <Button
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCancelDialogOpen(true)}
                  className="text-red-600 hidden md:flex hover:bg-red-50 hover:text-red-600"
                >
                  <XIcon className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                Customer Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-start text-gray-700 text-sm sm:text-base">
                  <span className="font-medium">Name:</span>
                  <span className="ml-2">{data.name}</span>
                </div>
                <div className="flex items-start text-gray-700 text-sm sm:text-base">
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">+62 {data.phone_number}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">
                Plan Details
              </h3>
              <div className="space-y-2">
                <div className="text-gray-700 text-sm sm:text-base">
                  <span className="font-medium">Base Price:</span>
                  <span className="ml-2">{formatPrice(data.plan.price)}</span>
                </div>
                <div className="text-gray-700 text-sm sm:text-base">
                  <span className="font-medium">Total Price:</span>
                  <span className="ml-2 font-bold text-green-600">
                    {formatPrice(data.total_price)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Plan Features
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {data.plan.features}
            </p>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 flex items-center mb-3">
                <Utensils className="w-5 h-5 mr-2" />
                Meal Types
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.mealtype.map((meal) => (
                  <Badge
                    key={meal}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {meal}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 flex items-center mb-3">
                <Calendar className="w-5 h-5 mr-2" />
                Delivery Days
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.delivery_days.map((day) => (
                  <Badge
                    key={day}
                    variant="outline"
                    className="border-green-300 text-green-700"
                  >
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 flex items-center mb-3">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
              Allergies & Restrictions
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.allergies.length === 0 && (
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-800"
                >
                  You have no allergies or restrictions
                </Badge>
              )}

              {data.allergies.map((allergy) => (
                <Badge
                  key={allergy}
                  variant="destructive"
                  className="bg-red-100 text-red-800 hover:bg-red-100"
                >
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Subscription Dates */}
          <div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Subscribe Date :</span>
              <span className="ml-2">{formatDate(data.created_at)}</span>
            </div>
            {data.status === "CANCELLED" && (
              <div className="text-sm mt-1 text-muted-foreground">
                <span className="font-medium">Canceled Date :</span>
                <span className="ml-2">{formatDate(data.updated_at)}</span>
              </div>
            )}
          </div>

          <CardFooter className="w-full flex gap-2 px-0">
            {data.status === "ACTIVE" && !data.is_paused && (
              <Button
                disabled={isLoading}
                variant="secondary"
                size="sm"
                onClick={() => setIsPauseDialogOpen(true)}
                className="flex md:hidden"
              >
                <PauseIcon className="w-4 h-4 mr-2" />
                Pause
              </Button>
            )}
            {data.is_paused && data.status != "CANCELLED" && (
              <Button
                disabled={isLoading}
                variant="default"
                size="sm"
                onClick={() => handleReactivateSubscription()}
                className="flex md:hidden"
              >
                <PlayIcon className="w-4 h-4 mr-2" />
                Reactivate
              </Button>
            )}
            {data.status === "ACTIVE" && (
              <Button
                disabled={isLoading}
                variant="outline"
                size="sm"
                onClick={() => setIsCancelDialogOpen(true)}
                className="text-red-600 flex md:hidden hover:bg-red-50 hover:text-red-600"
              >
                <XIcon className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            )}
          </CardFooter>
        </CardContent>
      </Card>

      {/* Pause Modal */}
      {isPauseDialogOpen && (
        <Dialog open={isPauseDialogOpen} onOpenChange={setIsPauseDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Pause Subscription</DialogTitle>
              <DialogDescription>
                Temporarily pause your {data.plan.name} subscription. No charges
                will be applied during the pause period.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="pause-start">Pause Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !pauseStartDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {pauseStartDate
                        ? format(pauseStartDate, "PPP")
                        : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={pauseStartDate}
                      onSelect={setPauseStartDate}
                      disabled={(date) => date < new Date() && !isToday(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pause-end">Pause End Date</Label>
                <Popover>
                  <PopoverTrigger asChild disabled={!pauseStartDate}>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !pauseEndDate && "text-muted-foreground"
                      )}
                      disabled={!pauseStartDate}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {pauseEndDate
                        ? format(pauseEndDate, "PPP")
                        : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={pauseEndDate}
                      onSelect={setPauseEndDate}
                      disabled={(date) => date < pauseStartDate!}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-md">
                <p className="font-medium">Important:</p>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li>No deliveries will be made during the pause period</li>
                  <li>No charges will be applied during this time</li>
                  <li>
                    Your subscription will automatically resume after the end
                    date
                  </li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsPauseDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePauseSubscription}
                disabled={!pauseStartDate || !pauseEndDate}
              >
                Pause Subscription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Cancel Modal */}
      {isCancelDialogOpen && (
        <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-red-600">
                Cancel Subscription
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to permanently cancel your{" "}
                {data.plan.name} subscription? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                <p className="font-medium">What happens when you cancel:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Your subscription will end immediately</li>
                  <li>No future deliveries will be scheduled</li>
                  <li>You&apos;ll lose access to your current plan benefits</li>
                  <li>This action cannot be reversed</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCancelDialogOpen(false)}
              >
                Keep Subscription
              </Button>
              <Button variant="destructive" onClick={handleCancelSubscription}>
                Cancel Subscription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SubscriptionCard;
