import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllTools from "./pages/AllTools";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Image Tools
import ImageConverter from "./pages/tools/ImageConverter";
import ImageCompressor from "./pages/tools/ImageCompressor";
import ImageResizer from "./pages/tools/ImageResizer";
import JPGtoPNG from "./pages/tools/JPGtoPNG";
import PNGtoJPG from "./pages/tools/PNGtoJPG";

// Calculator Tools
import AgeCalculator from "./pages/tools/AgeCalculator";
import EMICalculator from "./pages/tools/EMICalculator";
import PercentageCalculator from "./pages/tools/PercentageCalculator";
import GSTCalculator from "./pages/tools/GSTCalculator";
import BMICalculator from "./pages/tools/BMICalculator";

// Text Tools
import WordCounter from "./pages/tools/WordCounter";
import CaseConverter from "./pages/tools/CaseConverter";

// SEO Tools
import MetaGenerator from "./pages/tools/MetaGenerator";
import KeywordDensity from "./pages/tools/KeywordDensity";
import RobotsGenerator from "./pages/tools/RobotsGenerator";
import SitemapGenerator from "./pages/tools/SitemapGenerator";
import KeywordResearch from "./pages/tools/KeywordResearch";
import PageSpeedAnalyzer from "./pages/tools/PageSpeedAnalyzer";
import BacklinkChecker from "./pages/tools/BacklinkChecker";

// Utility Tools
import QRGenerator from "./pages/tools/QRGenerator";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import JSONFormatter from "./pages/tools/JSONFormatter";
import UnitConverter from "./pages/tools/UnitConverter";
import HashGenerator from "./pages/tools/HashGenerator";
import URLEncoder from "./pages/tools/URLEncoder";
import YouTubeThumbnail from "./pages/tools/YouTubeThumbnail";

// AI Tools
import AIContentWriter from "./pages/tools/AIContentWriter";
import AIParaphraser from "./pages/tools/AIParaphraser";
import AIChatbot from "./pages/tools/AIChatbot";
import AISummarizer from "./pages/tools/AISummarizer";
import AITranslator from "./pages/tools/AITranslator";
import GrammarChecker from "./pages/tools/GrammarChecker";
import PlagiarismChecker from "./pages/tools/PlagiarismChecker";
import HousePlanner from "./pages/tools/HousePlanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<AllTools />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Image Tools */}
          <Route path="/tools/image-converter" element={<ImageConverter />} />
          <Route path="/tools/image-compressor" element={<ImageCompressor />} />
          <Route path="/tools/image-resizer" element={<ImageResizer />} />
          <Route path="/tools/jpg-to-png" element={<JPGtoPNG />} />
          <Route path="/tools/png-to-jpg" element={<PNGtoJPG />} />
          
          {/* Calculator Tools */}
          <Route path="/tools/age-calculator" element={<AgeCalculator />} />
          <Route path="/tools/emi-calculator" element={<EMICalculator />} />
          <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/tools/gst-calculator" element={<GSTCalculator />} />
          <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
          
          {/* Text Tools */}
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/case-converter" element={<CaseConverter />} />
          
          {/* SEO Tools */}
          <Route path="/tools/meta-generator" element={<MetaGenerator />} />
          <Route path="/tools/keyword-density" element={<KeywordDensity />} />
          <Route path="/tools/robots-generator" element={<RobotsGenerator />} />
          <Route path="/tools/sitemap-generator" element={<SitemapGenerator />} />
          <Route path="/tools/keyword-research" element={<KeywordResearch />} />
          <Route path="/tools/page-speed" element={<PageSpeedAnalyzer />} />
          <Route path="/tools/backlink-checker" element={<BacklinkChecker />} />
          
          {/* Utility Tools */}
          <Route path="/tools/qr-generator" element={<QRGenerator />} />
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/tools/json-formatter" element={<JSONFormatter />} />
          <Route path="/tools/unit-converter" element={<UnitConverter />} />
          <Route path="/tools/hash-generator" element={<HashGenerator />} />
          <Route path="/tools/url-encoder" element={<URLEncoder />} />
          <Route path="/tools/youtube-thumbnail" element={<YouTubeThumbnail />} />
          
          {/* AI Tools */}
          <Route path="/tools/ai-content-writer" element={<AIContentWriter />} />
          <Route path="/tools/ai-paraphraser" element={<AIParaphraser />} />
          <Route path="/tools/ai-chatbot" element={<AIChatbot />} />
          <Route path="/tools/ai-summarizer" element={<AISummarizer />} />
          <Route path="/tools/ai-translator" element={<AITranslator />} />
          <Route path="/tools/grammar-checker" element={<GrammarChecker />} />
          <Route path="/tools/plagiarism-checker" element={<PlagiarismChecker />} />
          <Route path="/tools/house-planner" element={<HousePlanner />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
