"use client";

import SubscriptionCard from "@/components/subscription/subscription-card";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-auth";
import { getSubscriptions } from "@/services/subscription";
import { Subscription } from "@/types/subscription";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const session = useSession();
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(
    null
  );

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

  return (
    <div>
      <section>
        <h1 className="text-2xl font-bold">Hello, {session?.user?.name}</h1>
        <p className="mt-2 text-muted-foreground">Welcome to your dashboard!</p>
      </section>

      <section className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold">
            Active Subscriptions
          </h2>
          <Link href={"/subscribe"}>
            <Button>Subscribe Now</Button>
          </Link>
        </div>
        {subscriptions?.filter(
          (sub) => sub.status === "ACTIVE" && !sub.is_paused
        ).length === 0 && (
          <p className="text-muted-foreground">
            You have no active subscriptions at the moment.
          </p>
        )}
        <div className="space-y-4">
          {subscriptions
            ?.filter((sub) => sub.status === "ACTIVE" && !sub.is_paused)
            .map((subscription) => (
              <SubscriptionCard
                refetch={fetchSubscriptions}
                key={subscription.id}
                data={subscription}
              />
            ))}
        </div>

        <h2 className="text-base sm:text-lg font-semibold">
          Paused Subscriptions
        </h2>
        {subscriptions?.filter(
          (sub) => sub.status === "ACTIVE" && sub.is_paused
        ).length === 0 && (
          <p className="text-muted-foreground">
            You have no paused subscriptions at the moment.
          </p>
        )}
        <div className="space-y-4">
          {subscriptions
            ?.filter((sub) => sub.status === "ACTIVE" && sub.is_paused)
            .map((subscription) => (
              <SubscriptionCard
                refetch={fetchSubscriptions}
                key={subscription.id}
                data={subscription}
              />
            ))}
        </div>

        <h2 className="text-base sm:text-lg font-semibold">
          Canceled Subscriptions
        </h2>
        {subscriptions?.filter((sub) => sub.status === "CANCELLED").length ===
          0 && (
          <p className="text-muted-foreground">
            You have no canceled subscriptions at the moment.
          </p>
        )}
        <div className="space-y-4">
          {subscriptions
            ?.filter((sub) => sub.status === "CANCELLED")
            .map((subscription) => (
              <SubscriptionCard
                refetch={fetchSubscriptions}
                key={subscription.id}
                data={subscription}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
