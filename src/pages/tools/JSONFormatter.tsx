import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, CheckCircle, Code, Minimize2, Maximize2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function JSONFormatter() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState('2');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    if (!input.trim()) {
      setError('Please enter JSON data');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, parseInt(indentSize));
      setOutput(formatted);
      setError('');
      toast({
        title: "Formatted! ✓",
        description: "JSON formatted successfully",
      });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(errorMsg);
      setOutput('');
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax",
        variant: "destructive",
      });
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) {
      setError('Please enter JSON data');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      toast({
        title: "Minified! ✓",
        description: "JSON minified successfully",
      });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(errorMsg);
      setOutput('');
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: "Copied! ✓",
        description: "JSON copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy",
        variant: "destructive",
      });
    }
  };

  const loadSample = () => {
    const sample = {
      name: "AI Tools Hub",
      type: "website",
      features: ["SEO Tools", "Converters", "AI Writing"],
      meta: {
        version: "1.0",
        author: "Dev Team",
        isActive: true
      },
      tools: [
        { id: 1, name: "QR Generator" },
        { id: 2, name: "Password Generator" }
      ]
    };
    setInput(JSON.stringify(sample));
    setOutput('');
    setError('');
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-utility/10 text-utility text-sm mb-4">
              <Code className="h-4 w-4" />
              <span>Developer Tool</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              JSON Formatter
            </h1>
            <p className="text-muted-foreground">
              JSON को beautify या minify करें - Instant validation
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Indent:</span>
              <Select value={indentSize} onValueChange={setIndentSize}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                  <SelectItem value="1">1 tab</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={formatJSON} className="btn-gradient">
              <Maximize2 className="h-4 w-4 mr-2" />
              Format
            </Button>
            
            <Button onClick={minifyJSON} variant="outline">
              <Minimize2 className="h-4 w-4 mr-2" />
              Minify
            </Button>
            
            <Button onClick={loadSample} variant="ghost">
              Load Sample
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-3xl mx-auto mb-6">
              <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Editor */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Input JSON</h3>
                <span className="text-xs text-muted-foreground">
                  {input.length} characters
                </span>
              </div>
              <Textarea
                placeholder='Paste your JSON here...\n\n{"example": "data"}'
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError('');
                }}
                className="font-mono text-sm min-h-[400px] resize-none"
              />
            </Card>

            {/* Output */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Output</h3>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={copyOutput}
                  disabled={!output}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="font-mono text-sm min-h-[400px] resize-none bg-muted/30"
              />
            </Card>
          </div>

          {/* Tips */}
          <div className="mt-8 max-w-3xl mx-auto">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">💡 JSON Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1 grid md:grid-cols-2 gap-2">
                <li>• Keys must be in double quotes</li>
                <li>• No trailing commas allowed</li>
                <li>• Use null instead of undefined</li>
                <li>• Arrays use square brackets []</li>
                <li>• Objects use curly braces {'{}'}</li>
                <li>• Strings must use double quotes</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
