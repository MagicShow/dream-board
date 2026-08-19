import { useState, useEffect } from 'react';

const STORAGE_KEY = 'dreamboard_cards';

export function useLocalStorage() {
  const [cards, setCards] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.warn('localStorage full or unavailable:', e);
    }
  }, [cards]);

  const addCard = (card) => {
    setCards(prev => [
      { ...card, id: Date.now().toString() },
      ...prev
    ]);
  };

  const updateCard = (id, updates) => {
    setCards(prev =>
      prev.map(c => c.id === id ? { ...c, ...updates } : c)
    );
  };

  const deleteCard = (id) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const reorderCards = (newOrder) => {
    setCards(newOrder);
  };

  return { cards, addCard, updateCard, deleteCard, reorderCards };
}
