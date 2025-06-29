"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  Users,
  Activity,
  ArrowUpIcon,
  ArrowDownIcon,
  LucideIcon,
  BanknoteIcon,
} from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { cn, formatPrice } from "@/lib/utils";
import { Subscription, SubscriptionReportResponse } from "@/types/subscription";
import {
  getSubscriptions,
  getSubscriptionsReport,
} from "@/services/subscription";

const SubscriptionReportDashboard = () => {
  const [report, setReport] = useState<SubscriptionReportResponse | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const fetchSubscriptions = async () => {
    const response = await getSubscriptions();

    if (response.data) {
      setSubscriptions(response.data);
    } else if (!response.data && !response.errors) {
      setSubscriptions([]);
    } else {
      console.error("Failed to fetch subscriptions:", response.errors);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchReport = async (startDate?: Date, endDate?: Date) => {
    const response = await getSubscriptionsReport(startDate, endDate);

    if (response.data && !response.errors) {
      setReport(response.data);
    } else {
      console.error("Failed to fetch subscriptions:", response.errors);
    }
  };

  useEffect(() => {
    fetchReport(dateRange.from, dateRange.to);
  }, [dateRange.from, dateRange.to]);

  const MetricCard = ({
    title,
    value,
    description,
    icon: Icon,
    growth,
    format = "number",
  }: {
    title: string;
    value: number;
    description: string;
    icon: LucideIcon;
    growth?: number;
    format?: "number" | "currency";
  }) => {
    const formatValue = () => {
      switch (format) {
        case "currency":
          return formatPrice(value);
        default:
          return value.toLocaleString();
      }
    };

    return (
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatValue()}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>{description}</span>
            {growth !== undefined && (
              <div
                className={cn(
                  "flex items-center",
                  growth > 0
                    ? "text-green-600"
                    : growth < 0
                    ? "text-red-600"
                    : "text-gray-500"
                )}
              >
                {growth > 0 ? (
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                ) : growth < 0 ? (
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                ) : null}
                <span>{Math.abs(growth).toFixed(1)}%</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[280px] justify-start text-left font-normal bg-transparent"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from && dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3 space-y-3">
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setDateRange({
                          from: startOfMonth(new Date()),
                          to: endOfMonth(new Date()),
                        })
                      }
                    >
                      This Month
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setDateRange({
                          from: subDays(new Date(), 30),
                          to: new Date(),
                        })
                      }
                    >
                      Last 30 Days
                    </Button>
                  </div>
                </div>
                <small className="mb-2 italic">
                  *double click for selecting start date
                </small>
                <Separator />
                <Calendar
                  mode="range"
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDateRange({ from: range.from, to: range.to });
                    }
                  }}
                  numberOfMonths={2}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {report && (
          <>
            <MetricCard
              title="New Subscriptions"
              value={report.active_subscriptions_by_date}
              description="New signups in period"
              icon={Users}
            />
            <MetricCard
              title="Monthly Recurring Revenue"
              value={report.total_revenue_by_date}
              description="Total MRR from active subs"
              icon={BanknoteIcon}
              format="currency"
            />
            <MetricCard
              title="Active Subscriptions"
              value={report.total_active_subscriptions}
              description="Total active subscribers"
              icon={Activity}
            />
          </>
        )}
      </div>

      {/* Detailed Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Subscriptions */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Recent Subscriptions</CardTitle>
            <CardDescription>
              Latest subscription activities in selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptions
                .filter((sub) => {
                  const createdDate = new Date(sub.created_at);
                  return (
                    createdDate >= dateRange.from && createdDate <= dateRange.to
                  );
                })
                .slice(0, 5)
                .map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{sub.user.name}</p>
                      <p className="text-xs text-gray-500">{sub.plan.name}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge
                        variant={
                          sub.status === "ACTIVE"
                            ? "default"
                            : sub.is_paused
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {sub.status}
                      </Badge>
                      <p className="text-xs text-gray-500">
                        {formatPrice(sub.total_price)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Active subscriptions by plan type</CardDescription>
          </CardHeader>
          <CardContent>
            {report && (
              <div className="space-y-4">
                {Object.entries(
                  subscriptions
                    .filter((sub) => sub.status === "ACTIVE")
                    .reduce((acc, sub) => {
                      acc[sub.plan.name] = (acc[sub.plan.name] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                ).map(([plan, count]) => (
                  <div key={plan} className="flex items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium">{plan}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (count / report?.total_active_subscriptions) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-bold">{count}</p>
                      <p className="text-xs text-gray-500">
                        {(
                          (count / report?.total_active_subscriptions) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Period Summary</CardTitle>
          <CardDescription>
            Summary for {format(dateRange.from, "MMM dd, yyyy")} -{" "}
            {format(dateRange.to, "MMM dd, yyyy")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {report && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {formatPrice(report.total_revenue)}
                </p>
                <p className="text-sm text-green-700">Total MRR</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {report.total_active_subscriptions}
                </p>
                <p className="text-sm text-purple-700">Active Subscriptions</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionReportDashboard;
