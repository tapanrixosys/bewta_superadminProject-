import { useEffect } from "react";
import { useRoutes,useNavigate } from "react-router-dom";
import LayoutDesign from '../Component/LayoutPage/LayoutPage';
import Tenants from '../Component/TenantsPage/tenants'
import Support from "../Component/SupportPage/Support";
import Login from "../AuthPages/Login";
import DashBoard from "../Component/DashBoard/DashBoard";
import Pricing from "../Component/Pricing/Pricing";
import Team from "../Component/TeamPage/Team";
import FaqPage from "../Component/Faq/faq";
import SettingPage from "../Component/SettingPage/Setting";
import SupportViewdetails from "../Component/SupportPage/SupportViewdetails";
import TenantDetails from "../Component/TenantsPage/tenantsDetails";
import Cookies from "js-cookie";


export default function RoutePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");

        if (!token) {
            navigate("/login");
        }
    }, [navigate]);
   
    let routes = useRoutes([ 
        { 
            path: '/',
            element:<LayoutDesign/>,
          
            children: [
              { path: '/dashboard', element: <DashBoard /> },
                { path: '/tenants', element: <Tenants /> },
                { path: '/price', element: <Pricing /> },
                { path: '/support', element: <Support /> },
                { path: '/support-viewdetails/:id', element: <SupportViewdetails /> },
                { path: '/team', element: <Team /> },
                { path: '/faq', element: <FaqPage /> },
                { path: '/setting', element: <SettingPage /> },
                { path: '/tenant-details/:id', element: <TenantDetails/>}


            ] 
        },
        { path: 'login', element: <Login/> },
    ])
    return routes;
}

