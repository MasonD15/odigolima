import { motion } from "framer-motion";
import { 
  Puzzle, 
  Palette, 
  BarChart3, 
  Megaphone, 
  Settings2, 
  LayoutDashboard 
} from "lucide-react";

const features = [
  {
    icon: Puzzle,
    title: "Widget Factory",
    description: "AI builds custom lead-capturing widgets tailored to your business—cost estimators, calculators, and more. No coding required.",
    highlight: "Core USP",
  },
  {
    icon: Palette,
    title: "Creative Studio",
    description: "Generate compelling ad copy and visuals with AI. Create high-converting creatives in seconds, not hours.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track leads, conversions, and performance in one unified dashboard. Make data-driven decisions with ease.",
  },
  {
    icon: Megaphone,
    title: "Ads Manager",
    description: "Set up and manage ad campaigns across platforms. Automate bidding and targeting for optimal results.",
    comingSoon: true,
  },
  {
    icon: LayoutDashboard,
    title: "Widget Manager",
    description: "Edit, deploy, and track all your widgets from one place. Real-time updates and performance monitoring.",
  },
  {
    icon: Settings2,
    title: "Smart Integrations",
    description: "Connect to your favorite ad platforms, CRMs, and tools. Seamless data flow for complete automation.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="features">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
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
            Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Everything You Need to Automate Ads
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete toolkit for local service businesses to generate leads and grow.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden">
                {/* Badges */}
                {feature.highlight && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                    {feature.highlight}
                  </span>
                )}
                {feature.comingSoon && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                    Coming Soon
                  </span>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
