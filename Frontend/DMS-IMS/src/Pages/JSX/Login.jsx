import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode

const Login = ({ isTokenExpired }) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

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
                role: ""
            });
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const getDashboardRoute = (role) => {
        switch (role) {
            case "Admin":
                return "/dashboardadmin";
            case "HOD":
                return "/dashboardhod";
            case "Faculty":
                return "/dashboardfaculty";
            default:
                return "/login";
        }
    };

    return (
        <section className="bg-primary py-3 py-md-5 py-xl-8">
            <div className="container">
                <div className="row gy-4 align-items-center">
                    <div className="col-12 col-md-6 col-xl-7">
                        <div className="d-flex justify-content-center text-bg-primary">
                            <div className="col-12 col-xl-9">
                                <img
                                    className="img-fluid rounded mb-4"
                                    loading="lazy"
                                    src="./assets/img/ims-logo.svg"
                                    width="245"
                                    height="80"
                                    alt="IMS Logo"
                                />
                                <hr className="border-primary-subtle mb-4" />
                                <h2 className="h1 mb-4">
                                    Welcome to IMS Computer Science Department
                                </h2>
                                <p className="lead mb-5">
                                    Empowering the next generation of tech innovators and leaders.
                                </p>
                                <div className="text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="48"
                                        height="48"
                                        fill="currentColor"
                                        className="bi bi-laptop"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M12 0H4a2 2 0 0 0-2 2v9a2 2 0 0 0-2 2v1h16v-1a2 2 0 0 0-2-2V2a2 2 0 0 0-2-2zM1 13v-1h14v1H1zm3-2h8V2H4v9z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-5">
                        <div className="card border-0 rounded-4 shadow">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="row">
                                    <div className="col-12 mb-4">
                                        <h3>Sign In</h3>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row gy-3">
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    id="email"
                                                    placeholder="name@example.com"
                                                    onChange={handleChange}
                                                    value={credentials.email}
                                                    required
                                                />
                                                <label htmlFor="email" className="form-label">
                                                    Email
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    id="password"
                                                    placeholder="Password"
                                                    onChange={handleChange}
                                                    value={credentials.password}
                                                    required
                                                />
                                                <label htmlFor="password" className="form-label">
                                                    Password
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <select
                                                    className="form-select"
                                                    name="role"
                                                    id="role"
                                                    value={credentials.role}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Role</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="HOD">HOD</option>
                                                    <option value="Faculty">Faculty</option>
                                                </select>
                                                <label htmlFor="role" className="form-label">
                                                    Role
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="remember_me"
                                                    id="remember_me"
                                                />
                                                <label className="form-check-label" htmlFor="remember_me">
                                                    Keep me logged in
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn btn-primary btn-lg" type="submit">
                                                    Log In Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row mt-4">
                                    <div className="col-12 d-flex justify-content-md-end gap-2 gap-md-4">
                                        <a href="#!">Forgot Password?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
