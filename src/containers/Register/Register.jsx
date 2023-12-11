import React from 'react';

import './Register.css';

import user from '../../assets/user.png';
import mail from '../../assets/mail.png';
import passwd from '../../assets/padlock.png';
import { useNavigate } from 'react-router-dom';

const RegisterField = ({icon,text,type}) => {
    return (
        <li className='LiveAcademy_field'>
            <img src = {icon}/>
            <input type = {type} placeholder={text}/>
        </li>
    );
}
const Register = () => {
  const navigate = useNavigate();
  const handleLoginButton = () => {
    navigate('/login');
  }
  const handleHomeButton = () => {
    navigate('/');
  }
  return (
    <div className='LiveAcademy_register_container'>
        <div className='LiveAcademy_register_content'>
             <h1>Register</h1>
             <ul className='LiveAcademy_register_fields'>
                <RegisterField icon = {user} text = "Username" type = "text"/>
                <RegisterField icon = {mail} text = "Email" type = "email"/>
                <RegisterField icon = {passwd} text = "Password" type = "password"/>
             </ul>
             <button>Submit</button>

             <p onClick = {handleLoginButton}>Already have an account? <span>Login</span></p>
             <p onClick = {handleHomeButton}> Want to go back to home page?</p>
        </div>
    </div>
  )
}

export default Register;
