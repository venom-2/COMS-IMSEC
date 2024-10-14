import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css";
import Cat from "../../assets/cat-sad-kitty-sad.webp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Logo from "../../assets/favicon-32x32.png";

const Login = ({ isTokenExpired }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!credentials.email || !credentials.password || !credentials.role) {
      toast.error("Please fill in all the fields.");
      return; // Do not proceed further if fields are empty
    }

    try {
      const response = await fetch(
        "https://dms-backend-eight.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const parsedResponse = await response.json();
      const { authToken } = parsedResponse;

      if (authToken) {
        console.log("Received Token:", authToken);
        localStorage.setItem("authToken", authToken);

        // Check if the token is considered expired immediately
        if (isTokenExpired(authToken)) {
          toast.error("Login failed! Token is expired.");
          return;
        }

        toast.success("Login successful!");

        navigate(getDashboardRoute(credentials.role));
      } else {
        toast.error("Login failed! Invalid credentials.");
      }

      setCredentials({
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      toast.error("Login failed! Invalid credentials.");
    }
  };

  const getDashboardRoute = (role) => {
    switch (role) {
      case "admin":
        return "/dashboardadmin";
      case "hod":
        return "/dashboardhod/home";
      case "faculty":
        return "/dashboardfaculty/home";
      default:
        return "/";
    }
  };

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="small-screen-visibility">
        <div className="content-container">
          <h1>Sorry, this website is not available on small screens.</h1>
          <img src={Cat} alt="" />
        </div>
      </div>
      <div className="container-fluid d-flex flex-wrap p-0 login-container">
        <div
          className="login d-flex align-items-center flex-column justify-content-center col-12 col-md-6"
          style={{ minHeight: "100vh", gap: "3rem" }}
        >
          <div
            className="login-form d-flex flex-column align-items-center justify-content-center w-75"
            style={{ minHeight: "60vh" }}
          >
            <div className="logo">
              <img
                src={Logo}
                alt="Gradium AI"
                className="mb-4"
                style={{ width: "60px" }}
              />
            </div>
            <div className="heading text-center mb-4">
              <h1>Login to your Account</h1>
              <p>See what is going on with your department</p>
            </div>
            <div className="input w-100">
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="email@imsec.ac.in"
                  className="form-control"
                  required
                />
              </div>
              <label htmlFor="email">Password</label>
              <div className="form-group mb-3 d-flex w-100 position-relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="form-control"
                  required
                  style={{ paddingRight: "40px" }} 
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute"
                  onClick={togglePassword}
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: "0",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    color: "#1b1a55",
                  }}
                >
                  {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="role">Role</label>
                <select
                  name="role"
                  id="role"
                  value={credentials.role}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="hod">Head of Department</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
              <div className="d-flex justify-content-end mb-3">
                <a href="#"></a>
              </div>
              <div className="d-flex justify-content-center">
                <button onClick={handleSubmit} className="butn">
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="text-center pt-4">
            <p>
              Don't have an account ?{" "}
              <span style={{ color: "#1B1A55" }}>Contact Admin</span>{" "}
            </p>
          </div>
        </div>
        <div
          className="img login-image d-none d-md-block col-md-6"
          style={{ height: "100vh" }}
        >
          {/* Image Background */}
        </div>
      </div>
    </>
  );
};

export default Login;
