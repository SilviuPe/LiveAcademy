import React, { useEffect } from 'react';


import './StartPage_header.css';
import './StartPage_main.css';
import './StartPage_footer.css';


import logo from '../../assets/logo.png';
import layers from '../../assets/tabs.png';
import network from '../../assets/network.png';
import mail from '../../assets/mail.png';
import phone from '../../assets/telephone.png';


const ContactField = ({icon,text}) => {
    return (
        <div className='LiveAcademy_contact_field'>
            <img src = {icon}/>
            <p>{text}</p>
        </div>
    )
}

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

const Description = () => {
    useEffect(() => {
        const description = document.getElementsByClassName("LiveAcademy_main_description_container");
        description[0].classList.replace('notshow','show');
    },[]);

    return (
        <div className='LiveAcademy_main_description_container notshow'>
            <div className='LiveAcademy_description_1_content'>
                <div className='LiveAcademy_description_1_text_holder'>
                    <h1 >Welcome! Start your journey in coding on Live Academy</h1>
                    <p>Live Academy it's the place where you'll find people with the same interests as you</p>
                </div>
                <div className='LiveAcademy_description_1_image_holder'>
                    <img src = {layers}/>
                </div>
            </div>
            <div className='LiveAcademy_description_2_content'>
                <div className='LiveAcademy_description_2_text_holder'>
                    <h1>Connect with people across the world and grow together</h1>
                </div>
                <div className='LiveAcademy_description_2_image_holder'>
                    <img src = {network}/>
                </div>
            </div>
            <div className='LiveAcademy_mission_text'>
                <p>Communication is one of the most essential skill in the world. 
                    We want to bring you in our community, 
                    where you’ll find smart and cooperative people, 
                    express your idea, and achieve your goals</p>
            </div>
        </div>
    )
}


const StartPage = () => {
  return (
    <div className='LiveAcademy_StartPage_container'>
        <Header/>
        <main className='LiveAcademy_StartPage_main_container'>
            <Description/>
        </main>
        <footer className='LiveAcademy_footer'>
            <div className='LiveAcademy_message'>
                <h2>Thank you for spending your valuable time on out project</h2>
            </div>
            <div className='LiveAcademy_contacts'>
                <h1>Contact Info</h1>
                <div className='LiveAcademy_contact_fields'>
                    <ContactField icon = {mail} text = "liveacademy@gmail.com"/>
                    <ContactField icon = {phone} text = "(+40) 743 927 416" />
                </div>
            </div>
        </footer>
    </div>
  )
}

export default StartPage;
