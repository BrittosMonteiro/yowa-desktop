import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ component: Component, ...rest }){

    const { currentUser } = useAuth()

    return (
    <Route
    {...rest}
    render={(props) =>
        !currentUser ? (
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
}

export default PrivateRoute;