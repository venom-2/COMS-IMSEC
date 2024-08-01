import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../CSS/DashboardHod.css'; // Import custom CSS
import toast from "react-hot-toast";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import HodDashboard_addFaculty from "../../Components/HodDashboard_components/HodDashboard_addFaculty";
import HodDashboard_addStudent from "../../Components/HodDashboard_components/HodDashboard_addStudent";

const DashboardHOD = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("authToken", "");
    localStorage.setItem("role", "");
    navigate("/");
    toast.success("Logged out successfully!");
  };

  return (
    <div className="d-flex flex-column">
      <div>
        <Navbar handleLogout={handleLogout} />
      </div>
      <div>
        <div>
          <Sidebar />
        </div>
        <div className="main-content">
          {/* <HodDashboard_addFaculty/> */}
          <HodDashboard_addStudent/>
        </div>
      </div>
    </div>
  );
};

export default DashboardHOD;
