import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";

import Home from "@/pages/home/Home.jsx";
import Tours from "./pages/tours/Tours.jsx";
import Auth from "./pages/auth/auth";


const App = () => {

  const [ tours, setTours ] = useState( [] );

    useEffect( () => {
        let getData = async () => {
            let resp = await axios.get(`${config.API_URI}/tours/`);

            setTours( Object.values(resp["data"]) );
        }
        getData();
    }, [])

  return ( 
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={ <Home tours={tours}/>} />
          <Route path="/auth/*" element={ <Auth />} />
          <Route path="/tours" element={ <Tours tours={tours}/> } />
        </Routes>
      </Router>
    </div>
   );
}
 
export default App;