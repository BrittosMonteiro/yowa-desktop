import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from '../contexts/AuthContext'

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

function PrivateRoute({ component: Component, ...rest }){

    const { currentUser } = useAuth()

    return (
    <Route
    {...rest}
    render={(props) =>
        currentUser ? (
                <div className="app">
                    <div className="main">
                        <Header />
                        <div className="container">
                            <Sidebar />
                            <div className="content" style={{ color: "#eee" }}>
                                <div className="limit">
                                    <Component {...props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        ) : (
        <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
        />
        )
    }
    />
    )
}

export default PrivateRoute;