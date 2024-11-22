import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../CSS/DashboardHod.css'; // Import custom CSS
import toast from "react-hot-toast";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/FacultyDashboard_components/Sidebar";
import FacultyDashboard_home from "../../Components/FacultyDashboard_components/FacultyDashboard_home";
import FacultyDashboard_addStudent from "../../Components/FacultyDashboard_components/FacultyDashboard_addStudent";
import FacultyDashboard_addMarks from "../../Components/FacultyDashboard_components/FacultyDashboard_addMarks";
import FacultyDashboard_viewCO from "../../Components/FacultyDashboard_components/FacultyDashboard_viewCO";
import FacultyDashboard_feedback from "../../Components/FacultyDashboard_components/FacultyDashboard_feedback";
import FacultyDashboard_assignment from "../../Components/FacultyDashboard_components/FacultyDashboard_assignment";

const DashboardFaculty = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // for logging out
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
        <main className="main-content">
          {location.pathname === '/dashboardfaculty/home' && <FacultyDashboard_home/>}
          {location.pathname === '/dashboardfaculty/add-students' && <FacultyDashboard_addStudent />}
          {location.pathname === '/dashboardfaculty/add-marks' && <FacultyDashboard_addMarks />}
          {location.pathname === '/dashboardfaculty/view-co' && <FacultyDashboard_viewCO />}
          {location.pathname === '/dashboardfaculty/assignment' && <FacultyDashboard_assignment />}
        </main>
      </div>
    </div>
  );
};

export default DashboardFaculty;
