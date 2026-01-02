import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { toast } from "sonner";

export const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast.success("You're on the list! We'll notify you when we launch.");
    setEmail("");
  };

  return (
    <section className="py-24 relative overflow-hidden" id="cta">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Limited spots available
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient">Automate</span> Your Ads?
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join the waitlist for early access. Be the first to get agency-level 
            marketing tools simplified for your local service business.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary"
            />
            <Button
              type="submit"
              variant="hero"
              size="lg"
              disabled={isSubmitting}
              className="min-w-[160px]"
            >
              {isSubmitting ? (
                "Joining..."
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              No spam, ever
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Launch Q1 2026
            </span>
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Early access benefits
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
