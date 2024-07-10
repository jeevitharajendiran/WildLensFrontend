import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Register = () => {

    const navigate = useNavigate();

    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const[isValid,setIsValid]=useState(true)
    const[validPass,setValidPass]=useState(true)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passRegex=/^[a-zA-z0-9@_]{8,16}$/;

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
        
    const handlelog = async (e) => {
      e.preventDefault();

      let body = {
        email: email,
        password: password,
       }
  
      try {
        let res = await axios.post('http://localhost:3000/api/auth/login',body );
        res = res["data"];
        if( !res.error ){
           const token=res.token;
           localStorage.setItem( 'authToken', token );
           navigate(-1);
           window.alert("Logged In")
        }
        else{
          window.alert(res.error )   
        }
      } catch (err) {
        console.log(err);
      }
     }
  
    return (
      <div className='auth-content'>
        <div className="log">
          <Header />
            <form className="inps" onSubmit={handlelog}>
              <input type="email"  className={`p-2 ${isValid ? 'valid-email' : 'not_val'}`} onChange={handleChange} placeholder='Email' />
              <input type="password" title={passtip} className={`p-2 ${validPass ? 'valid-email' : 'not_val'}`}onChange={handlepass} placeholder='Password' />
              <input type='submit' value='Login'/>
            </form>
          <h3>Create an account?<Link to="/auth/register" className='ml-3 text-[#2571ff] hover:text-[#0582f7] hover:underline hover:decoration-[#0582f7] hover:underline-offset-4 transition-all duration-150 '>register</Link></h3>
        </div>
    </div>
    )
}

export default Register
