import { 
  Zap, 
  Shield, 
  Globe, 
  Smartphone,
  Download,
  Clock
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    titleHi: 'बेहद तेज़',
    description: 'All tools work instantly - no waiting, no loading',
  },
  {
    icon: Shield,
    title: '100% Secure',
    titleHi: 'पूरी तरह सुरक्षित',
    description: 'Your data stays on your device - we don\'t store anything',
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    titleHi: 'हर जगह काम करे',
    description: 'Use on any device - desktop, mobile, tablet',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    titleHi: 'मोबाइल फ्रेंडली',
    description: 'Optimized for Android and iOS browsers',
  },
  {
    icon: Download,
    title: 'Download Results',
    titleHi: 'डाउनलोड करें',
    description: 'Download, copy, or print all outputs',
  },
  {
    icon: Clock,
    title: 'Always Available',
    titleHi: '24/7 उपलब्ध',
    description: 'No registration required - use anytime, anywhere',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why Choose AI Tools Hub?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            हमारे tools बाकियों से कैसे अलग हैं
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {feature.titleHi}
              </p>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
