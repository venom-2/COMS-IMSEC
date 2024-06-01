import React from "react";
import '../CSS/LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const[ref, setRef] = React.useState('/login');
    React.useEffect(() => {
        if(localStorage.getItem('success') === "true") {
            setRef('/dashboardhod');
        }
    }, []);
return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body text-center">
            <h1 className="card-title mb-4">Welcome!</h1>
            <p className="card-text mb-4 text-muted">"The journey of a thousand miles begins with a single step."</p>
            <div className="d-flex justify-content-center">
                <Link to={ref} className="btn btn-primary btn-lg custom-btn">Login</Link>
            </div>
        </div>
    </div>
</div>
);
};

export default LandingPage;
