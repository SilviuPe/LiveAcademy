import React from 'react';

import './Register.css';

import user from '../../assets/user.png';
import mail from '../../assets/mail.png';
import passwd from '../../assets/padlock.png';


const RegisterField = ({icon,text,type}) => {
    return (
        <li className='LiveAcademy_field'>
            <img src = {icon}/>
            <input type = {type} placeholder={text}/>
        </li>
    );
}
const Register = () => {
  return (
    <div className='LiveAcademy_register_container'>
        <div className='LiveAcademy_register_content'>
             <h1>Register</h1>
             <ul className='LiveAcademy_register_fields'>
                <RegisterField icon = {user} text = "Username" type = "text"/>
                <RegisterField icon = {mail} text = "Email" type = "email"/>
                <RegisterField icon = {passwd} text = "Password" type = "password"/>
             </ul>
        </div>
    </div>
  )
}

export default Register;
