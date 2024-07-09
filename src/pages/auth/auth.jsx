import { Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import BgImage from "@/components/BgImage.jsx";
import auth from "@/assets/bg/auth.png"
import "./auth.css"

const Auth = () => {
    return ( 
        <div className="w-1/3">
            <BgImage picture={auth} />

            <Routes>
                <Route path="/" element={ <Login /> } />
                <Route path="/register" element={ <Register /> } />
            </Routes>

        </div>
     );
}
 
export default Auth;