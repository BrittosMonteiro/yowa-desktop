import React from "react";
import {
  Link
} from "react-router-dom";

import '../css/sidebar.css'
import {RiArtboardFill} from 'react-icons/ri'
import {FaDumbbell} from 'react-icons/fa'
import {RiFileListFill} from 'react-icons/ri'
import {RiUser5Fill} from 'react-icons/ri'
import {RiSettings2Fill} from 'react-icons/ri'
import {BsChatSquareDotsFill} from 'react-icons/bs'

class Sidebar extends React.Component{
    render() {
        return<div className="sidebar">
            <nav className="sidebar-nav">
                <ol className="nav-list">
                    <li className="list-item">
                        <Link to="/" className="item-link">
                            <RiArtboardFill style={{fontSize: '24px', color: '#eee'}}/>
                        </Link>
                        <span className="sidebar-toolTip">Dashboard</span>
                    </li>
                    <li className="list-item">
                        <Link to="/treinos" className="item-link">
                            <FaDumbbell style={{fontSize: '24px', color: '#eee'}}/>
                        </Link>
                        <span className="sidebar-toolTip">Treinos</span>
                    </li>
                    <li className="list-item">
                        <Link to="/historico" className="item-link">
                            <RiFileListFill style={{fontSize: '24px', color: '#eee'}}/>
                        </Link>
                        <span className="sidebar-toolTip">Histórico</span>
                    </li>
                    <li className="list-item">
                        <Link to="/perfil" className="item-link">
                            <RiUser5Fill style={{fontSize: '24px', color: '#eee'}}/>
                        </Link>
                        <span className="sidebar-toolTip">Perfil</span>
                    </li>
                    {/* <li className="list-item">
                        <Link to="/mensagens" className="item-link">
                            <BsChatSquareDotsFill style={{fontSize: '24px', color: '#eee'}}/>
                        </Link>
                        <span className="sidebar-toolTip">Mensagens</span>
                    </li> */}
                    <li className="list-item">
                        <Link to="/configuracoes" className="item-link">
                            <RiSettings2Fill style={{fontSize: '24px', color: '#eee'}}/>
                        </Link>
                        <span className="sidebar-toolTip">Configurações</span>
                    </li>
                </ol>
            </nav>
        </div>
    }
}

export default Sidebar;