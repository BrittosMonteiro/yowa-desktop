import React from 'react';
import '../css/header.css'
import logo from '../assets/icon/menu_bordo.png'

function  HeaderPublic(){
    return(
        <header className="headerPublic">
            <img src={logo} alt="" title="" id="logo" />
        </header>
    )
}

export default HeaderPublic;