import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../../Login/Login';
import DashBoard from '../../DashBoard/DashBoard';
import Client from '../../Client/Client';

const Home = () => {
  return (
    <div>
      <Routes>
        {/* Route for login page */}
        <Route path="/" element={<Login />} />

        {/* Route for dashboard page */}
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/client" element={<Client/>} />
      </Routes>
    </div>
  );
};

export default Home;
