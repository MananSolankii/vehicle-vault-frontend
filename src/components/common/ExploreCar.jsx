// ExploreCar.jsx with Filters, Sort, Search
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/ExploreCar.css";

const ExploreCar = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    fuel_type: "",
    transmission: "",
    body_type: "",
    price_range: "",
  });
  const [sort, setSort] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8000";

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/cars`);
        setCars(res.data);
        setFilteredCars(res.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    let result = [...cars];

    // Filter
    if (filters.brand)
      result = result.filter((car) => car.brand === filters.brand);
    if (filters.fuel_type)
      result = result.filter((car) => car.fuel_type === filters.fuel_type);
    if (filters.transmission)
      result = result.filter(
        (car) => car.transmission === filters.transmission
      );
    if (filters.body_type)
      result = result.filter((car) => car.body_type === filters.body_type);
    if (filters.price_range) {
      const [min, max] = filters.price_range.split("-").map(Number);
      result = result.filter((car) => car.price >= min && car.price <= max);
    }

    // Search
    if (searchTerm) {
      result = result.filter((car) =>
        `${car.brand} ${car.name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sort === "price_asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "mileage_desc")
      result.sort((a, b) => b.mileage_city - a.mileage_city);

    setFilteredCars(result);
  }, [filters, searchTerm, sort, cars]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="explore-page">
      <h1>Explore Cars</h1>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
        >
          <option value="">All Brands</option>
          {[...new Set(cars.map((car) => car.brand))].map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          name="fuel_type"
          value={filters.fuel_type}
          onChange={handleFilterChange}
        >
          <option value="">Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="EV">EV</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select
          name="transmission"
          value={filters.transmission}
          onChange={handleFilterChange}
        >
          <option value="">Transmission</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
        <select
          name="body_type"
          value={filters.body_type}
          onChange={handleFilterChange}
        >
          <option value="">Body Type</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="MUV">MUV</option>
          <option value="Coupe">Coupe</option>
          <option value="Convertible">Convertible</option>
        </select>
        <select
          name="price_range"
          value={filters.price_range}
          onChange={handleFilterChange}
        >
          <option value="">Price Range</option>
          <option value="0-500000">Below ₹5 Lakh</option>
          <option value="500000-1000000">₹5–10 Lakh</option>
          <option value="1000000-1500000">₹10–15 Lakh</option>
          <option value="1500000-3000000">₹15–30 Lakh</option>
          <option value="3000000-99999999">₹30 Lakh & Above</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="mileage_desc">Mileage: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="loading">Loading cars...</p>
      ) : (
        <div className="car-grid">
          {filteredCars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image_url} alt={car.name} />
              <h3>
                {car.brand} {car.name}
              </h3>
              <p className="price">₹ {car.price?.toLocaleString()}</p>
              <button onClick={() => navigate(`/car-detail/${car.id}`)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreCar;
