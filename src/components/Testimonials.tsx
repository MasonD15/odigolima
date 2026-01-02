import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mike Johnson",
    role: "Owner, Johnson Plumbing",
    content: "Transformed my lead generation overnight! The AI widgets capture exactly the right customers for my plumbing business. Best investment I've made.",
    rating: 5,
    avatar: "MJ",
  },
  {
    name: "Sarah Chen",
    role: "Founder, GreenScape Landscaping",
    content: "Finally, a marketing tool that understands local service businesses. The cost estimator widget alone has brought in 40+ qualified leads this month.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "David Rodriguez",
    role: "CEO, CoolBreeze HVAC",
    content: "We were spending $3,000/month on an agency. Now we get better results for a fraction of the cost. The automation is truly game-changing.",
    rating: 5,
    avatar: "DR",
  },
  {
    name: "Emily Thompson",
    role: "Marketing Manager, Elite Electrical",
    content: "The analytics dashboard gives us insights we never had before. We can actually see which ads work and why. Highly recommend!",
    rating: 5,
    avatar: "ET",
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

export const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="testimonials">
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
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            What Our Beta Users Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real results from real local service businesses.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="glass rounded-2xl p-6 sm:p-8 h-full transition-all duration-300 hover:border-primary/30 relative">
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground/90 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
