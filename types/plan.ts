export type PlanItem = {
  id: "diet" | "protein" | "royal";
  name: string;
  price: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  borderColor: string;
  description: string;
  tagline: string;
  features: string[];
  popular: boolean;
};
