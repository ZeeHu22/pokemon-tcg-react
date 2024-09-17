import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import SkeletonCard from "./SkeletonCard";
import SearchBar from './SearchBar';
import Filters from './Filters';

const Results = ({
  loading, filteredCards,
  searchTerm, setSearchTerm,
  types, subtypes, rarities,
  selectedType, setSelectedType,
  selectedSubtype, setSelectedSubtype,
  selectedRarity, setSelectedRarity
}) => {
  return (
    <div className="results-container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Filters
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
      {loading && (
        <div className="loading-container">
          <div className="spinner-container">
            <FontAwesomeIcon icon={faSpinner} spin className="spinner" />
          </div>
          <SkeletonCard />
        </div>
      )}

      {!loading && (!filteredCards || filteredCards.length === 0) && (
        <div>No cards found.</div>
      )}

      {!loading && filteredCards && filteredCards.length > 0 && (
        <div className="results">
          {filteredCards.map((card) => (
            <div key={card.id} className="card">
              <img src={card.images.small} alt={card.name} />
              <p>{card.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
