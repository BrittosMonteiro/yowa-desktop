import React from 'react';

import Header from "./Header"
import Sidebar from "./Sidebar";

import "../App.css";

class Root extends React.Component{
    render(){
        return <div className="App">
        <div className="main">
        <Header />
        <div className="container">
            <Sidebar />
            <div class="content">
            {this.props.children}
            </div>
        </div>
    </div>
    }
}

export default Root;