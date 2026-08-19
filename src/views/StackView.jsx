import DreamCard from '../components/DreamCard';

export default function StackView({ cards, onCardClick }) {
  if (cards.length === 0) return null;

  return (
    <div className="stack-view">
      {cards.map(card => (
        <div key={card.id} className="stack-card-wrapper">
          <DreamCard card={card} onClick={onCardClick} />
        </div>
      ))}
    </div>
  );
}
