import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/JSX/LandingPage";
import Login from "./Pages/JSX/Login";
import DashboardHOD from "./Pages/JSX/DashboardHOD";
import { Toaster } from "react-hot-toast";
import DashboardFaculty from "./Pages/JSX/DashboardFaculty";
import DashboardAdmin from "./Pages/JSX/DashboardAdmin";
import {jwtDecode} from "jwt-decode"; // Correct import statement for jwt-decode

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
    return decodedToken.sub;
  } catch (error) {
    return null; // Error while decoding token
  }
};

const isAuthenticated = (expectedRole) => {
  const token = localStorage.getItem("authToken");

  // Check if token exists
  if (!token) {
    return false;
  }

  // Check if token is expired
  if (isTokenExpired(token)) {
    localStorage.removeItem("authToken"); // Optionally remove expired token
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
  return isAuthenticated(expectedRole) ? element : <Navigate to="/login" />;
};

// Wrapper for nested protected routes
const ProtectedWrapper = ({ expectedRole }) => {
  return isAuthenticated(expectedRole) ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login isTokenExpired={isTokenExpired} />} />
        <Route path="/dashboardhod" element={<ProtectedWrapper expectedRole="HOD" />}>
          <Route index element={<DashboardHOD />} />
          <Route path="add-students" element={<DashboardHOD />} />
          <Route path="assign-faculty" element={<DashboardHOD />} />
          <Route path="add-faculty" element={<DashboardHOD />} />
          <Route path="add-subjects" element={<DashboardHOD />} />
        </Route>
        <Route path="/dashboardfaculty" element={<ProtectedRoute element={<DashboardFaculty />} expectedRole="Faculty" />} />
        <Route path="/dashboardadmin" element={<ProtectedRoute element={<DashboardAdmin />} expectedRole="Admin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
