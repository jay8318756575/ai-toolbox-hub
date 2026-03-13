import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedTool {
  title: string;
  href: string;
}

export interface ToolContentSectionProps {
  title?: string;
  introContent?: string;
  featuresTitle?: string;
  features?: { title: string; description: string }[];
  whatIs?: { title: string; content: string };
  whyUse?: { title: string; points: string[] };
  howToUse?: { title: string; steps: string[] };
  useCases?: { title: string; cases: string[] };
  useCasesTitle?: string;
  useCasesList?: string[];
  tipsTitle?: string;
  tips?: string[];
  faqs?: FAQItem[];
  relatedTools?: RelatedTool[];
  ctaText?: string;
}

export function ToolContentSection({
  title, introContent, featuresTitle, features,
  whatIs, whyUse, howToUse, useCases,
  useCasesTitle, useCasesList, tipsTitle, tips,
  faqs = [], relatedTools = [],
  ctaText = 'Start Using This Tool Now - It\'s 100% Free!',
}: ToolContentSectionProps) {
  return (
    <div className="mt-16 space-y-12">
      {/* Title & Intro */}
      {title && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          {introContent && <div className="text-muted-foreground leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: introContent }} />}
        </section>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">{featuresTitle || 'Key Features'}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div><span className="font-medium">{f.title}</span><p className="text-sm text-muted-foreground mt-1">{f.description}</p></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What Is Section */}
      {whatIs && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{whatIs.title}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{whatIs.content}</p>
        </section>
      )}

      {/* Why Use Section */}
      {whyUse && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">{whyUse.title}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {whyUse.points.map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{point}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How To Use Section */}
      {howToUse && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">{howToUse.title}</h2>
          <div className="space-y-4">
            {howToUse.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{index + 1}</div>
                <p className="text-muted-foreground pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Use Cases Section */}
      {useCases && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Use Cases & Examples</h2>
          <Card className="p-6">
            <ul className="space-y-3">
              {useCases.cases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{useCase}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {/* Simple use cases list */}
      {useCasesList && useCasesList.length > 0 && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">{useCasesTitle || 'Use Cases'}</h2>
          <Card className="p-6">
            <ul className="space-y-3">
              {useCasesList.map((uc, i) => (
                <li key={i} className="flex items-start gap-3"><ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" /><span className="text-muted-foreground">{uc}</span></li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {/* Tips */}
      {tips && tips.length > 0 && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">{tipsTitle || 'Tips'}</h2>
          <div className="space-y-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <HelpCircle className="h-7 w-7 text-primary" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Related Tools You May Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool, index) => (
              <Link key={index} to={tool.href} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span className="font-medium">{tool.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="text-center py-8 px-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl">
        <h2 className="font-display text-2xl font-bold mb-4">{ctaText}</h2>
        <p className="text-muted-foreground mb-6">No registration required. No watermarks. Unlimited usage.</p>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
          Use Tool Now <ChevronRight className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}
