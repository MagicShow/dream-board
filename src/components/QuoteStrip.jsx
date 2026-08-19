import { useQuoteRotator } from '../hooks/useQuoteRotator';

export default function QuoteStrip() {
  const { quote, fading, advance } = useQuoteRotator(8000);

  return (
    <div className="quote-strip" onClick={advance} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && advance()}>
      <span className={`quote-text${fading ? ' fading' : ''}`}>
        "{quote.text}"
      </span>
      <span className={`quote-author${fading ? ' fading' : ''}`}>
        — {quote.author}, {quote.title}
      </span>
      <span className="quote-tap-hint">tap ↻</span>
    </div>
  );
}
