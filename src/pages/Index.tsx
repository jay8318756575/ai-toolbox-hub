import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ToolCategories } from '@/components/home/ToolCategories';
import { PopularTools } from '@/components/home/PopularTools';
import { FeaturesSection } from '@/components/home/FeaturesSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ToolCategories />
      <PopularTools />
      <FeaturesSection />
    </Layout>
  );
};

export default Index;
