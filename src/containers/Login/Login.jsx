import React, { useEffect, useState } from 'react';

import './Login.css';

import user from '../../assets/user.png';
import passwd from '../../assets/padlock.png';
import { useNavigate } from 'react-router-dom';

const LoginField = ({icon,text,type,callback, key_pressed_callback}) => {
    return (
        <li className='LiveAcademy_field'>
            <img src = {icon}/>
            <input type = {type} placeholder={text} onChange = {callback} onKeyPress = {(event) => {
              if (event.key === "Enter") {
                if (key_pressed_callback !== undefined) {
                  key_pressed_callback();
                }
              }
            }}/>
        </li>
    );
}
const Login = () => {

  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    if (sessionStorage.getItem('username'))
      navigate('/createCourse');
  },[])


  const handleRegisterButton = () => {
    navigate('/register');
  }
  const handleHomeButton = () => {
    navigate('/');
  }

  const [credentials, setCredentials] = useState({
    username : '',
    password: ''
  });
  const [error, setError] = useState('');
  const SendLoginRequest = () => {
    setError('');
    let json_data = {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(credentials)
    }

    fetch('http://localhost:3001/login', json_data)
    .then((response) => {
      if(response.status === 200) {
        window.location.href = '/createCourse';
      }
      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem('username', data.username);
      setError(data.Error);
    })
  }

  return (
    <div className='LiveAcademy_login_container'>
        <div className='LiveAcademy_login_content'>
             <h1>Login</h1>
             <ul className='LiveAcademy_login_fields'>
                <LoginField 
                  icon = {user} 
                  text = "Username" 
                  type = "text" 
                  callback = {(event) => {setCredentials({
                    username : event.target.value,
                    password : credentials['password']
                })}}/>
                <LoginField 
                  icon = {passwd} 
                  text = "Password" 
                  type = "password" 
                  callback = {(event) => {setCredentials({
                    username : credentials['username'],
                    password : event.target.value
                  })}}
                  key_pressed_callback={SendLoginRequest}
                />
             </ul>
             <button onClick = {SendLoginRequest}>Submit</button>

             <p onClick={handleRegisterButton}>Don't have an account? <span>Register</span></p>
             <p onClick = {handleHomeButton}> Want to go back to home page?</p>
             <p className='error'> {error} </p>
        </div>
    </div>
  )
}

export default Login;
