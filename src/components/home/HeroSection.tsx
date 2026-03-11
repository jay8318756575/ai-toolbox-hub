import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
            <Wrench className="h-4 w-4" />
            <span>30+ Free Online Tools - No Registration Required</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="gradient-text">SmartToolsHub</span>
            <br />
            Free Online Tools for Everyone
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Image Compressor, Calculators, SEO Tools, AI Writing और 30+ tools - 
            सब एक ही जगह। Fast, Free और Fully Functional!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button asChild size="lg" className="btn-gradient rounded-full px-8 h-12 text-base">
              <Link to="/tools">Explore All Tools<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base">
              <Link to="/tools/image-compressor">Try Image Compressor</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-1">
                <Zap className="h-5 w-5" />
                <span className="font-display text-2xl md:text-3xl font-bold">30+</span>
              </div>
              <p className="text-sm text-muted-foreground">Free Tools</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-accent mb-1">
                <Shield className="h-5 w-5" />
                <span className="font-display text-2xl md:text-3xl font-bold">100%</span>
              </div>
              <p className="text-sm text-muted-foreground">Secure & Private</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                <Wrench className="h-5 w-5" />
                <span className="font-display text-2xl md:text-3xl font-bold">Free</span>
              </div>
              <p className="text-sm text-muted-foreground">Forever</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
