import React, { useEffect, useState } from 'react';
import '../css/header.css'
import logo from '../assets/icon/menu.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import firebase from '../js/Firestore'
import {WiDayCloudy} from 'react-icons/wi'
import {FaSignOutAlt} from 'react-icons/fa'

function  Header(){
    
    let lon, lat, now
    // let city, max, min, feel, humi, mainDesc
    let w = window.innerWidth

    const { logout, currentUser } = useAuth()
    const uid = currentUser.uid
    const [temperatura, setTemperatura] = useState('')
    const [username, setUsername] = useState()

    const usuarioDoc = firebase.firestore().collection('usuario')

    async function getUserInformation(){
        await usuarioDoc
        .doc(uid)
        .get()
        .then((doc) => {
            if(doc.exists){
                setUsername(doc.data().user_usuario)
            }
        })
    }

    function kelvinToCelcius(k) {
        let c = k - 273.15
        return c.toFixed(1);
    }

    function weather() {

        navigator.geolocation.getCurrentPosition(success);

        function success(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            let url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=592d5bfcaea57c8701f7f1714d5e0b7e'

            fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {

                // city = data.name
                
                // max = data.main.temp_max
                // min = data.main.temp_min
                now = data.main.feels_like
                // feel = data.main.temp
                // humi = data.main.humidity
                // mainDesc = data.weather[0].description

                setTemperatura(kelvinToCelcius(now))
            })
        }
    }
    useEffect(() => {
        weather()
        getUserInformation()
    }, [])

    function closeSuspendedMenu(){
        let suspendedMenu = document.getElementById('suspended-menu')
        suspendedMenu.style.display = 'none'
    }

    function openSuspendeMenu(){
        let suspendedMenu = document.getElementById('suspended-menu')
        if(w <= 450){
            suspendedMenu.style.display = 'flex'
        }
    }

    function handleLogout(){
        logout()
    }

    return(
    <header className="header">
        <nav className="suspended-menu" id="suspended-menu" onMouseLeave={() => closeSuspendedMenu()}>
            <ol className="suspended-menu-list">
                <Link to="/dashboard" className="suspended-menu-list-item">
                    <li>
                        Dashboard
                    </li>
                </Link>
                <Link to="/treinos" className="suspended-menu-list-item">
                    <li>
                        Treinos
                    </li>
                </Link>
                <Link to="/historico" className="suspended-menu-list-item">
                    <li>
                        Histórico
                    </li>
                </Link>
                <Link to="/perfil" className="suspended-menu-list-item">
                    <li>
                        Perfil   
                    </li>
                </Link>
                <Link to="/configuracoes" className="suspended-menu-list-item">
                    <li>
                        Configurações
                    </li>
                </Link>
                <Link to="/Sair" className="suspended-menu-list-item">
                    <li>
                        Sair
                    </li>
                </Link>
            </ol>
        </nav>
        <div className="img-area" onClick={() => openSuspendeMenu()} onMouseOver={() => openSuspendeMenu()}>
            <img src={logo} alt="" title="" id="logo" onClick={() => openSuspendeMenu()} onMouseOver={() => openSuspendeMenu()} />
        </div>
        <div className="temperatura">{temperatura}ºC&nbsp;<WiDayCloudy style={{color: '#eee', fontSize: '32px'}}/></div>
        <span className="user-header">Olá, {username}&nbsp;|&nbsp;<FaSignOutAlt title="Sair" style={{cursor: 'pointer'}} onClick={logout}/></span>
    </header>
    )
}

export default Header;