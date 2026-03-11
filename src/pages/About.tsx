import { Layout } from '@/components/layout/Layout';
import { Wrench, Users, Target, Heart } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About <span className="gradient-text">SmartToolsHub</span></h1>
            <p className="text-muted-foreground text-lg">हमारी कहानी और मिशन</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Target className="h-5 w-5" /></div>
                <h2 className="font-display text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">SmartToolsHub का मिशन है हर किसी को free, easy-to-use और 100% working online tools provide करना। हम believe करते हैं कि technology सबके लिए accessible होनी चाहिए।</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center"><Wrench className="h-5 w-5" /></div>
                <h2 className="font-display text-2xl font-bold">What We Offer</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">30+ free tools including Image tools, Calculators, SEO tools, AI writing assistants और much more। हर tool 100% functional है - no demos, no fakes।</p>
            </div>
          </div>
          <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="font-display text-2xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4"><Users className="h-6 w-6" /></div>
                <h3 className="font-semibold mb-2">User First</h3>
                <p className="text-sm text-muted-foreground">हर decision user experience को ध्यान में रखकर लिया जाता है</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4"><Target className="h-6 w-6" /></div>
                <h3 className="font-semibold mb-2">Quality</h3>
                <p className="text-sm text-muted-foreground">हर tool tested और production-ready है</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4"><Heart className="h-6 w-6" /></div>
                <h3 className="font-semibold mb-2">Free Forever</h3>
                <p className="text-sm text-muted-foreground">Core tools हमेशा free रहेंगे</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
