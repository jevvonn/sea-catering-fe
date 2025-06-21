import SubscribeForm from "@/components/subscription/subscribe-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe Meal Plan",
};

const SubscribePlan = () => {
  return (
    <main className="pt-5 md:pt-10 px-4 md:px-10 relative">
      <div className="max-w-6xl mx-auto px-4 pb-2">
        <h2 className="text-3xl text-center font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Subscribe Meal Plan
        </h2>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 md:py-12">
        <SubscribeForm />
      </div>
    </main>
  );
};

export default SubscribePlan;
