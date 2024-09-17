import React from "react";

const Filters = ({ types, subtypes, rarities, selectedType, setSelectedType, selectedSubtype, setSelectedSubtype, selectedRarity, setSelectedRarity }) => {
  return (
    <div className="filters">
      <select className="filter" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
        <option value="">All Types</option>
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select className="filter" value={selectedSubtype} onChange={e => setSelectedSubtype(e.target.value)}>
        <option value="">All Subtypes</option>
        {subtypes.map(subtype => (
          <option key={subtype} value={subtype}>{subtype}</option>
        ))}
      </select>

      <select className="filter" value={selectedRarity} onChange={e => setSelectedRarity(e.target.value)}>
        <option value="">All Rarities</option>
        {rarities.map(rarity => (
          <option key={rarity} value={rarity}>{rarity}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
