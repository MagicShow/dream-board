import { useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import QuoteStrip from './components/QuoteStrip';
import SingleView from './views/SingleView';
import StackView from './views/StackView';
import MosaicView from './views/MosaicView';
import NavBar from './components/NavBar';
import AddButton from './components/AddButton';
import CardModal from './components/CardModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import './index.css';

export default function App() {
  const { cards, addCard, updateCard, deleteCard } = useLocalStorage();
  const [activeTab, setActiveTab] = useState('single');
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const singleScrollRef = useRef(null);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleAddCard = useCallback(() => {
    setEditingCard(null);
    setShowModal(true);
  }, []);

  const handleEditCard = useCallback((card) => {
    setEditingCard(card);
    setShowModal(true);
  }, []);

  const handleSaveCard = useCallback((cardData) => {
    if (editingCard) {
      updateCard(editingCard.id, cardData);
    } else {
      addCard(cardData);
    }
    setShowModal(false);
    setEditingCard(null);
  }, [editingCard, updateCard, addCard]);

  const handleDeleteCard = useCallback((id) => {
    deleteCard(id);
    setShowModal(false);
    setEditingCard(null);
  }, [deleteCard]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditingCard(null);
  }, []);

  const handleSingleScroll = useCallback(() => {
    const el = singleScrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setCurrentIndex(index);
  }, []);

  const renderView = () => {
    if (cards.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-icon">✨</div>
          <div className="empty-title">Add your first dream</div>
          <div className="empty-subtitle">
            Tap the button below to add an image, title, and start building your vision board.
          </div>
        </div>
      );
    }

    return (
      <>
        <SingleView
          cards={cards}
          onCardClick={handleEditCard}
          scrollRef={singleScrollRef}
          onScroll={handleSingleScroll}
        />
        <StackView cards={cards} onCardClick={handleEditCard} />
        <MosaicView cards={cards} onCardClick={handleEditCard} />
      </>
    );
  };

  return (
    <div className="app">
      <Header />
      <QuoteStrip />

      <div className="main-content">
        <div
          className="single-view"
          ref={singleScrollRef}
          onScroll={handleSingleScroll}
          style={{
            display: activeTab === 'single' ? 'flex' : 'none',
            height: '100%'
          }}
        >
          {cards.length === 0 ? (
            <div className="single-card-wrapper" style={{ justifyContent: 'center' }}>
              <div className="empty-state">
                <div className="empty-icon">✨</div>
                <div className="empty-title">Add your first dream</div>
                <div className="empty-subtitle">
                  Tap the button below to add an image, title, and start building your vision board.
                </div>
              </div>
            </div>
          ) : (
            cards.map(card => (
              <div key={card.id} className="single-card-wrapper">
                <div
                  onClick={() => handleEditCard(card)}
                  style={{ width: '100%', maxWidth: '320px', cursor: 'pointer' }}
                >
                  <DreamCardWrapper card={card} />
                </div>
              </div>
            ))
          )}
        </div>

        <div
          className="stack-view"
          style={{
            display: activeTab === 'stack' ? 'flex' : 'none',
            height: '100%'
          }}
        >
          {cards.map(card => (
            <div key={card.id} className="stack-card-wrapper">
              <DreamCardWrapper card={card} onClick={() => handleEditCard(card)} />
            </div>
          ))}
        </div>

        <div
          className="mosaic-view"
          style={{
            display: activeTab === 'mosaic' ? 'grid' : 'none',
            height: '100%'
          }}
        >
          {cards.map(card => (
            <div key={card.id} className="mosaic-card-wrapper">
              <DreamCardWrapper card={card} onClick={() => handleEditCard(card)} />
            </div>
          ))}
        </div>

        {/* Dot indicator for single view */}
        {cards.length > 1 && activeTab === 'single' && (
          <div className="dot-indicator">
            {cards.map((_, i) => (
              <div
                key={i}
                className={`dot${i === currentIndex ? ' active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>

      <AddButton onClick={handleAddCard} />
      <NavBar activeTab={activeTab} onTabChange={handleTabChange} />

      {showModal && (
        <CardModal
          card={editingCard}
          onSave={handleSaveCard}
          onDelete={handleDeleteCard}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

function DreamCardWrapper({ card, onClick }) {
  return (
    <div className="dream-card" onClick={onClick}>
      {card.videoUrl ? (
        <video
          className="dream-card-video"
          src={card.videoUrl}
          controls
          muted
          playsInline
        />
      ) : (
        <img className="dream-card-media" src={card.imageUrl} alt={card.title} />
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
