import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Process } from "@/components/Process";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>AdAutomation - AI-Powered Ad Automation for Local Service Businesses</title>
        <meta
          name="description"
          content="Revolutionize your local service business with AI-powered ad automation. Generate leads with custom widgets, smart ads, and data-driven insights. Join the early access waitlist today."
        />
        <meta
          name="keywords"
          content="ad automation, local service business, AI marketing, lead generation, HVAC marketing, plumber marketing, landscaping ads"
        />
        <meta property="og:title" content="AdAutomation - AI-Powered Ad Automation" />
        <meta
          property="og:description"
          content="Get agency-level marketing without the hassle. Custom widgets, smart ads, and data-driven leads for local service businesses."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://adautomation.io" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Benefits />
        <Process />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
