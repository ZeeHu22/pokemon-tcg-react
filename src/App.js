import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Results from './components/Results';
import About from './components/About'; // Import the About component

function App() {
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [rarities, setRarities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSubtype, setSelectedSubtype] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  async function fetchAllCards() {
    setLoading(true);
    const response = await fetch(`https://api.pokemontcg.io/v2/cards`, {
      headers: { 'X-Api-Key': process.env.REACT_APP_POKEMON_TCG_API }
    });
    const data = await response.json();
    setLoading(false);
    return data.data;
  }

  async function fetchAttributes(endpoint) {
    const response = await fetch(`https://api.pokemontcg.io/v2/${endpoint}`, {
      headers: { 'X-Api-Key': process.env.REACT_APP_POKEMON_TCG_API }
    });
    const data = await response.json();
    return data.data;
  }

  async function populateFilters() {
    const typesData = await fetchAttributes('types');
    setTypes(typesData.filter(type => type !== 'Fairy'));
  }

  async function handleSearch() {
    if (!searchInitiated) {
      const cardsData = await fetchAllCards();
      setAllCards(cardsData);
    }
    setSearchInitiated(true);
    filterCards();
  }

  function filterCards() {
    const filtered = allCards.filter(card => {
      const nameMatch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = selectedType ? card.types.includes(selectedType) : true;
      const subtypeMatch = selectedSubtype ? card.subtypes.includes(selectedSubtype) : true;
      const rarityMatch = selectedRarity ? card.rarity === selectedRarity : true;
      return nameMatch && typeMatch && subtypeMatch && rarityMatch;
    });
    setFilteredCards(filtered);

    const uniqueSubtypes = [...new Set(filtered.flatMap(card => card.subtypes || []))];
    const uniqueRarities = [...new Set(filtered.map(card => card.rarity).filter(Boolean))];
    setSubtypes(uniqueSubtypes);
    setRarities(uniqueRarities);
  }

  useEffect(() => {
    populateFilters();
  }, []);

  useEffect(() => {
    if (searchInitiated) {
      filterCards();
    }
  }, [searchTerm, selectedType, selectedSubtype, selectedRarity, searchInitiated]);

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <Home
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              types={types}
              subtypes={subtypes}
              rarities={rarities}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedSubtype={selectedSubtype}
              setSelectedSubtype={setSelectedSubtype}
              selectedRarity={selectedRarity}
              setSelectedRarity={setSelectedRarity}
              handleSearch={handleSearch}
            />
          } />
          <Route path="/results" element={
            <Results
              loading={loading}
              filteredCards={filteredCards}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              types={types}
              subtypes={subtypes}
              rarities={rarities}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedSubtype={selectedSubtype}
              setSelectedSubtype={setSelectedSubtype}
              selectedRarity={selectedRarity}
              setSelectedRarity={setSelectedRarity}
            />
          } />
          <Route path="/about/:cardId" element={<About />} /> {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
