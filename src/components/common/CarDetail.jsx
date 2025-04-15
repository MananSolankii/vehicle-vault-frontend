import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/CarDetail.css"; // 📌 Link your CSS file

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/car/${id}`);
        setCar(response.data);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <div className="text-center loading-msg">Loading...</div>;
  if (notFound) return <div className="text-center error-msg">Car not found</div>;

  return (
    <div className="car-detail-container">
      <div className="car-detail-card">
        <h1 className="car-title">{car.name}</h1>

        <div className="car-top">
          <img src={car.image_url} alt={car.name} className="car-image" />

          <div className="car-highlights">
            <InfoItem label="Brand" value={car.brand} />
            <InfoItem label="Model" value={car.model} />
            <InfoItem label="Price" value={`₹ ${car.price.toLocaleString()} Lakh`} />
            <InfoItem label="Fuel Type" value={car.fuel_type} />
            <InfoItem label="Transmission" value={car.transmission} />
            <InfoItem label="Mileage (City)" value={`${car.mileage_city} kmpl`} />
            <InfoItem label="Mileage (Highway)" value={`${car.mileage_highway} kmpl`} />
            <InfoItem label="Fuel Tank" value={`${car.fuel_tank_capacity} L`} />
          </div>
        </div>

        <div className="car-specs-grid">
          <InfoItem label="Boot Space" value={`${car.boot_space} L`} />
          <InfoItem label="Body Type" value={car.body_type} />
          <InfoItem label="Drive Type" value={car.drive_type} />
          <InfoItem label="Length" value={`${car.length} mm`} />
          <InfoItem label="Width" value={`${car.width} mm`} />
          <InfoItem label="Height" value={`${car.height} mm`} />
          <InfoItem label="Seating Capacity" value={car.seating_capacity} />
          <InfoItem label="ABS" value={car.abs ? "✅" : "❌"} />
          <InfoItem label="Airbags" value={car.airbags ? "✅" : "❌"} />
          <InfoItem label="Cruise Control" value={car.cruise_control ? "✅" : "❌"} />
          <InfoItem label="Sunroof" value={car.sunroof ? "✅" : "❌"} />
          <InfoItem label="Touchscreen" value={car.touch_screen ? "✅" : "❌"} />
          <InfoItem label="Rear Camera" value={car.rear_camera ? "✅" : "❌"} />
          <InfoItem label="Auto Climate Control" value={car.automatic_climate_control ? "✅" : "❌"} />
          <InfoItem label="Power Steering" value={car.power_steering ? "✅" : "❌"} />
          <InfoItem label="Power Windows" value={car.power_windows ? "✅" : "❌"} />
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="info-item">
    <p className="label">{label}</p>
    <p className="value">{value}</p>
  </div>
);

export default CarDetail;
