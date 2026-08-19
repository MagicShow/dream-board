export default function DreamCard({ card, onClick }) {
  const handleMediaClick = () => {
    if (card.videoUrl) {
      // Let video play on click
      return;
    }
    onClick?.(card);
  };

  return (
    <div className="dream-card" onClick={() => onClick?.(card)}>
      {card.videoUrl ? (
        <video
          className="dream-card-video"
          src={card.videoUrl}
          controls
          muted
          playsInline
          onClick={handleMediaClick}
        />
      ) : (
        <img
          className="dream-card-media"
          src={card.imageUrl}
          alt={card.title}
          onClick={handleMediaClick}
        />
      )}
      <div className="dream-card-body">
        <div className="dream-card-title">{card.title}</div>
        {card.subtext && (
          <div className="dream-card-subtext">{card.subtext}</div>
        )}
      </div>
    </div>
  );
}
