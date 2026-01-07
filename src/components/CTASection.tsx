import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useUtmParams } from "@/hooks/useUtmParams";

export const CTASection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const utmParams = useUtmParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!trimmedName) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!trimmedEmail) {
      toast.error("Please enter your email address");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    // Save to local waitlist
    const { error } = await supabase.from("waitlist_signups").insert({
      email: trimmedEmail,
      referral_url: utmParams.referralUrl,
      utm_source: utmParams.utmSource,
      utm_medium: utmParams.utmMedium,
      utm_campaign: utmParams.utmCampaign,
      utm_term: utmParams.utmTerm,
      utm_content: utmParams.utmContent,
    });

    if (error) {
      setIsSubmitting(false);
      if (error.code === "23505") {
        toast.error("This email is already on the waitlist!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      return;
    }

    // Call external signup API
    try {
      const { error: fnError } = await supabase.functions.invoke("external-signup", {
        body: { name: trimmedName, email: trimmedEmail, plan: "free" },
      });
      if (fnError) {
        console.error("External signup error:", fnError);
      }
    } catch (err) {
      console.error("Failed to call external signup:", err);
    }

    setIsSubmitting(false);
    toast.success("You're on the list! We'll notify you when we launch.");
    setName("");
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
            className="flex flex-col gap-3 max-w-md mx-auto mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <Button
              type="submit"
              variant="hero"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
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
