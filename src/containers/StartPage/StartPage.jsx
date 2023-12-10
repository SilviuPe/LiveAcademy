import React from 'react';
import './StartPage.css';
import logo from '../../assets/logo.png';


const Header = () => { 
    return (
        <header className='LiveAcademy_header_content'>
            <div className='LiveAcademy_logo_holder'>
                <img src = {logo}/>
            </div>
            <div className='LiveAcademy_buttons'>
                <button className='LiveAcademy_register_button'>Register</button>
                <button className='LiveAcademy_login_button'>Login</button>
            </div>
        </header>
    );
}


const StartPage = () => {
  return (
    <div className='LiveAcademy_StartPage_container'>
        <Header/>
    </div>
  )
}

export default StartPage;
