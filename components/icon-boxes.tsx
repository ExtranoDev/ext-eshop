import {
  DollarSign,
  Headset,
  LucideIcon,
  ShoppingBag,
  WalletCards,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: ShoppingBag,
    title: "Free Shipping",
    description: "Free Shipping on orders above $100",
  },
  {
    icon: DollarSign,
    title: "Money Back Guarantee",
    description: "Within 30 days of purchase",
  },
  {
    icon: WalletCards,
    title: "Flexible Payment",
    description: "Pay with Credit Card, Paystack, or Flutterwave",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Get dedicated support at any time",
  },
];

const IconBox = () => {
  return (
    <section className="w-full flex justify-center py-8 md:py-12 bg-gray-50">
      <div className="container px-4">
        {/* We removed the Card to make the features blend into a section,
            but you can add it back if you prefer the boxed look. */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IconBox;

// The reusable child component for each feature
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:space-x-4">
      {/* Icon with a styled background */}
      <div className="flex-shrink-0 mb-4 md:mb-0">
        <div className="bg-muted text-muted-foreground w-12 h-12 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-1">
        <h3 className="text-md font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
