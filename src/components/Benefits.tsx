import { motion } from "framer-motion";
import { TrendingUp, Zap, BarChart3, DollarSign } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Consistent, Quality Leads",
    problem: "Tired of inconsistent leads and wasted ad spend?",
    solution: "Our AI widgets capture high-quality leads effortlessly, ensuring a steady pipeline for your business.",
  },
  {
    icon: Zap,
    title: "No Tech Skills Needed",
    problem: "No technical expertise? No problem.",
    solution: "Automate complex marketing activities in minutes with our intuitive, zero-code widget builder.",
  },
  {
    icon: BarChart3,
    title: "Bridge Data Gaps",
    problem: "Frustrated by poor data between you and agencies?",
    solution: "Close the data gap to supercharge AI ad buying and consistently outperform your competitors.",
  },
  {
    icon: DollarSign,
    title: "Agency Results, Any Budget",
    problem: "Can't afford agency fees?",
    solution: "Get agency-level marketing performance at a fraction of the cost, designed for local service businesses.",
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

export const Benefits = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="benefits">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
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
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Built for Local Service Businesses
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We understand the unique challenges you face. Our platform is designed to solve them.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="glass rounded-2xl p-6 sm:p-8 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {benefit.problem}
                </p>
                <p className="text-foreground/90">
                  {benefit.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
