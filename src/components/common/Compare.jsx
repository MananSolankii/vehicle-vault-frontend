// Compare.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../assets/css/ComparePage.css";

const Compare = () => {
  const [companies, setCompanies] = useState([]);
  const [carOptions, setCarOptions] = useState([[], [], [], []]);
  const [selectedCars, setSelectedCars] = useState([null, null, null, null]);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const [showTable, setShowTable] = useState(false);

  const API_BASE_URL = "http://localhost:8000";

  const ATTRIBUTES = [
    "brand",
    "name",
    "model",
    "fuel_type",
    "transmission",
    "body_type",
    "seating_capacity",
    "price",
    "mileage_city",
    "mileage_highway",
    "engine_displacement",
    "engine_type",
    "max_power",
    "max_torque",
    "cylinders",
    "valves_per_cylinder",
    "drive_type",
    "length",
    "width",
    "height",
    "wheelbase",
    "ground_clearance",
    "boot_space",
    "fuel_tank_capacity",
    "airbags",
    "abs",
    "ebd",
    "brake_assist",
    "power_steering",
    "automatic_climate_control",
    "rear_ac_vents",
    "touch_screen",
    "bluetooth_connectivity",
    "usb_ports",
    "speakers",
    "parking_sensors",
    "rear_camera",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/companies`);
        setCompanies(res.data);
      } catch (err) {
        setError("Failed to fetch companies");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const fetchCarsByCompany = async (companyId, index) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/cars/company/${companyId}`);
      const updatedOptions = [...carOptions];
      updatedOptions[index] = res.data;
      setCarOptions(updatedOptions);
    } catch (err) {
      setError("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleSelectCompany = (companyId, index) => {
    fetchCarsByCompany(companyId, index);
  };

  const handleSelectCar = (car, index) => {
    const updated = [...selectedCars];
    updated[index] = car;
    setSelectedCars(updated);
    setDropdownIndex(null);
  };

  const handleRemoveCar = (index) => {
    const updated = [...selectedCars];
    updated[index] = null;
    setSelectedCars(updated);
    setCarOptions((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[index] = [];
      return updatedOptions;
    });
    setShowTable(false);
  };

  const handleCompare = () => {
    const selected = selectedCars.filter((c) => c);
    if (selected.length < 2) {
      alert("Select at least 2 cars to compare.");
      return;
    }
    setShowTable(true);
  };

  return (
    <div className="homepage">
      <div className="comparison-section">
        <h1 style={{color:"white"}}>Compare Cars</h1>
        <p className="tagline">Find, Compare &amp; Choose Your Perfect Car</p>

        <p>Select at least 2 cars to compare specifications and features.</p>

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-spinner">Loading...</div>}

        <div className="car-selection">
          {selectedCars.map((car, index) => (
            <div
              key={`car-selector-${index}`}
              className={`car-box ${dropdownIndex === index ? "active" : ""}`}
              onClick={() => toggleDropdown(index)}
            >
              {car ? (
                <div className="selected-car">
                  <button
                    className="remove-car-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveCar(index);
                    }}
                  >
                    ❌
                  </button>
                  {car.image_url && (
                    <img src={car.image_url} className="car-image" alt="Car" />
                  )}
                </div>
              ) : (
                <span>Select Car</span>
              )}

              {dropdownIndex === index && (
                <div
                  className="dropdown"
                  ref={dropdownRef}
                  onClick={(e) => e.stopPropagation()}
                >
                  {carOptions[index].length === 0 ? (
                    <div className="dropdown-content companies-list">
                      <div className="dropdown-header">Select Manufacturer</div>
                      {companies.map((company) => (
                        <div
                          key={`${company.id}-${index}`}
                          className="dropdown-item"
                          onClick={() => handleSelectCompany(company.id, index)}
                        >
                          {company.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="dropdown-content cars-list">
                      <div
                        className="dropdown-back"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newOptions = [...carOptions];
                          newOptions[index] = [];
                          setCarOptions(newOptions);
                        }}
                      >
                        ← Back to manufacturers
                      </div>
                      <div className="dropdown-header">Select Model</div>
                      {carOptions[index].map((car) => (
                        <div
                          key={`car-${car.id}-${index}`}
                          className="dropdown-item"
                          onClick={() => handleSelectCar(car, index)}
                        >
                          <div className="car-info">
                            <div className="car-name">
                              {car.brand} {car.name}
                            </div>
                            <div className="car-model">{car.model}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="compare-button">
          <button
            onClick={handleCompare}
            disabled={selectedCars.filter((c) => c !== null).length < 2}
          >
            Compare
          </button>
        </div>

        {showTable && (
          <div className="compare-table">
            <h2>Comparison Table</h2>
            <table>
              <thead>
                <tr>
                  <th>Attribute</th>
                  {selectedCars.map(
                    (car, idx) =>
                      car && (
                        <th key={`head-${idx}`}>
                          {car.brand} {car.name}
                        </th>
                      )
                  )}
                </tr>
              </thead>
              <tbody>
                {ATTRIBUTES.map((attr) => (
                  <tr key={attr}>
                    <td>{attr.replaceAll("_", " ")}</td>
                    {selectedCars.map((car, idx) => {
                      if (!car) return <td key={`empty-${idx}`}>-</td>;
                      const value = car[attr];
                      return (
                        <td key={`${attr}-${idx}`}>
                          {typeof value === "boolean"
                            ? value
                              ? "✅"
                              : "❌"
                            : value ?? "N/A"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
