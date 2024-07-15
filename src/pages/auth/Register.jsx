import Header from '@/components/Header';
import axios from 'axios';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import config from '@/config';

const Register = () => {
    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const[isValid,setIsValid]=useState(true)
    const[validPass,setValidPass]=useState(true)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passRegex=/^[a-zA-z0-9@_]{8,16}$/;
    const navigate = useNavigate();

    let passtip = "Password Must contain 8 - 16 characters\nIt can include Alphabets, digits, @ and _";

    const handlepass = (e) => {
        const pass=e.target.value;
        setPassword(pass);
        setValidPass(passRegex.test(pass));
      };

    const handleChange = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
        setIsValid(emailRegex.test(emailInput));
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      let body = {
        email: email,
        password: password,
        fullName: name
       }
  
      try {
        const res = await axios.post(`${config.API_URI}/auth/register`,body, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if( !res.error ){
          window.alert( res["data"]["message"] );
          navigate("/auth/");
        }
        else{
          window.alert(res["data"]["error"])
        }
      } catch (err) {
        console.log(err);
      }
    };
     
  
    return (
      <div className='auth-content'>
        <div className="log">

            <Header />

            <form className="inps" onSubmit={handleSubmit}>
              <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='Name' className='p-2'/>
              <input type="text" className={`p-2 ${isValid ? 'valid-email' : 'not_val'}`}onChange={handleChange} placeholder='Email' />
              <input type="password" title={passtip} className={`p-2 ${validPass ? 'valid-email' : 'not_val'}`}onChange={handlepass} placeholder='Password' />
              <input type='submit' value="Sign Up"/> 
            </form>
          <h3>Already Have An Account?<Link to="/auth/" className='ml-3 text-[#2571ff] hover:text-[#0582f7] hover:underline hover:decoration-[#0582f7] hover:underline-offset-4 transition-all duration-150 '>Login</Link></h3>
  
        </div>
    </div>
    )
}

export default Register
