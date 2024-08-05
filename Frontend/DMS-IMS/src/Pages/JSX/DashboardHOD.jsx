import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../CSS/DashboardHod.css'; // Import custom CSS
import toast from "react-hot-toast";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import HodDashboard_addFaculty from "../../Components/HodDashboard_components/HodDashboard_addFaculty";
import HodDashboard_addStudent from "../../Components/HodDashboard_components/HodDashboard_addStudent";
import HodDashboard_assignFaculty from "../../Components/HodDashboard_components/HodDashboard_assignFaculty";
import HodDashboard_home from "../../Components/HodDashboard_components/HodDashboard_home";

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
          {location.pathname === "/dashboardhod/add-students" && <HodDashboard_addStudent />}
          {location.pathname === "/dashboardhod/add-faculty" && <HodDashboard_addFaculty />}
          {location.pathname === "/dashboardhod/assign-faculty" && <HodDashboard_assignFaculty />}
          {location.pathname === "/dashboardhod/home" && <HodDashboard_home />}
        </div>
      </div>
    </div>
  );
};

export default DashboardHOD;
