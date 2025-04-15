import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle, FaCarSide } from "react-icons/fa";
import axios from "axios";
import "../../assets/css/Navbar.css";

const UserNavbar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleProfileClick = () => {
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    try {
      const response = await axios.get(`http://localhost:8000/car-by-name/${searchInput}`);
      const carId = response.data.id;
      navigate(`/car-detail/${carId}`);
    } catch (error) {
      alert("Car not found!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar enhanced-navbar">
      <div className="left-side">
        <div className="navbar-brand">
          <FaCarSide className="brand-icon" /> <span>Vehicle Vault</span>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/compare">Compare</Link>
          </li>
          <li>
            <Link to="/explorecar">Explore Car</Link>
          </li>
        </ul>
      </div>
      <div className="right-side">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search Cars, Brands..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}><FaSearch /></button>
        </div>
        <div className="navbar-profile" onClick={handleProfileClick}>
          <FaUserCircle className="profile-icon" />
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
