import React from "react";
import { useNavigate } from "react-router-dom";
import TCG_Logo from '../assets/Pokemon_TCG_Live_Logo-1024x1024.png';

const Navbar = () => {
  const navigate = useNavigate();

  // Handler to navigate to the home page
  const handleNavClick = () => {
    navigate('/');
  };

  return (
    <nav onClick={handleNavClick} style={{ cursor: 'pointer' }}>
      <img src={TCG_Logo} alt="Pokémon TCG" />
      <h1>Pokémon TCG Search</h1>
    </nav>
  );
};

export default Navbar;
