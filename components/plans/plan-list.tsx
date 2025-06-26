import React from "react";
import PlanCard from "./plan-card";
import { getPlans } from "@/services/plans";

const PlansList = async () => {
  const response = await getPlans();

  if (!response.data) {
    return (
      <div className="text-red-500">Error loading plans: {response.errors}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {response.data.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

export default PlansList;
