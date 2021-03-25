import React from "react";
import { Redirect, Route } from "react-router";
import {isAuthenticated} from "../js/auth";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={(props) =>
        isAuthenticated() ? (
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

export default PrivateRoute;