import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ToolPageSEO } from '@/components/seo/ToolPageSEO';
import { ToolContentSection } from '@/components/seo/ToolContentSection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, Calculator } from 'lucide-react';

type ConversionCategory = 'length' | 'weight' | 'temperature' | 'area' | 'volume';

const conversions: Record<ConversionCategory, Record<string, number>> = {
  length: {
    'Meter (m)': 1,
    'Kilometer (km)': 0.001,
    'Centimeter (cm)': 100,
    'Millimeter (mm)': 1000,
    'Mile': 0.000621371,
    'Yard': 1.09361,
    'Foot (ft)': 3.28084,
    'Inch': 39.3701,
  },
  weight: {
    'Kilogram (kg)': 1,
    'Gram (g)': 1000,
    'Milligram (mg)': 1000000,
    'Pound (lb)': 2.20462,
    'Ounce (oz)': 35.274,
    'Ton': 0.001,
  },
  temperature: {
    'Celsius (°C)': 1,
    'Fahrenheit (°F)': 1,
    'Kelvin (K)': 1,
  },
  area: {
    'Square Meter (m²)': 1,
    'Square Kilometer (km²)': 0.000001,
    'Square Foot (ft²)': 10.7639,
    'Square Yard': 1.19599,
    'Acre': 0.000247105,
    'Hectare': 0.0001,
  },
  volume: {
    'Liter (L)': 1,
    'Milliliter (mL)': 1000,
    'Cubic Meter (m³)': 0.001,
    'Gallon (US)': 0.264172,
    'Gallon (UK)': 0.219969,
    'Cup': 4.22675,
  },
};

const seoData = {
  title: 'Unit Converter Online Free - Length, Weight, Temperature',
  titleHi: 'यूनिट कन्वर्टर ऑनलाइन फ्री',
  description: 'Free Unit Converter - Convert length, weight, temperature, area, volume instantly. Meters to feet, kg to pounds, Celsius to Fahrenheit. Accurate calculations.',
  descriptionHi: 'मुफ्त यूनिट कन्वर्टर - Length, weight, temperature, area, volume instantly convert करें। Accurate calculations।',
  keywords: [
    'unit converter',
    'unit converter online free',
    'meter to feet converter',
    'kg to pounds',
    'celsius to fahrenheit',
    'यूनिट कन्वर्टर',
    'length converter',
    'weight converter',
    'temperature converter',
    'area converter',
    'volume converter',
    'measurement converter',
    'metric to imperial',
  ],
  canonicalUrl: '/tools/unit-converter',
  toolName: 'Unit Converter',
  category: 'Utility Tool',
  faqs: [
    {
      question: 'Metric और Imperial system में क्या difference है?',
      answer: 'Metric system (meters, kilograms, liters) internationally use होता है और 10 के multiples पर based है। Imperial system (feet, pounds, gallons) primarily USA में use होता है और historical units पर based है।',
    },
    {
      question: '1 Meter में कितने Feet होते हैं?',
      answer: '1 Meter = 3.28084 Feet। Reverse में, 1 Foot = 0.3048 Meters। हमारा converter automatically accurate conversion करता है।',
    },
    {
      question: '1 Kilogram में कितने Pounds होते हैं?',
      answer: '1 Kilogram = 2.20462 Pounds। यह conversion weight training, cooking recipes, और shipping calculations में commonly use होता है।',
    },
    {
      question: 'Celsius को Fahrenheit में कैसे convert करें?',
      answer: 'Formula है: °F = (°C × 9/5) + 32। उदाहरण: 25°C = (25 × 9/5) + 32 = 77°F। हमारा tool automatically calculate करता है।',
    },
    {
      question: '1 Acre में कितने Square Feet होते हैं?',
      answer: '1 Acre = 43,560 Square Feet या approximately 4,047 Square Meters। Land measurement में यह unit commonly use होता है।',
    },
    {
      question: '1 Gallon में कितने Liters होते हैं?',
      answer: 'US Gallon = 3.785 Liters। UK (Imperial) Gallon = 4.546 Liters। हमारा tool दोनों types support करता है।',
    },
  ],
  howToSteps: [
    'Category choose करें - Length, Weight, Temperature, Area, या Volume',
    'From unit dropdown से source unit select करें',
    'Value enter करें जो convert करना है',
    'To unit dropdown से target unit select करें',
    'Result automatically calculate होकर दिखेगा',
    'Swap button से units interchange कर सकते हैं',
  ],
};

const contentData = {
  whatIs: {
    title: 'Unit Converter क्या है?',
    content: `Unit Converter एक free online tool है जो different measurement units के बीच instant conversion करता है। Length, Weight, Temperature, Area, और Volume - सभी common conversions एक जगह।

    Daily life में हमें अक्सर units convert करने की जरूरत पड़ती है - cooking recipes में cups से ml, fitness में pounds से kg, या travel में miles से km। यह tool mathematically accurate conversions provide करता है बिना किसी complex formula याद करे।

    Real-time calculation के साथ, जैसे ही आप value enter करते हैं result instantly दिखता है। Quick reference tables भी available हैं common conversions के लिए।`,
  },
  whyUse: {
    title: 'हमारा Unit Converter क्यों use करें?',
    points: [
      'Multiple Categories - Length, Weight, Temperature, Area, Volume सब एक tool में',
      'Instant Calculation - Real-time results, no button click needed',
      'Accurate Results - Mathematically precise conversions',
      'Swap Function - One-click में units interchange करें',
      'Quick Reference - Common conversions readily available',
      'Mobile Friendly - Phone पर भी perfectly काम करता है',
      'No Registration - Instantly use करें, forever free',
      'Clean Interface - Simple और easy to use design',
    ],
  },
  howToUse: {
    title: 'Units Convert कैसे करें',
    steps: [
      'सबसे पहले category tabs से appropriate category select करें: Length (distance), Weight (mass), Temperature, Area (surface), या Volume (capacity)',
      'From section में value input करें जो आप convert करना चाहते हैं। Numbers और decimals दोनों supported हैं।',
      'From dropdown से source unit select करें - वह unit जिसमें आपकी value है',
      'To dropdown से target unit select करें - वह unit जिसमें convert करना है',
      'Result automatically calculate होकर To field में दिखेगा। No button click needed!',
      'Swap button (↕️ icon) से quickly From और To units interchange कर सकते हैं',
      'Formula display देखें जो shows करता है कि exactly क्या conversion हुआ है',
      'Quick Reference section में common conversions देखें additional information के लिए',
    ],
  },
  useCases: {
    title: 'Use Cases & Examples',
    cases: [
      'Cooking - Cups से ml, ounces से grams convert करें recipes के लिए',
      'Fitness - Pounds से kg convert करें weight tracking के लिए',
      'Travel - Miles से km, gallons से liters convert करें',
      'Construction - Feet से meters, square feet से square meters',
      'Science - Temperature conversions (Celsius, Fahrenheit, Kelvin)',
      'Shopping - Product weights और volumes compare करें',
      'Real Estate - Acres से square feet/meters convert करें land measurements के लिए',
      'Shipping - Package dimensions और weights convert करें international shipping के लिए',
      'Education - Students के लिए unit conversion practice',
      'Healthcare - Medical measurements convert करें (doses, body weight)',
    ],
  },
  faqs: seoData.faqs,
  relatedTools: [
    { title: 'JSON Formatter', href: '/tools/json-formatter' },
    { title: 'Password Generator', href: '/tools/password-generator' },
    { title: 'QR Code Generator', href: '/tools/qr-generator' },
    { title: 'Meta Tag Generator', href: '/tools/meta-generator' },
    { title: 'Image Converter', href: '/tools/image-converter' },
  ],
};

export default function UnitConverter() {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [fromUnit, setFromUnit] = useState('Meter (m)');
  const [toUnit, setToUnit] = useState('Foot (ft)');
  const [inputValue, setInputValue] = useState('1');

  const units = useMemo(() => Object.keys(conversions[category]), [category]);

  const result = useMemo(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return '';

    if (category === 'temperature') {
      let celsius: number;
      
      if (fromUnit.includes('Celsius')) {
        celsius = value;
      } else if (fromUnit.includes('Fahrenheit')) {
        celsius = (value - 32) * 5/9;
      } else {
        celsius = value - 273.15;
      }

      if (toUnit.includes('Celsius')) {
        return celsius.toFixed(2);
      } else if (toUnit.includes('Fahrenheit')) {
        return ((celsius * 9/5) + 32).toFixed(2);
      } else {
        return (celsius + 273.15).toFixed(2);
      }
    }

    const fromFactor = conversions[category][fromUnit];
    const toFactor = conversions[category][toUnit];
    const baseValue = value / fromFactor;
    const converted = baseValue * toFactor;
    
    return converted.toLocaleString('en-US', { 
      maximumFractionDigits: 6,
      minimumFractionDigits: 0
    });
  }, [inputValue, fromUnit, toUnit, category]);

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCategoryChange = (newCategory: ConversionCategory) => {
    setCategory(newCategory);
    const newUnits = Object.keys(conversions[newCategory]);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1]);
  };

  return (
    <Layout>
      <ToolPageSEO {...seoData} />
      
      <div className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Unit Converter' },
          ]} />

          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-utility/10 text-utility text-sm mb-4">
              <Calculator className="h-4 w-4" />
              <span>Utility Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Unit Converter Online Free
            </h1>
            <p className="text-muted-foreground text-lg">
              Length, Weight, Temperature, Area, Volume - Instant conversion
            </p>
          </header>

          {/* Category Tabs */}
          <Tabs value={category} onValueChange={(v) => handleCategoryChange(v as ConversionCategory)} className="mb-6">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="length" className="text-xs">Length</TabsTrigger>
              <TabsTrigger value="weight" className="text-xs">Weight</TabsTrigger>
              <TabsTrigger value="temperature" className="text-xs">Temp</TabsTrigger>
              <TabsTrigger value="area" className="text-xs">Area</TabsTrigger>
              <TabsTrigger value="volume" className="text-xs">Volume</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Converter Card */}
          <Card className="p-6">
            <div className="space-y-6">
              {/* From */}
              <div>
                <label className="text-sm font-medium mb-2 block">From</label>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 text-lg h-12"
                    placeholder="Enter value"
                  />
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger className="w-48 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={swapUnits}
                  className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  <ArrowRightLeft className="h-5 w-5 text-muted-foreground rotate-90" />
                </button>
              </div>

              {/* To */}
              <div>
                <label className="text-sm font-medium mb-2 block">To</label>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    value={result}
                    readOnly
                    className="flex-1 text-lg h-12 bg-muted/50 font-semibold"
                    placeholder="Result"
                  />
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger className="w-48 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Formula Display */}
            {result && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg text-center">
                <p className="text-lg">
                  <span className="font-semibold">{inputValue}</span> {fromUnit}
                  <span className="mx-2">=</span>
                  <span className="font-semibold text-primary">{result}</span> {toUnit}
                </p>
              </div>
            )}
          </Card>

          {/* Quick Reference */}
          <Card className="mt-6 p-6">
            <h3 className="font-semibold mb-4">Quick Reference - {category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {category === 'length' && (
                <>
                  <div className="text-muted-foreground">1 km = 1000 m</div>
                  <div className="text-muted-foreground">1 mile = 1.609 km</div>
                  <div className="text-muted-foreground">1 foot = 30.48 cm</div>
                  <div className="text-muted-foreground">1 inch = 2.54 cm</div>
                </>
              )}
              {category === 'weight' && (
                <>
                  <div className="text-muted-foreground">1 kg = 1000 g</div>
                  <div className="text-muted-foreground">1 kg = 2.205 lb</div>
                  <div className="text-muted-foreground">1 lb = 16 oz</div>
                  <div className="text-muted-foreground">1 ton = 1000 kg</div>
                </>
              )}
              {category === 'temperature' && (
                <>
                  <div className="text-muted-foreground">0°C = 32°F = 273.15K</div>
                  <div className="text-muted-foreground">100°C = 212°F</div>
                  <div className="text-muted-foreground">°F = (°C × 9/5) + 32</div>
                  <div className="text-muted-foreground">K = °C + 273.15</div>
                </>
              )}
              {category === 'area' && (
                <>
                  <div className="text-muted-foreground">1 km² = 1,000,000 m²</div>
                  <div className="text-muted-foreground">1 hectare = 10,000 m²</div>
                  <div className="text-muted-foreground">1 acre = 4,047 m²</div>
                  <div className="text-muted-foreground">1 m² = 10.76 ft²</div>
                </>
              )}
              {category === 'volume' && (
                <>
                  <div className="text-muted-foreground">1 L = 1000 mL</div>
                  <div className="text-muted-foreground">1 gallon (US) = 3.785 L</div>
                  <div className="text-muted-foreground">1 m³ = 1000 L</div>
                  <div className="text-muted-foreground">1 cup = 236.6 mL</div>
                </>
              )}
            </div>
          </Card>

          {/* SEO Content Sections */}
          <ToolContentSection {...contentData} />
        </div>
      </div>
    </Layout>
  );
}
