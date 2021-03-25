import React from "react";
import { Redirect, Route } from "react-router";
import {isAuthenticated} from "../js/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={(props) =>
        !isAuthenticated() ? (
            <div className="app">
                <div className="main">
                    <Component {...props} />
                </div>
            </div>
        ) : (
        <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
        />
        )
    }
    />
)

export default PrivateRoute;