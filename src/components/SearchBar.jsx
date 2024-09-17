import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      id="searchInput"
      className="search-bar"
      type="text"
      value={searchTerm}
      placeholder="Search cards..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;