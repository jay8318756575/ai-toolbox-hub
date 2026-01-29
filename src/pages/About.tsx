import { Layout } from '@/components/layout/Layout';
import { Sparkles, Users, Target, Heart } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">AI Tools Hub</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              हमारी कहानी और मिशन
            </p>
          </div>

          {/* Mission */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Target className="h-5 w-5" />
                </div>
                <h2 className="font-display text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                AI Tools Hub का मिशन है हर किसी को free, easy-to-use और 100% working AI tools provide करना। 
                हम believe करते हैं कि technology सबके लिए accessible होनी चाहिए।
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="font-display text-2xl font-bold">What We Offer</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                50+ free tools including SEO tools, Image converters, AI writing assistants, 
                House plan generators और much more। हर tool 100% functional है - no demos, no fakes।
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="font-display text-2xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">User First</h3>
                <p className="text-sm text-muted-foreground">
                  हर decision user experience को ध्यान में रखकर लिया जाता है
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  हर tool tested और production-ready है
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Free Forever</h3>
                <p className="text-sm text-muted-foreground">
                  Core tools हमेशा free रहेंगे
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Disclaimer</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              यह AI द्वारा बनाया गया conceptual house plan है। Final construction से पहले 
              architect या engineer से सलाह लें। AI-generated content को verify करें।
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
