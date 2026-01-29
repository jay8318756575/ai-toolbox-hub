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
import NotFound from "./pages/NotFound";

// Tools
import QRGenerator from "./pages/tools/QRGenerator";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import ImageConverter from "./pages/tools/ImageConverter";
import MetaGenerator from "./pages/tools/MetaGenerator";
import JSONFormatter from "./pages/tools/JSONFormatter";
import UnitConverter from "./pages/tools/UnitConverter";

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
          
          {/* Working Tools */}
          <Route path="/tools/qr-generator" element={<QRGenerator />} />
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/tools/image-converter" element={<ImageConverter />} />
          <Route path="/tools/meta-generator" element={<MetaGenerator />} />
          <Route path="/tools/json-formatter" element={<JSONFormatter />} />
          <Route path="/tools/unit-converter" element={<UnitConverter />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
