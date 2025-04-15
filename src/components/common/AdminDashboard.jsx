import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../assets/css/AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("company");
  const [companyName, setCompanyName] = useState("");
  const [bulkCompanies, setBulkCompanies] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [carList, setCarList] = useState([]);
  const [newCar, setNewCar] = useState({
    company_id: "",
    brand: "",
    name: "",
    model: "",
    fuel_type: "",
    transmission: "",
    body_type: "",
    seating_capacity: 0,
    price: 0,
    mileage_city: 0,
    mileage_highway: 0,
    engine_displacement: 0,
    engine_type: "",
    max_power: "",
    max_torque: "",
    cylinders: 0,
    valves_per_cylinder: 4,
    drive_type: "",
    length: 0,
    width: 0,
    height: 0,
    wheelbase: 0,
    ground_clearance: 0,
    boot_space: 0,
    fuel_tank_capacity: 0,
    airbags: false,
    abs: false,
    ebd: false,
    brake_assist: false,
    power_steering: false,
    automatic_climate_control: false,
    rear_ac_vents: false,
    touch_screen: false,
    bluetooth_connectivity: false,
    usb_ports: 0,
    speakers: 0,
    parking_sensors: false,
    rear_camera: false,
    image_url: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "Admin") {
      toast.error("You are not authorized to access Admin Panel!");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchCompanies();
    fetchCars();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axiosInstance.get("/companies");
      setCompanyList(res.data);
    } catch {
      toast.error("Failed to fetch companies.");
    }
  };

  const fetchCars = async () => {
    try {
      const res = await axiosInstance.get("/cars");
      setCarList(res.data);
    } catch {
      toast.error("Failed to fetch cars.");
    }
  };

  const handleAddCompany = async () => {
    try {
      await axiosInstance.post("/company", { name: companyName });
      toast.success("Company added successfully!");
      setCompanyName("");
      fetchCompanies();
    } catch {
      toast.error("Failed to add company.");
    }
  };

  const handleBulkInsert = async () => {
    try {
      const companiesArray = bulkCompanies.split(",").map((c) => ({ name: c.trim() }));
      await axiosInstance.post("/companies/bulk", companiesArray);
      toast.success("Companies inserted successfully!");
      setBulkCompanies("");
      fetchCompanies();
    } catch {
      toast.error("Failed to insert companies.");
    }
  };

  const handleDeleteCompany = async (id) => {
    try {
      await axiosInstance.delete(`/company/${id}`);
      toast.success("Company deleted successfully!");
      fetchCompanies();
    } catch {
      toast.error("Failed to delete company.");
    }
  };

  const handleAddCar = async () => {
    try {
      await axiosInstance.post("/car", newCar);
      toast.success("Car added successfully!");
      setNewCar({});
      fetchCars();
    } catch {
      toast.error("Failed to add car.");
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await axiosInstance.delete(`/car/${id}`);
      toast.success("Car deleted successfully!");
      fetchCars();
    } catch {
      toast.error("Failed to delete car.");
    }
  };

  const handleCarChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCar({
      ...newCar,
      [name]: type === "checkbox" ? checked : value
    });
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="tab-buttons">
        <button onClick={() => setActiveTab("company")} className={activeTab === "company" ? "active" : ""}>Company Management</button>
        <button onClick={() => setActiveTab("car")} className={activeTab === "car" ? "active" : ""}>Car Management</button>
      </div>

      {activeTab === "company" && (
        <div>
          <div className="form-section">
            <h3>Add Single Company</h3>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter company name" />
            <button onClick={handleAddCompany}>Add Company</button>
          </div>

          <div className="form-section">
            <h3>Bulk Insert Companies</h3>
            <input type="text" value={bulkCompanies} onChange={(e) => setBulkCompanies(e.target.value)} placeholder="Comma separated companies (e.g. Kia, Jeep, Ford)" />
            <button onClick={handleBulkInsert}>Insert Companies</button>
          </div>

          <div className="company-table">
            <h3>All Companies</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {companyList.map((company, index) => (
                  <tr key={company._id}>
                    <td>{index + 1}</td>
                    <td>{company.name}</td>
                    <td><button onClick={() => handleDeleteCompany(company._id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "car" && (
        <div>
          <div className="form-section car-form">
            <h3>Add New Car</h3>
            {Object.entries(newCar).map(([key, value]) => (
              <div key={key} className="form-field">
                <label>{key.replace(/_/g, " ").toUpperCase()}</label>
                {typeof value === "boolean" ? (
                  <input type="checkbox" name={key} checked={value} onChange={handleCarChange} />
                ) : (
                  <input
                    type={typeof value === "number" ? "number" : "text"}
                    name={key}
                    value={value}
                    onChange={handleCarChange}
                    placeholder={`Enter ${key}`}
                  />
                )}
              </div>
            ))}
            <button className="submit-btn" onClick={handleAddCar}>Add Car</button>
          </div>

          <div className="company-table">
            <h3>All Cars</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Car Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {carList.map((car, index) => (
                  <tr key={car._id}>
                    <td>{index + 1}</td>
                    <td>{car.name}</td>
                    <td>{car.brand}</td>
                    <td>₹ {car.price?.toLocaleString()}</td>
                    <td><button onClick={() => handleDeleteCar(car._id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;