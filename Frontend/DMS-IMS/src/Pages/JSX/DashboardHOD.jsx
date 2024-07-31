import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUserPlus, FaPlus, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';
import '../CSS/DashboardHod.css'; // Import custom CSS
import MainDashboard from "../../Components/MainDashboard";
import AddSubject from "../../Components/AddSubject";
import AddStudent from "../../Components/AddStudent";
import AssignFaculty from "../../Components/AssignFaculty";
import AddFaculty from "../../Components/AddFaculty";
import toast from "react-hot-toast";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

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

        </div>
      </div>
    </div>
  );
};

export default DashboardHOD;
