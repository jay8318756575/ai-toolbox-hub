import { Link } from 'react-router-dom';
import { 
  Search, 
  ImageIcon, 
  Palette, 
  PenTool, 
  Settings,
  ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 'seo',
    title: 'SEO Tools',
    titleHi: 'एसईओ टूल्स',
    description: 'Keyword Research, Meta Tags, Backlink Checker और more',
    icon: Search,
    color: 'category-seo',
    href: '/tools/seo',
    toolCount: 8,
  },
  {
    id: 'converters',
    title: 'Converters',
    titleHi: 'कन्वर्टर्स',
    description: 'Image, PDF, Video conversion - Fast & Free',
    icon: ImageIcon,
    color: 'category-converter',
    href: '/tools/converters',
    toolCount: 6,
  },
  {
    id: 'design',
    title: 'Design Tools',
    titleHi: 'डिज़ाइन टूल्स',
    description: 'House Plan Generator, Logo Maker और Graphics',
    icon: Palette,
    color: 'category-design',
    href: '/tools/design',
    toolCount: 4,
  },
  {
    id: 'writing',
    title: 'AI Writing',
    titleHi: 'AI राइटिंग',
    description: 'Content Writer, Paraphraser, Grammar Check',
    icon: PenTool,
    color: 'category-writing',
    href: '/tools/writing',
    toolCount: 6,
  },
  {
    id: 'utility',
    title: 'Utility Tools',
    titleHi: 'यूटिलिटी टूल्स',
    description: 'QR Code, Password Generator, Calculators',
    icon: Settings,
    color: 'category-utility',
    href: '/tools/utility',
    toolCount: 8,
  },
];

export function ToolCategories() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Tool Categories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose a category and start using 100% working tools instantly
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={category.href}
              className={cn(
                "tool-card group relative overflow-hidden",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                  category.color
                )}>
                  <category.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {category.titleHi}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {category.toolCount} Tools
                </span>
                <span className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
