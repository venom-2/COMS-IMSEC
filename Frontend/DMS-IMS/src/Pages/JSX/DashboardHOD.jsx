import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../CSS/DashboardHod.css'; // Import custom CSS
import toast from "react-hot-toast";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/HodDashboard_components/Sidebar";
import HodDashboard_addFaculty from "../../Components/HodDashboard_components/HodDashboard_addFaculty";
import HodDashboard_addStudent from "../../Components/HodDashboard_components/HodDashboard_addStudent";
import HodDashboard_assignFaculty from "../../Components/HodDashboard_components/HodDashboard_assignFaculty";
import HodDashboard_home from "../../Components/HodDashboard_components/HodDashboard_home";
import HodDashboard_addSubject from "../../Components/HodDashboard_components/HodDashboard_addSubject";

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
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>
        <div className="main-contenthod">
          {location.pathname === "/dashboardhod/add-students" && <HodDashboard_addStudent />}
          {location.pathname === "/dashboardhod/add-faculty" && <HodDashboard_addFaculty />}
          {location.pathname === "/dashboardhod/assign-faculty" && <HodDashboard_assignFaculty />}
          {location.pathname === "/dashboardhod/home" && <HodDashboard_home />}
          {location.pathname === "/dashboardhod/add-subject" && <HodDashboard_addSubject />}
        </div>
      </div>
    </div>
  );
};

export default DashboardHOD;
