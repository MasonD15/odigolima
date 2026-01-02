import { motion } from "framer-motion";
import { UserPlus, Wand2, Code2, BarChart2, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Quick Onboarding",
    description: "Complete a simple 6-step wizard. We scrape your website to auto-fill business info—done in minutes.",
  },
  {
    icon: Wand2,
    title: "AI Generates Widgets",
    description: "Our AI creates custom lead-capture widgets like cost estimators and calculators tailored to your services.",
  },
  {
    icon: Code2,
    title: "Deploy Instantly",
    description: "Get an embed code and add your widgets to any website. No coding skills required.",
  },
  {
    icon: BarChart2,
    title: "Automate & Track",
    description: "Widgets capture leads while our analytics dashboard tracks conversions and performance in real-time.",
  },
  {
    icon: Rocket,
    title: "Optimize & Scale",
    description: "Use data-driven insights to optimize campaigns and scale your lead generation effortlessly.",
  },
];

export const Process = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="process">
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
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            From Signup to Success in 5 Steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get started in minutes and watch your lead generation transform.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden sm:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Step Number & Icon */}
              <div className="flex-shrink-0 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 pt-2 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                <h3 className="font-display text-xl font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
