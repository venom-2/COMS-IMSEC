import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Login from "./Pages/JSX/Login";
import DashboardHOD from "./Pages/JSX/DashboardHOD";
import { Toaster } from "react-hot-toast";
import DashboardFaculty from "./Pages/JSX/DashboardFaculty";
import DashboardAdmin from "./Pages/JSX/DashboardAdmin";
import { jwtDecode } from "jwt-decode";
import { COProvider } from './contextAPI/COContext';
import { ToggleProvider } from "./contextAPI/ToggleContext";

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.exp) {
      return true; // Invalid token
    }
    const currentTime = Date.now() / 1000; // in seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true; // Error while decoding token
  }
};

const allowedRole = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);
    return decodedToken.role;
  } catch (error) {
    return null; // Error while decoding token
  }
};

const isAuthenticated = (expectedRole) => {
  const token = localStorage.getItem("token");

  // Check if token exists
  if (!token) {
    return false;
  }

  // Check if token is expired
  if (isTokenExpired(token)) {
    localStorage.removeItem("token"); // Optionally remove expired token
    return false;
  }

  const role = allowedRole(token);

  console.log("AllowedRole:", role);
  console.log("ExpectedRole:", expectedRole);

  // Check if the role matches the expected role
  if (role !== expectedRole) {
    console.log("Role mismatch");
    return false;
  }
  console.log("Role matched");
  return true;
};

// Higher-order component for route guarding
const ProtectedRoute = ({ element, expectedRole }) => {
  return isAuthenticated(expectedRole) ? element : <Navigate to="/" />;
};

// Wrapper for nested protected routes
const ProtectedWrapper = ({ expectedRole }) => {
  return isAuthenticated(expectedRole) ? <Outlet /> : <Navigate to="/" />;
};

function App() {

  return (
    <>
      <COProvider>
        <ToggleProvider>
          <BrowserRouter>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<Login isTokenExpired={isTokenExpired} />} />

              <Route path="/dashboardhod" element={<ProtectedWrapper expectedRole="HoD" />}>
                <Route index element={<DashboardHOD />} />
                <Route path="add-students" element={<DashboardHOD />} />
                <Route path="assign-faculty" element={<DashboardHOD />} />
                <Route path="add-faculty" element={<DashboardHOD />} />
                <Route path="home" element={<DashboardHOD />} />
                <Route path="add-subject" element={<DashboardHOD />} />
              </Route>

              <Route path="/dashboardfaculty" element={<ProtectedWrapper expectedRole="Faculty" />}>
                <Route index element={<DashboardFaculty />} />
                <Route path="add-students" element={<DashboardFaculty />} />
                <Route path="add-marks" element={<DashboardFaculty />} />
                <Route path="home" element={<DashboardFaculty />} />
                <Route path="view-co" element={<DashboardFaculty />} />
                <Route path="assignment" element={<DashboardFaculty />} />
              </Route>

              <Route path="/dashboardadmin" element={<ProtectedRoute element={<DashboardAdmin />} expectedRole="Admin" />} >
                <Route index element={<DashboardAdmin />} />
                <Route path="home" element={<DashboardAdmin />} />
                <Route path="create-user" element={<DashboardAdmin />} />
                <Route path="view-users" element={<DashboardAdmin />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </ToggleProvider>
      </COProvider>
    </>
  );
}

export default App;
