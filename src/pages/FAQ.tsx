import { Layout } from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "क्या सभी tools free हैं?",
    questionEn: "Are all tools free?",
    answer: "हाँ! AI Tools Hub के सभी tools 100% free हैं। कोई hidden charges नहीं है।"
  },
  {
    question: "क्या मुझे account बनाना होगा?",
    questionEn: "Do I need to create an account?",
    answer: "नहीं! ज़्यादातर tools बिना registration के use किए जा सकते हैं। बस tool खोलो और use करो।"
  },
  {
    question: "क्या मेरा data safe है?",
    questionEn: "Is my data safe?",
    answer: "बिल्कुल! ज़्यादातर tools आपके browser में locally process होते हैं। हम आपकी files store नहीं करते।"
  },
  {
    question: "AI tools कैसे काम करते हैं?",
    questionEn: "How do AI tools work?",
    answer: "हमारे AI tools advanced language models use करते हैं जो आपके input को समझकर relevant output generate करते हैं।"
  },
  {
    question: "House Plan AI से बना design use कर सकते हैं?",
    questionEn: "Can I use the House Plan AI design?",
    answer: "हाँ, लेकिन ध्यान दें - ये conceptual plans हैं। Actual construction से पहले licensed architect या engineer से consult ज़रूर करें।"
  },
  {
    question: "Mobile पर काम करता है?",
    questionEn: "Does it work on mobile?",
    answer: "हाँ! सभी tools mobile-optimized हैं। Android और iOS दोनों browsers पर perfectly काम करते हैं।"
  },
  {
    question: "Download किए गए files का format क्या होता है?",
    questionEn: "What format are downloaded files?",
    answer: "Different tools different formats support करते हैं - PNG, JPG, PDF, TXT आदि। हर tool पर options दिए हैं।"
  },
  {
    question: "कोई problem हो तो कहाँ contact करें?",
    questionEn: "Who to contact if there's a problem?",
    answer: "आप हमें Contact page से message भेज सकते हैं या support@aitoolshub.com पर email कर सकते हैं।"
  },
];

export default function FAQ() {
  return (
    <Layout>
      <div className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              अक्सर पूछे जाने वाले सवाल
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border rounded-xl px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <div>
                    <p className="font-medium">{faq.question}</p>
                    <p className="text-sm text-muted-foreground">{faq.questionEn}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still have questions */}
          <div className="mt-12 text-center bg-muted/30 rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              अगर आपका सवाल यहाँ नहीं है, तो हमें contact करें!
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-2 rounded-full btn-gradient text-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
