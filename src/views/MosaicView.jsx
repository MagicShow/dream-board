import DreamCard from '../components/DreamCard';

export default function MosaicView({ cards, onCardClick }) {
  if (cards.length === 0) return null;

  return (
    <div className="mosaic-view">
      {cards.map(card => (
        <div key={card.id} className="mosaic-card-wrapper">
          <DreamCard card={card} onClick={onCardClick} />
        </div>
      ))}
    </div>
  );
}
