import SubscriptionReportDashboard from "@/components/subscription/subscriptions-report-dashboard";
import React from "react";

const ReportSubscriptionsPage = () => {
  return (
    <div>
      <section>
        <h1 className="text-2xl font-bold">Subscriptions Report</h1>
      </section>

      <SubscriptionReportDashboard />
    </div>
  );
};

export default ReportSubscriptionsPage;
