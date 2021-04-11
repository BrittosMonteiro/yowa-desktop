import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import firebase from '../js/Firestore'

function Usuario(){

    const {id_usuario} = useParams()
    const { currentUser } = useAuth()
    const uid = currentUser.uid

    document.title = 'Yowa! | ' + uid

    const usuarioDB = firebase.firestore().collection('usuario')

    function getUserInfo(){
        usuarioDB
        .doc(id_usuario)
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return(
        <React.Fragment>
            {id_usuario}
        </React.Fragment>
    )
}

export default Usuario;