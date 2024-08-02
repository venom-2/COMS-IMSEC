// Navbar.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Navbar.css'; // Custom CSS file
import { ToggleContext } from '../contextAPI/ToggleContext';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({handleLogout}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {toggleState, setToggleState} = React.useContext(ToggleContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken.user);
      console.log('Decoded Token:', decodedToken);
    } catch (error) {
      console.error('Error while decoding token:', error);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggle = () =>{
    setToggleState(!toggleState); 
    }

  return (
    <>
      <nav className="navbar navbar-light p-3" style={{ backgroundColor: '#17153B' }}>
        <a href="#" className="navbar-brand mx-2" style={{ color: 'white' }}>
          <i className="fa-solid fa-bars fa-2xl" onClick={toggle}></i>
        </a>
        <a className="navbar-brand mx-3" href="#" style={{ color: 'white' }}>
          <i className="fa-solid fa-user fa-2xl" onClick={toggleDropdown}></i>
        </a>
      </nav>
      <div className={`dropdown ${dropdownOpen ? 'show' : ''}`} style={{ position: 'absolute', right: '10px', top: '25px' }}>
        <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} style={{ display: dropdownOpen ? 'block' : 'none', padding: '20px', width: '350px' }}>
          <h6 className="dropdown-header text-center" style={{fontSize:'1.2rem', color:'#17153b'}}>Welcome, {userData.name}</h6>
          <hr className="dropdown-divider" />
          <div className="profile-info">
            <div className=" mt-3" style={{textAlign:'left'}}>
              <p className="mb-1"><strong>Email:</strong> {userData.email}</p>
              <p className="mb-1"><strong>Designation:</strong> {userData.role}</p>
              <p className="mb-1"><strong>Department:</strong> {userData.department}</p>
            </div>
            <div className="text-center mt-3">
              <button className="btn btn-primary me-2 px-4 button">Edit</button>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
