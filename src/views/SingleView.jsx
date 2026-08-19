import { useRef, useEffect } from 'react';
import DreamCard from '../components/DreamCard';

export default function SingleView({ cards, onCardClick }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const index = Math.round(el.scrollLeft / el.offsetWidth);
      // dot tracking handled by parent via scroll
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  if (cards.length === 0) return null;

  return (
    <div className="single-view" ref={scrollRef}>
      {cards.map(card => (
        <div key={card.id} className="single-card-wrapper">
          <DreamCard card={card} onClick={onCardClick} />
        </div>
      ))}
    </div>
  );
}
