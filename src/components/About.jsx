import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SkeletonAbout from './SkeletonAbout';

const About = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCard() {
      const response = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
        headers: { 'X-Api-Key': process.env.REACT_APP_POKEMON_TCG_API }
      });
      const data = await response.json();
      setCard(data.data);
      setLoading(false);
    }

    fetchCard();
  }, [cardId]);

  if (loading) return <SkeletonAbout />;

  if (!card) return <div>Card not found.</div>;

  return (
    <div className="about-page">
      <h1>{card.name}</h1>
      <img src={card.images.large} alt={card.name} />
      <p><strong>Type:</strong> {card.types.length > 0 ? card.types.join(', ') : 'N/A'}</p>
      <p><strong>HP:</strong> {card.hp || 'N/A'}</p>
      <p><strong>Abilities:</strong></p>
      <ul>
        {card.abilities && card.abilities.length > 0 ? (
          card.abilities.map((ability, index) => (
            <li key={index}>
              <strong>{ability.name}:</strong> {ability.text}
            </li>
          ))
        ) : (
          <li>N/A</li>
        )}
      </ul>
      <p><strong>Attacks:</strong></p>
      <ul>
        {card.attacks && card.attacks.length > 0 ? (
          card.attacks.map((attack, index) => (
            <li key={index}>
              <strong>{attack.name}:</strong> {attack.text} (Cost: {attack.cost.join(', ')})
            </li>
          ))
        ) : (
          <li>N/A</li>
        )}
      </ul>
      <p><strong>Weaknesses:</strong></p>
      <ul>
        {card.weaknesses && card.weaknesses.length > 0 ? (
          card.weaknesses.map((weakness, index) => (
            <li key={index}>
              <strong>{weakness.type}:</strong> {weakness.value}
            </li>
          ))
        ) : (
          <li>N/A</li>
        )}
      </ul>
      <p><strong>Set:</strong> {card.set && card.set.name ? card.set.name : 'N/A'}</p>
      <p><strong>Artist:</strong> {card.artist || 'N/A'}</p>
      <p><strong>Rarity:</strong> {card.rarity || 'N/A'}</p>
      <p><strong>Flavor Text:</strong> {card.flavorText || 'N/A'}</p>
      <p><strong>Cardmarket Price:</strong> {card.cardmarket && card.cardmarket.url ? <a href={card.cardmarket.url} target="_blank" rel="noopener noreferrer">Cardmarket</a> : 'N/A'}</p>
    </div>
  );
};

export default About;
