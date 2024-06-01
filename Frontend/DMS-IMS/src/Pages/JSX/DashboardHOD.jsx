import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../CSS/DashboardHod.css'; // Import custom CSS
import MainDashboard from "../../Components/MainDashboard";
import AddSubject from "../../Components/AddSubject";
import AddStudent from "../../Components/AddStudent";
import AssignFaculty from "../../Components/AssignFaculty";
import AddFaculty from "../../Components/AddFaculty";
import toast from "react-hot-toast";

const DashboardHOD = () => {
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
            HOD Dashboard
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
                  <Link className="nav-link active text-white" to='/dashboardhod'>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboardhod/assign-faculty">
                    Assign Faculty
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboardhod/add-students">
                    Add Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboardhod/add-faculty">
                    Add Faculty
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboardhod/add-subjects">
                    Add Subject
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
            {location.pathname === '/dashboardhod' && <MainDashboard />}
            {location.pathname === '/dashboardhod/add-subjects' && <AddSubject />}
            {location.pathname === '/dashboardhod/add-students' && <AddStudent />}
            {location.pathname === '/dashboardhod/add-faculty' && <AddFaculty />}
            {location.pathname === '/dashboardhod/assign-faculty' && <AssignFaculty />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardHOD;
