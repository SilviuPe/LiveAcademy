import React, { useEffect, useState } from 'react';

import './Register.css';

import user from '../../assets/user.png';
import mail from '../../assets/mail.png';
import passwd from '../../assets/padlock.png';
import { useNavigate } from 'react-router-dom';



const RegisterField = ({icon,text,type,callback, key_pressed_callback}) => {
    return (
        <li className='LiveAcademy_field'>
            <img src = {icon}/>
            <input type = {type} placeholder={text} onChange = {callback} onkeyPress = {(event) => {
              if(event.key === "Enter") {
                if(key_pressed_callback !== undefined) {
                  key_pressed_callback();
                }
              } 
            }}/>
        </li>
    );
}
const Register = () => {

  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    if (sessionStorage.getItem('username'))
      navigate('/createCourse');
  },[])

  const [credentials, setCredentials] = useState({
    username : '',
    email : '',
    password : ''
  })
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLoginButton = () => {
    navigate('/login');
  }
  const handleHomeButton = () => {
    navigate('/');
  }

  const SendRegisterRequest = () => {
    setError('');
    setMessage('');
    let json_data = {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(credentials)
    }

    fetch('http://localhost:3001/register', json_data)
    .then((response) => {
      if(response.status === 201) setMessage('Your account has been created!')
      return response.json();
    })
    .then((data) => {
      setError(data.Error);
    })
  }

  return (
    <div className='LiveAcademy_register_container'>
        <div className='LiveAcademy_register_content'>
             <h1>Register</h1>
             <ul className='LiveAcademy_register_fields'>
                <RegisterField icon = {user} text = "Username" type = "text" callback = {(event) => {
                  setCredentials({
                    'username':event.target.value,
                    'email': credentials['email'],
                    'password' : credentials['password']
                  })
                }}/>
                <RegisterField 
                icon = {mail} 
                text = "Email" 
                type = "mail" 
                callback = {(event) => {
                  setCredentials({
                    'username':credentials['username'],
                    'email': event.target.value,
                    'password' : credentials['password']
                  })
                }}/>
                <RegisterField 
                  icon = {passwd} 
                  text = "Password" 
                  type = "password" 
                  callback = {(event) => {
                  setCredentials({
                    'username':credentials['username'],
                    'email': credentials['email'],
                    'password' : event.target.value
                  })
                  }}
                  key_pressed_callback={ SendRegisterRequest }
                />
             </ul>
             <button onClick={SendRegisterRequest}>Submit</button>

             <p onClick = {handleLoginButton}>Already have an account? <span>Login</span></p>
             <p onClick = {handleHomeButton}> Want to go back to home page?</p>
             <p className='error'>{error}</p>
             <p className='message'>{message}</p>
        </div>
    </div>
  )
}

export default Register;
