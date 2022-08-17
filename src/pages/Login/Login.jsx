import React, { useRef } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const api_url=process.env.API_URL;

export default function Login() {
    const email=useRef();
    const password=useRef();
    const handleClick=async(e)=>{
        e.preventDefault();
        try{
            const user = (await axios.post(api_url+'/auth/login',{"email":email.current.value,"password":password.current.value})).data;
            sessionStorage.setItem("user",JSON.stringify(user));
            window.location.href="/";
        }
        catch(err){
            console.log(err);
        }
    };
    return (
      <div className="login" style={{ backgroundImage: `url(${PF}login2.jpg)` }}>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">RecipeBook</h3>
                    <span className="loginDesc">
                      find and post your favourite recipes.....
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" placeholder='Email' className="loginInput" ref={email} required/>
                        <input type="password" placeholder='Password' className="loginInput" ref={password} required minLength='6'/>
                        <button className="loginButton" onClick={handleClick}>Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register">
                            <button className="loginRegister">Create a new account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
