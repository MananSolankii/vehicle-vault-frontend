import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/common/Signup";
import { Login } from "./components/common/Login";
import Home from "./components/common/Home";
import UserNavbar from "./components/layouts/UserNavbar";
// import CarSearch from "./components/common/CarSearch";
// import ComparePage from "./components/common/ComparePage";
import AdminDashboard from "./components/common/AdminDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Compare from "./components/common/Compare";
import ExploreCar from "./components/common/ExploreCar";
import CarDetail from "./components/common/CarDetail";
import BackgroundMusic from "./components/common/BackgroundMusic";

const App = () => {
  return (
    <>
    <BackgroundMusic/>
    <Router>
      <UserNavbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/search" element={<CarSearch />} /> */}
          <Route path="/explorecar" element={<ExploreCar />} />
          {/* <Route path="/compare" element={<ComparePage />} /> */}
          <Route path="/car-detail/:id" element={<CarDetail />} />
          <Route path ="/compare" element={<Compare/>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
