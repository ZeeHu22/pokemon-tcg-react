import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Filters from "./Filters";

const Home = ({
  searchTerm, setSearchTerm, types, subtypes, rarities,
  selectedType, setSelectedType, selectedSubtype, setSelectedSubtype, selectedRarity, setSelectedRarity,
  handleSearch
}) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
    navigate("/results");
  };

  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome, Catch a Card!</h1>
        <form onSubmit={handleSubmit} className="home-form">
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
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
