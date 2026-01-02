import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "When does AdAutomation launch?",
    answer: "We're targeting Q1 2026 for our public launch. Early access members will get exclusive beta access 4-6 weeks before the official launch, plus special founding member pricing.",
  },
  {
    question: "How do the AI-generated widgets work?",
    answer: "Our AI analyzes your business, services, and target audience to create custom widgets like cost estimators, appointment schedulers, and quote calculators. These widgets embed on your website with a simple code snippet and start capturing leads immediately.",
  },
  {
    question: "What kind of data do the widgets capture?",
    answer: "Widgets can capture emails, phone numbers, service preferences, project details, budget ranges, and custom fields you define. All data flows directly into your dashboard and can be integrated with your CRM.",
  },
  {
    question: "Do I need technical skills to use the platform?",
    answer: "Not at all! AdAutomation is built for busy business owners, not developers. Everything from widget creation to ad campaign management is done through our intuitive, no-code interface.",
  },
  {
    question: "How is my data secured?",
    answer: "We take security seriously. All data is encrypted in transit and at rest. We're SOC 2 compliant and follow industry best practices. Your leads and business data are never shared or sold.",
  },
  {
    question: "Can I integrate with my existing tools?",
    answer: "Yes! We integrate with popular CRMs like HubSpot, Salesforce, and Zoho, as well as ad platforms like Google Ads and Meta. More integrations are added regularly based on user requests.",
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "We offer a 30-day money-back guarantee after launch. During beta, everything is free so you can test without risk. We're confident you'll love the results.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="faq">
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
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-xl px-6 border-border/50 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary py-5 [&[data-state=open]>svg]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
