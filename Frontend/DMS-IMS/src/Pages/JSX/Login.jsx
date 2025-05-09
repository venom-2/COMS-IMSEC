import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Logo from "../../assets/favicon-32x32.png";
import Cat from "../../assets/cat-sad-kitty-sad.webp";
import LoginImage from "../../assets/login-image.jpg"; // Adjust the import path for your image
import "../CSS/Login.css";
import {jwtDecode} from "jwt-decode";

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
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const parsedResponse = await response.json();
      const { token } = parsedResponse;
      console.log(parsedResponse);
      const role = jwtDecode(token).role;
      console.log("Decoded Role:", role);

      if (token) {
        console.log("Received Token:", token);
        localStorage.setItem("token", token);

        // Check if the token is considered expired immediately
        if (isTokenExpired(token)) {
          toast.error("Login failed! Token is expired.");
          return;
        }

        toast.success("Login successful!");
        console.log(getDashboardRoute(role))
        navigate(getDashboardRoute(role));

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
      case "Admin":
        return "/dashboardadmin/home";
      case "HoD":
        return "/dashboardhod/home";
      case "Faculty":
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
      <Grid container className="login-container" sx={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={6} className="login d-flex align-items-center flex-column justify-content-center" sx={{ gap: "3rem" }}>
          <div className="login-form d-flex flex-column align-items-center justify-content-center" style={{ width: "75%", minHeight: "60vh" }}>
            <img src={Logo} alt="Gradium AI" className="mb-4" style={{ width: "60px" }} />
            <div className="heading text-center mb-4">
              <h1>Login to your Account</h1>
              <p>See what is going on with your department</p>
            </div>
            <form className="input w-100" onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="email@imsec.ac.in"
                fullWidth
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={credentials.password}
                onChange={handleChange}
                placeholder="********"
                fullWidth
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePassword}>
                        {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={credentials.role}
                  onChange={handleChange}
                  label="Role"
                  startAdornment={
                    <InputAdornment position="start">
                      <AssignmentIndIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="HoD">Head of Department</MenuItem>
                  <MenuItem value="Faculty">Faculty</MenuItem>
                </Select>
              </FormControl>
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#1B1A55",
                    color: "white",
                    width: "100%",
                    marginTop: 2,
                    '&:hover': {
                      backgroundColor: '#535C91' // Lighter shade on hover
                    }
                  }}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
          <div className="text-center pt-4">
            <p>
              Don't have an account ?{" "}
              <span style={{ color: "#1B1A55" }}>Contact Admin</span>
            </p>
          </div>
        </Grid>
        <Grid item md={6} className="img login-image d-none d-md-block"
          sx={{ height: "100vh", backgroundImage: `url(${LoginImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Image Background */}
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
