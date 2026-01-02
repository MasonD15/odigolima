import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses getting started",
    features: [
      "Up to 3 AI-generated widgets",
      "Basic analytics dashboard",
      "500 leads per month",
      "Email support",
      "1 website integration",
    ],
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For growing businesses ready to scale",
    features: [
      "Unlimited AI widgets",
      "Advanced analytics & reports",
      "Unlimited leads",
      "Creative Studio access",
      "Priority support",
      "5 website integrations",
      "A/B testing",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "/month",
    description: "For agencies and large operations",
    features: [
      "Everything in Pro",
      "Ads Manager (when launched)",
      "Custom integrations",
      "Dedicated account manager",
      "White-label options",
      "Unlimited websites",
      "API access",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export const Pricing = () => {
  const scrollToCTA = () => {
    document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
            Choose the plan that fits your business. Scale as you grow.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Early access members get their first month free!
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full z-10">
                  Most Popular
                </div>
              )}
              <div
                className={`glass rounded-2xl p-6 sm:p-8 h-full flex flex-col transition-all duration-300 ${
                  plan.popular
                    ? "border-primary/50 shadow-lg shadow-primary/10"
                    : "hover:border-primary/30"
                }`}
              >
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  size="lg"
                  className="w-full"
                  onClick={scrollToCTA}
                >
                  Start Free Trial
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          Pricing takes effect post-launch. Early access is completely free.
        </motion.p>
      </div>
    </section>
  );
};
