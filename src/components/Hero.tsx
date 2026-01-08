import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useUtmParams } from "@/hooks/useUtmParams";
import heroDashboard from "@/assets/hero-dashboard.png";

export const Hero = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const utmParams = useUtmParams();

  const handleInitialSubmit = (e: React.FormEvent) => {
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

    setIsDialogOpen(true);
  };

  const handleInviteCodeSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedInviteCode = inviteCode.trim();

    if (!trimmedInviteCode) {
      toast.error("Please enter your invite code");
      return;
    }

    setIsSubmitting(true);

    // Call external signup API with invite code verification
    try {
      const { data, error: fnError } = await supabase.functions.invoke("external-signup", {
        body: { name: trimmedName, email: trimmedEmail, inviteCode: trimmedInviteCode, plan: "free" },
      });
      
      if (fnError) {
        console.error("External signup error:", fnError);
        toast.error("Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      if (data?.error) {
        if (data.error === "Invalid invite code") {
          toast.error("Invalid invite code. Please check and try again.");
        } else {
          toast.error(data.error);
        }
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.error("Failed to call external signup:", err);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
      return;
    }
    
    // Save to local waitlist after successful invite code verification
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

    setIsSubmitting(false);
    setIsDialogOpen(false);
    setIsSuccess(true);
    setName("");
    setEmail("");
    setInviteCode("");
  };

  // Success state - Thank you message
  if (isSuccess) {
    return (
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(140_25%_12%)_0%,_hsl(140_30%_5%)_70%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-8"
            >
              <Check className="w-10 h-10 text-primary" />
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Thank You!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-4">
              You're on the list! 🎉
            </p>
            
            <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
              Check your email for a confirmation and next steps. We'll notify you when it's your turn to access the beta.
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">
                Early access coming Q1 2026
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(140_25%_12%)_0%,_hsl(140_30%_5%)_70%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Limited Early Access — Only 500 Spots
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Revolutionize Your Local Business with{" "}
            <span className="text-gradient">AI-Powered</span> Ad Automation
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Get agency-level marketing without the hassle—custom widgets, smart ads, 
            and data-driven leads. Sign up for early access and be first in line.
          </motion.p>

          {/* Signup Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleInitialSubmit}
            className="flex flex-col gap-3 max-w-md mx-auto mb-6"
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
              className="w-full sm:w-auto sm:mx-auto sm:min-w-[200px]"
            >
              Get Free Beta Access
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.form>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-12"
          >
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-primary" />
              Free during beta
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-primary" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-primary" />
              Cancel anytime
            </span>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="relative rounded-xl overflow-hidden glass border border-border/30 shadow-2xl">
              <img
                src={heroDashboard}
                alt="Lima Dashboard - Track leads, manage widgets, and automate your advertising"
                className="w-full h-auto"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[80px] rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Invite Code Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Your Invite Code</DialogTitle>
            <DialogDescription>
              Please enter your invite code to complete your free beta signup.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Input
              type="text"
              placeholder="Invite code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="h-12"
            />
            <Button
              onClick={handleInviteCodeSubmit}
              variant="hero"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Verifying..." : "Submit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
