import React, { useState } from 'react';

import './Register.css';

import user from '../../assets/user.png';
import mail from '../../assets/mail.png';
import passwd from '../../assets/padlock.png';
import { useNavigate } from 'react-router-dom';



const RegisterField = ({icon,text,type,callback}) => {
    return (
        <li className='LiveAcademy_field'>
            <img src = {icon}/>
            <input type = {type} placeholder={text} onChange = {callback}/>
        </li>
    );
}
const Register = () => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username : '',
    mail : '',
    password : ''
  })


  const handleLoginButton = () => {
    navigate('/login');
  }
  const handleHomeButton = () => {
    navigate('/');
  }

  const SendRegisterRequest = () => {
    let json_data = {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(credentials)
    }

    fetch('http://localhost:3001/register', json_data)
    .then(
      response => {
        console.log(response);
      }
    )
  }

  return (
    <div className='LiveAcademy_register_container'>
        <div className='LiveAcademy_register_content'>
             <h1>Register</h1>
             <ul className='LiveAcademy_register_fields'>
                <RegisterField icon = {user} text = "Username" type = "text" callback = {(event) => {
                  setCredentials({
                    'username':event.target.value,
                    'mail': credentials['mail'],
                    'password' : credentials['password']
                  })
                  console.log(credentials);
                }}/>
                <RegisterField icon = {mail} text = "Email" type = "mail" callback = {(event) => {
                  setCredentials({
                    'username':credentials['username'],
                    'mail': event.target.value,
                    'password' : credentials['password']
                  })
                }}/>
                <RegisterField icon = {passwd} text = "Password" type = "password" callback = {(event) => {
                  setCredentials({
                    'username':credentials['username'],
                    'mail': credentials['mail'],
                    'password' : event.target.value
                  })
                }}/>
             </ul>
             <button onClick={SendRegisterRequest}>Submit</button>

             <p onClick = {handleLoginButton}>Already have an account? <span>Login</span></p>
             <p onClick = {handleHomeButton}> Want to go back to home page?</p>
        </div>
    </div>
  )
}

export default Register;
