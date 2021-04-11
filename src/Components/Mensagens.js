import React, { useState, useEffect } from 'react';
import '../css/default.css'
import '../css/Mensagens.css'
import ListarTreinos from './ListarTreinos';
import { useAuth } from '../contexts/AuthContext'
import firebase from '../js/Firestore'
import { Link } from 'react-router-dom';

function Mensagens() {
    
    const { currentUser } = useAuth()
    const uid = currentUser.uid
    document.title= 'Yowa! | Mensagens'

    const usuarioDB = firebase.firestore().collection('usuario')

    const [users, setUsers] = useState([])

    function handleSearchUser(e){
        if(e!== ''){
            usuarioDB
            .where('nome_usuario', '>=', e)
            .where('nome_usuario', '<=', e+ '\uf8ff')
            .onSnapshot((querySnapshot) => {
                const items = []
                querySnapshot.forEach((doc) => {
                    items.push({...doc.data(), id: doc.id})
                })
                setUsers(items)
            })
        } else {
            setUsers(0)
        }
    }

    //criar chat - meu uid & uid do user - keep history - disable history

    return (
        <React.Fragment>
            <section className="section">
                <div className="content-row">
                    <h2 className="content-title">Mensagens</h2>
                </div>
            </section>
            <section className="section row">
                <section className="section-block column">
                    <div className="section row">
                        <input type="text" className="novoTreino" placeholder="Procurar usuários" onChange={(e) => handleSearchUser(e.target.value)} />
                    </div>
                    {users ? (
                        <ol className="list">
                            {users.map((u) => (
                                u.id !== uid ?
                                <li className="list-item-default justify-between" key={u.id}>
                                    {u.nome_usuario}
                                </li>
                                :
                                ''
                            ))}
                        </ol>
                    )
                    :
                    ''
                    }
                </section>
                <section className="section-block column">
                    exibir conversas abertas
                </section>
            </section>
        </React.Fragment>
    )
}

export default Mensagens;