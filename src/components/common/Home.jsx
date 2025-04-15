import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Home.css";
import { FaArrowDown } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const scrollToNext = () => {
    const nextSection = document.querySelector(".brands-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find, Compare & Choose Your Perfect Car</h1>
          <p>Trusted platform to make your car buying decision easy.</p>
          <div className="hero-buttons">
            <button onClick={() => navigate("/compare")}>Compare Cars</button>
            <button onClick={() => navigate("/explorecar")}>Explore Cars</button>
          </div>
        </div>
        <div className="scroll-down" onClick={scrollToNext}>
          <FaArrowDown />
        </div>
      </section>

      {/* Popular Brands Section */}
      <section className="brands-section">
        <h2>Popular Car Brands</h2>
        <div className="brands-slider">
          {[
            "Hyundai",
            "Kia",
            "Tata",
            "Maruti",
            "Mahindra",
            "Bugatti",
            "Ferrari",
            "RollsRoyce",
            "Lamborghini",
            "Bentley",
            "Mercedes",
            "BMW",
            "Audi",
            "Porsche",
            "Jaguar",
          ].map((brand, index) => (
            <div key={index} className="brand-card">
              <img src={`/brands/${brand.toLowerCase()}.png`} alt={brand} />
              <p>{brand}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Comparisons
      <section className="trending-section">
        <h2>Trending Comparisons</h2>
        <div className="trending-list">
          {["Creta vs Seltos", "Brezza vs Nexon", "XUV700 vs Harrier"].map((comp, index) => (
            <div key={index} className="trending-card" onClick={() => navigate("/compare")}> 
              <p>{comp}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Vehicle Vault?</h2>
        <div className="features-list">
          {[
            "Compare Cars Instantly",
            "Real-Time Price & Mileage",
            "Latest Car News & Reviews",
            "Accessories Suggestions",
            "Easy Search & Filter",
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <p>✔️ {feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>Latest Reviews & News</h2>
        <div className="reviews-list">
          {[
            "Top SUVs of 2025",
            "Best Mileage Cars",
            "Upcoming Cars in India",
          ].map((review, index) => (
            <div key={index} className="review-card">
              <h4>{review}</h4>
              <button onClick={() => navigate("/reviews")}>Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Compare Your Dream Car?</h2>
        <button onClick={() => navigate("/compare")}>Compare Now</button>
      </section>
    </div>
  );
};

export default Home;
