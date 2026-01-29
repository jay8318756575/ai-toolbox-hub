import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
      // Special handling for temperature
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

    // Standard conversion
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
      <div className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-utility/10 text-utility text-sm mb-4">
              <Calculator className="h-4 w-4" />
              <span>Utility Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Unit Converter
            </h1>
            <p className="text-muted-foreground">
              Length, Weight, Temperature, Area, Volume - Instant conversion
            </p>
          </div>

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
        </div>
      </div>
    </Layout>
  );
}
