import { useState, useEffect, useCallback } from 'react';
import quotes from '../data/quotes';

export function useQuoteRotator(autoAdvanceMs = 8000) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const advance = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % quotes.length);
      setFading(false);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, autoAdvanceMs);
    return () => clearInterval(timer);
  }, [advance, autoAdvanceMs]);

  const current = quotes[index];

  return { quote: current, fading, advance };
}
