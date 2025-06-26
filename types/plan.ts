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

export type Plan = {
  id: string;
  name: string;
  price: number;
  slogan: string;
  features: string;
  created_at: string;
  updated_at: string;
};
