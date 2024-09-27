import React, { useState } from 'react';
import './Sidebar.css'; // Assuming you will place the CSS in a separate file
// import 'boxicons';
// import logo from "../../assets/images/bewta-logo-white.svg";
import bewta from "../../../assets/image/bewta-logo.svg"
import './Sidebar.css'



const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src={bewta} alt="logo" />
          </span>
          <div className="text header-text">
          <span className="main">
              <img src={bewta} alt="" height="22" /> 
            </span>            
          </div>
        </div>
        <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="search-bar">
              <i className="bx bx-search icons"></i>
              <input type="search" placeholder="Search..." />
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-home-alt icons"></i>
                <span className="text nav-text">Dashboard</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-bar-chart-alt-2 icons"></i>
                <span className="text nav-text">Tenants</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-bell icons"></i>
                <span className="text nav-text">Pricing</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-pie-chart-alt icons"></i>
                <span className="text nav-text">Support</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-heart icons"></i>
                <span className="text nav-text">Settings</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-wallet-alt icons"></i>
                <span className="text nav-text">Team</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li className="nav-link">
            <a href="#">
              <i className="bx bx-log-out icons"></i>
              <span className="text nav-text">Log Out</span>
            </a>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;