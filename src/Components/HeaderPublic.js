import React from 'react';
import '../css/header.css'
import logo_branco from '../assets/icon/menu.png'
import logo_bordo from '../assets/icon/menu_bordo.png'

function  HeaderPublic(){
    return(
        <header className="headerPublic">
            <img src={logo_branco} alt="" title="" id="logo" />
        </header>
    )
}

export default HeaderPublic;