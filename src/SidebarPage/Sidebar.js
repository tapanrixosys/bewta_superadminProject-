import React, { useState } from 'react';
import './sidebar.css'; 
import Cookies from 'js-cookie';
import logo from '../assets/image/bewta-logo-white.svg'
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  // const [active, setActive] = useState(true)
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token from cookies
    navigate("/login"); // Redirect the user to the login page
  };

  return (

    <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
      <header> 
        <div className="image-text" style={{ justifyContent: "center", alignItems: "center" }}>
          <div className="image">
            <img src={logo} className='bewta' alt="logo" /> <br />
            {/* <p className='text-white'>Bewta</p> */}
          </div>

          {/* <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i> */}

        </div>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-link">
             
            <li className='nav-link'>
              <a href="/dashboard">
              <i className="bx bx-bar-chart-alt-2 icons text-light"></i>
              <span className="text text-white nav-text">Dashboard</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="/tenants">       
              <i className="bx bx-home-alt icons text-light"></i>
              <span className="text text-white nav-text">Tenants</span>
              </a>
            </li> 

            <li className="nav-link">
              <a href="/price">      
                <i className="bx bx-bell icons text-light"></i>
                <span className="text text-white nav-text">Pricing</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="/support">
                <i className="bx bx-pie-chart-alt icons text-light"></i>
                <span className="text text-white nav-text">Support</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="/sales">
                <i className="bx bx-heart icons text-light"></i>
                <span className="text text-white nav-text">Sales</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="/team">
                <i className="bx bx-wallet-alt icons text-light"></i>
                <span className="text text-white nav-text">Team</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="/faq">
                <i className="bx bx-wallet-alt icons text-light"></i>
                <span className="text text-white nav-text">FAQ</span>
              </a>
            </li>


          </ul>
        </div>

        <div className="bottom-content">
          <li className="nav-link"> 
            <a href="" onClick={handleLogout}>
              <i className="bx bx-log-out icons text-light"></i>
              <span className="text text-white nav-text">Log Out</span>
            </a>          
          </li>
        </div>
      </div>
    </nav>        

   


  );
};

export default Sidebar;
