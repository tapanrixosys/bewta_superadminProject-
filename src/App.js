import "./App.css";
import {Toaster} from 'react-hot-toast'
import Sidebar from "./Pages/DashBoard/Sidebar/Sidebar";

import Home from "./Pages/Routes/Home/Home";

function App() {
  return (
    <div className="App">
      
        <Home></Home>
        <Toaster />
        
      
    </div>
  );
}

export default App;
