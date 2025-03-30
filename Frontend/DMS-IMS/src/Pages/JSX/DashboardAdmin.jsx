import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import '../CSS/DashboardHod.css'; // Import custom CSS
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/AdminDashboard_components/Sidebar";
import AdminDashboard_home from "../../Components/AdminDashboard_components/AdminDashboard_home";
import AdminDashboard_createUser from "../../Components/AdminDashboard_components/AdminDashboard_createUser";
import AdminDashboard_viewUsers from "../../Components/AdminDashboard_components/AdminDashboard_viewUsers";

const DashboardAdmin = () => {
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
          {location.pathname === '/dashboardadmin/home' && <AdminDashboard_home />}
          {location.pathname === '/dashboardadmin/create-user' && <AdminDashboard_createUser />}
          {location.pathname === '/dashboardadmin/view-users' && <AdminDashboard_viewUsers />}
        </main>
      </div>
    </div>
  )
}

export default DashboardAdmin
