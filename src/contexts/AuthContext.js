import React, { useContext, useEffect, useState } from 'react'
import firebase, { auth } from '../js/Firestore'

const AuthContext = React.createContext()
const usuarioDocuments = firebase.firestore().collection('usuario')

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState('')
    const [loading, setLoading] = useState(true)

    function login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
    }

    function signup(name, sname, username, email, pass){
        return auth.createUserWithEmailAndPassword(email, pass)
        .then((user) => {
            let newUid = user.user.uid
            usuarioDocuments.doc(newUid).set({
              nome_usuario: name,
              snome_usuario: sname,
              user_usuario: username,
              email_usuario: email,
              pass_usuario: pass
            }).then(() => {
              console.log('Cadastrado com sucesso!')
            }).catch(err => {
              console.log('Não foi possível cadastrar!')
            })
          })
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
