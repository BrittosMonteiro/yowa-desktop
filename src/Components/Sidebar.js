import React from "react";
import {
  Link
} from "react-router-dom";

import '../css/sidebar.css'
import {FaDumbbell} from 'react-icons/fa'
import {RiFileListFill} from 'react-icons/ri'
import {RiUser5Fill} from 'react-icons/ri'
import {RiSettings2Fill} from 'react-icons/ri'
import {BsChatSquareDotsFill} from 'react-icons/bs'
import { Monitor } from 'react-feather';
import { List } from 'react-feather';
import { User } from 'react-feather';
import { Settings } from 'react-feather';

class Sidebar extends React.Component{
    render() {
        return(
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ol className="nav-list">
                        <li className="list-item">
                            <Link to="/" className="item-link">
                                <Monitor size={24}/>
                            </Link>
                            <span className="sidebar-toolTip">Dashboard</span>
                        </li>
                        <li className="list-item">
                            <Link to="/activity" className="item-link">
                                <FaDumbbell style={{fontSize: '24px', color: '#eee'}}/>
                            </Link>
                            <span className="sidebar-toolTip">Treinos</span>
                        </li>
                        <li className="list-item">
                            <Link to="/history" className="item-link">
                                <List size={24}/>
                            </Link>
                            <span className="sidebar-toolTip">Histórico</span>
                        </li>
                        <li className="list-item">
                            <Link to="/profile" className="item-link">
                                <User size={24}/>
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
                            <Link to="/settings" className="item-link">
                                <Settings size={24}/>
                            </Link>
                            <span className="sidebar-toolTip">Configurações</span>
                        </li>
                    </ol>
                </nav>
            </div>
        )
    }
}

export default Sidebar;