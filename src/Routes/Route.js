// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// // import Login from '../../Login/Login';
// // import DashBoard from '../../DashBoard/DashBoard';
// // import Client from '../../Client/Client';

// const RoutePage = () => {
    
//   return (
//     <div>
//       <Routes>
//         {/* Route for login page */}
//         {/* <Route path="/" element={<Login />} /> */}

//         {/* Route for dashboard page */}
//         {/* <Route path="/dashboard" element={<DashBoard />} /> */}
//         {/* <Route path="/client" element={<Client/>} /> */}
//       </Routes>
//     </div>
//   );
// };

// export default RoutePage;

   

import { useRoutes } from "react-router-dom";
import LayoutDesign from '../Component/LayoutPage/LayoutPage';
import Tenants from '../Component/TenantsPage/tenants'
import Support from "../Component/SupportPage/Support";
import Login from "../AuthPages/Login";
import DashBoard from "../Component/DashBoard/DashBoard";
import Pricing from "../Component/Pricing/Pricing";
import Team from "../Component/TeamPage/Team";
import FaqPage from "../Component/Faq/faq";
import SettingPage from "../Component/SettingPage/Setting";

export default function RoutePage() {
   
    let routes = useRoutes([ 
        { 
            path: '/',
            element:<LayoutDesign/>,
            // element: <Login/>,
            // element: <LayoutDesign />, 
          
            children: [
              { path: '/dashboard', element: <DashBoard /> },
                { path: '/tenants', element: <Tenants /> },
                { path: '/price', element: <Pricing /> },
                { path: '/support', element: <Support /> },
                { path: '/team', element: <Team /> },
                { path: '/faq', element: <FaqPage /> },
                { path: '/setting', element: <SettingPage /> },


            ] 
        },
        { path: 'login', element: <Login/> },
    ])
    return routes;
}

