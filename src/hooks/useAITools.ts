import { useState, useCallback } from 'react';
import { streamAIChat } from './useAIStream';

interface UseContentWriterReturn {
  content: string;
  isGenerating: boolean;
  error: string | null;
  generate: (topic: string, options?: { tone?: string; language?: string }) => Promise<void>;
  clear: () => void;
}

export function useContentWriter(): UseContentWriterReturn {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (topic: string, options?: { tone?: string; language?: string }) => {
    setContent('');
    setError(null);
    setIsGenerating(true);

    await streamAIChat({
      messages: [{ role: 'user', content: topic }],
      type: 'content-writer',
      options,
      onDelta: (delta) => {
        setContent((prev) => prev + delta);
      },
      onDone: () => {
        setIsGenerating(false);
      },
      onError: (err) => {
        setError(err);
        setIsGenerating(false);
      },
    });
  }, []);

  const clear = useCallback(() => {
    setContent('');
    setError(null);
  }, []);

  return { content, isGenerating, error, generate, clear };
}

interface UseParaphraserReturn {
  result: string;
  isProcessing: boolean;
  error: string | null;
  paraphrase: (text: string, tone?: string) => Promise<void>;
  clear: () => void;
}

export function useParaphraser(): UseParaphraserReturn {
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paraphrase = useCallback(async (text: string, tone?: string) => {
    setResult('');
    setError(null);
    setIsProcessing(true);

    await streamAIChat({
      messages: [{ role: 'user', content: text }],
      type: 'paraphraser',
      options: tone ? { tone } : undefined,
      onDelta: (delta) => {
        setResult((prev) => prev + delta);
      },
      onDone: () => {
        setIsProcessing(false);
      },
      onError: (err) => {
        setError(err);
        setIsProcessing(false);
      },
    });
  }, []);

  const clear = useCallback(() => {
    setResult('');
    setError(null);
  }, []);

  return { result, isProcessing, error, paraphrase, clear };
}

interface UseSummarizerReturn {
  summary: string;
  isProcessing: boolean;
  error: string | null;
  summarize: (text: string) => Promise<void>;
  clear: () => void;
}

export function useSummarizer(): UseSummarizerReturn {
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summarize = useCallback(async (text: string) => {
    setSummary('');
    setError(null);
    setIsProcessing(true);

    await streamAIChat({
      messages: [{ role: 'user', content: text }],
      type: 'summarizer',
      onDelta: (delta) => {
        setSummary((prev) => prev + delta);
      },
      onDone: () => {
        setIsProcessing(false);
      },
      onError: (err) => {
        setError(err);
        setIsProcessing(false);
      },
    });
  }, []);

  const clear = useCallback(() => {
    setSummary('');
    setError(null);
  }, []);

  return { summary, isProcessing, error, summarize, clear };
}

interface UseGrammarCheckerReturn {
  correctedText: string;
  isProcessing: boolean;
  error: string | null;
  check: (text: string) => Promise<void>;
  clear: () => void;
}

export function useGrammarChecker(): UseGrammarCheckerReturn {
  const [correctedText, setCorrectedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(async (text: string) => {
    setCorrectedText('');
    setError(null);
    setIsProcessing(true);

    await streamAIChat({
      messages: [{ role: 'user', content: text }],
      type: 'grammar-checker',
      onDelta: (delta) => {
        setCorrectedText((prev) => prev + delta);
      },
      onDone: () => {
        setIsProcessing(false);
      },
      onError: (err) => {
        setError(err);
        setIsProcessing(false);
      },
    });
  }, []);

  const clear = useCallback(() => {
    setCorrectedText('');
    setError(null);
  }, []);

  return { correctedText, isProcessing, error, check, clear };
}

interface UseTranslatorReturn {
  translatedText: string;
  isProcessing: boolean;
  error: string | null;
  translate: (text: string, targetLanguage: string) => Promise<void>;
  clear: () => void;
}

export function useTranslator(): UseTranslatorReturn {
  const [translatedText, setTranslatedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translate = useCallback(async (text: string, targetLanguage: string) => {
    setTranslatedText('');
    setError(null);
    setIsProcessing(true);

    await streamAIChat({
      messages: [{ role: 'user', content: text }],
      type: 'translator',
      options: { targetLanguage },
      onDelta: (delta) => {
        setTranslatedText((prev) => prev + delta);
      },
      onDone: () => {
        setIsProcessing(false);
      },
      onError: (err) => {
        setError(err);
        setIsProcessing(false);
      },
    });
  }, []);

  const clear = useCallback(() => {
    setTranslatedText('');
    setError(null);
  }, []);

  return { translatedText, isProcessing, error, translate, clear };
}
