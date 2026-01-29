import { useState, useCallback } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Key, Copy, RefreshCw, CheckCircle, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PasswordGenerator() {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([16]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let result = '';
    const array = new Uint32Array(length[0]);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length[0]; i++) {
      result += chars[array[i] % chars.length];
    }
    
    setPassword(result);
    setCopied(false);
  }, [length, options, toast]);

  const copyPassword = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: "Copied! ✓",
        description: "Password copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive",
      });
    }
  };

  const getStrength = () => {
    if (!password) return { level: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    if (score <= 2) return { level: score, label: 'Weak', color: 'text-destructive' };
    if (score <= 3) return { level: score, label: 'Medium', color: 'text-yellow-500' };
    if (score <= 4) return { level: score, label: 'Strong', color: 'text-accent' };
    return { level: score, label: 'Very Strong', color: 'text-green-500' };
  };

  const strength = getStrength();

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Password Generator
            </h1>
            <p className="text-muted-foreground">
              Strong, secure passwords - एक click में
            </p>
          </div>

          {/* Password Display */}
          <Card className="p-6 mb-6">
            <div className="relative">
              <Input
                type="text"
                value={password}
                readOnly
                placeholder="Click 'Generate' to create password"
                className="pr-24 h-14 text-lg font-mono bg-muted/50"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={copyPassword}
                  disabled={!password}
                  className="h-10 w-10"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={generatePassword}
                  className="h-10 w-10"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Strength Indicator */}
            {password && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Password Strength</span>
                  <span className={`text-sm font-medium ${strength.color}`}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      strength.level <= 2 ? 'bg-destructive' :
                      strength.level <= 3 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${(strength.level / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Options */}
          <Card className="p-6 mb-6">
            <h3 className="font-semibold mb-6">Customize Password</h3>
            
            {/* Length Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <Label>Password Length</Label>
                <span className="text-2xl font-bold text-primary">{length[0]}</span>
              </div>
              <Slider
                value={length}
                onValueChange={setLength}
                min={8}
                max={64}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            {/* Character Types */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg">ABC</span>
                  <span className="text-sm text-muted-foreground">Uppercase Letters</span>
                </div>
                <Switch
                  checked={options.uppercase}
                  onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg">abc</span>
                  <span className="text-sm text-muted-foreground">Lowercase Letters</span>
                </div>
                <Switch
                  checked={options.lowercase}
                  onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg">123</span>
                  <span className="text-sm text-muted-foreground">Numbers</span>
                </div>
                <Switch
                  checked={options.numbers}
                  onCheckedChange={(checked) => setOptions({ ...options, numbers: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg">!@#</span>
                  <span className="text-sm text-muted-foreground">Special Characters</span>
                </div>
                <Switch
                  checked={options.symbols}
                  onCheckedChange={(checked) => setOptions({ ...options, symbols: checked })}
                />
              </div>
            </div>
          </Card>

          {/* Generate Button */}
          <Button 
            onClick={generatePassword} 
            className="w-full btn-gradient h-14 text-lg"
          >
            <Key className="h-5 w-5 mr-2" />
            Generate Password
          </Button>

          {/* Info */}
          <div className="mt-8 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Your Privacy is Protected</h4>
                <p className="text-sm text-muted-foreground">
                  Passwords are generated locally in your browser using cryptographically secure random numbers. 
                  We never store or transmit your passwords.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
