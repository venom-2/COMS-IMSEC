import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUserPlus, FaPlus, FaFileAlt } from 'react-icons/fa';
import '../CSS/DashboardHod.css'; // Import custom CSS
import MainDashboard from "../../Components/MainDashboard";
import AddStudent from "../../Components/AddStudent";
import toast from "react-hot-toast";
import Addmarks from "../../Components/Addmarks";
import CO from "../../Components/CO";

const DashboardFaculty = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Collapse the sidebar when the location changes
    const sidebar = document.getElementById("sidebarMenu");
    if (sidebar) {
      const bsCollapse = new window.bootstrap.Collapse(sidebar, { toggle: false });
      bsCollapse.hide();
    }
  }, [location]);

  // for logging out
  const handleClick = () => {
    localStorage.setItem("authToken", "");
    localStorage.setItem("role", "");
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#home">
            Faculty Dashboard
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="ml-auto">
            <button className="btn btn-outline-light" onClick={handleClick}>
              Log out
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
            <div className="position-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active text-white" to='/DashboardFaculty'>
                    <FaTachometerAlt className="me-2" /> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/DashboardFaculty/add-students">
                    <FaUserPlus className="me-2" /> Add Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/DashboardFaculty/add-marks">
                    <FaPlus className="me-2" /> Add Marks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/DashboardFaculty/view-co">
                    <FaFileAlt className="me-2" /> View CO
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
            {location.pathname === '/DashboardFaculty' && <MainDashboard />}
            {location.pathname === '/DashboardFaculty/add-students' && <AddStudent />}
            {location.pathname === '/DashboardFaculty/add-marks' && <Addmarks />}
            {location.pathname === '/DashboardFaculty/view-co' && <CO />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardFaculty;
