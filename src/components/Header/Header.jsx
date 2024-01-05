import React, { useState } from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom/dist';


import logo from '../../assets/logo.png';
import menu from '../../assets/menu.png';
import logout from '../../assets/logout.png';
import save from '../../assets/save.png';
import discard from '../../assets/discard.png';


const Option = ({image,text,save_callback}) => {
    return (
        <div className='LiveAcademy_option' onClick = {save_callback}>
            <img src = {image}/>
            <p>{text}</p>
        </div>
    )
}

const MenuContent = ({menu_status,save_callback}) => {
    return(
        <div className={`Menu-Content ${ menu_status ? 'open' : 'closed'}`}>
            <Option image = {save} text = 'save' save_callback = {save_callback}/>
            <Option image = {discard} text = 'discard'/>
            <Option image = {logout} text = 'logout'/>
        </div>  
    );
}
const Header = ({save_callback}) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
    <header className='LiveAcademy_header'>
        <div className='visibileContent'>
            <img className='logo' src = {logo}/>
            <a onClick = {() => { navigate('/settings')}}> Settings</a>
            <a onClick = {() => { navigate('/profile')}}> Profile</a>
            <a onClick = {() => { navigate('/connections')}}> Connections</a>
            <div className='Menu'>
                <img src = {menu} onClick = {() => {setMenuOpen(!menuOpen)}}/>
            </div>
        </div>
        <div className='LiveAcademy-menuContainer'>
            < MenuContent menu_status = {menuOpen} save_callback = {save_callback}/>
        </div>
    </header>
    )
}

export default Header;
