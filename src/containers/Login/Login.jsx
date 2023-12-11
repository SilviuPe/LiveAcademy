import React, { useState } from 'react';

import './Login.css';

import user from '../../assets/user.png';
import passwd from '../../assets/padlock.png';
import { useNavigate } from 'react-router-dom';

const LoginField = ({icon,text,type}) => {
    return (
        <li className='LiveAcademy_field'>
            <img src = {icon}/>
            <input type = {type} placeholder={text}/>
        </li>
    );
}
const Login = () => {
  const navigate = useNavigate();
  const handleRegisterButton = () => {
    navigate('/register');
  }
  const handleHomeButton = () => {
    navigate('/');
  }

  return (
    <div className='LiveAcademy_login_container'>
        <div className='LiveAcademy_login_content'>
             <h1>Login</h1>
             <ul className='LiveAcademy_login_fields'>
                <LoginField icon = {user} text = "Username" type = "text"/>
                <LoginField icon = {passwd} text = "Password" type = "password"/>
             </ul>
             <button>Submit</button>

             <p onClick={handleRegisterButton}>Don't have an account? <span>Register</span></p>
             <p onClick = {handleHomeButton}> Want to go back to home page?</p>
        </div>
    </div>
  )
}

export default Login;
