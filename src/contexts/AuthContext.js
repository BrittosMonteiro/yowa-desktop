import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../js/Firestore'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState('')
    const [loading, setLoading] = useState(true)

    function login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
    }

    function signup(email, pass){
        return auth.createUserWithEmailAndPassword(email, pass)
    }

    function logout(){
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const values = {
        currentUser,
        login,
        signup,
        logout,
    }
    return (
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
