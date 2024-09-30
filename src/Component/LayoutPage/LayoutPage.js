import React from "react";
// import SidebarPage from "../../Sidebar/sidebar";

import { Outlet } from "react-router-dom";
import './LayoutPage.css'; // Make sure to create and import a CSS file for additional styling if needed
import SidebarPage from "../../SidebarPage/Sidebar";

const LayoutDesign = () => {
  
    return (
    <div className="layout-container">
      <SidebarPage className="sidebar" />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDesign;
