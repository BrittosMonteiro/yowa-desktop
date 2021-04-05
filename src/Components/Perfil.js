import React, { useEffect, useState } from 'react';
import firebase from '../js/Firestore'
import { useAuth } from '../contexts/AuthContext'
import '../css/default.css'
import '../css/Perfil.css'

function Perfil() {

    const { currentUser } = useAuth()
    const uid = currentUser.uid

    const usuario = firebase.firestore().collection('usuario')
    const peso = firebase.firestore().collection('peso')

    const [name, setName] = useState('')
    const [sname, setSname] = useState('')
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [weight, setWeight] = useState()
    const [target, setTarget] = useState()

    async function getUser(){
        await usuario
        .doc(uid)
        .get()
        .then((doc) => {
            if(doc.exists){
                setName(doc.data().nome_usuario)
                setSname(doc.data().snome_usuario)
                setUser(doc.data().user_usuario)
                setEmail(doc.data().email_usuario)
            }
        })
    }

    async function getWeight(){
        await peso
        .where('key_usuario', '==', uid)
        .orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setWeight(doc.data().user_peso)
                setTarget(doc.data().meta)
            })
        })
    }

    async function updateUser(){
        await usuario
        .doc(uid)
        .update({
            nome_usuario: name,
            snome_usuario: sname,
            user_usuario: user,
            email_usuario: email
        })
        .then(() => {
            peso
            .add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                key_usuario: uid,
                meta: Number(target),
                user_peso: Number(weight)
            })
            .then(() => {
                let alertAlteracao = document.getElementById('alert-alteracao')
                alertAlteracao.style.display = 'flex'
                setTimeout(() => {
                    alertAlteracao.style.display = 'none'
                }, 3000)
            })
        }).catch((err) => {
            console.log('Caiu no catch!')
        })
    }

    useEffect(() => {
        getUser();
        getWeight();
    }, [])

    function focusOut(e){
        let content = e.value
        if(content === ''){
            e.style.borderColor = 'red'
        } else {
            e.style.borderColor = 'transparent'
            e.style.borderBottomColor = 'var(--bordo)'
        }
    }

    return (
    <React.Fragment>
        <section className="section">
            <div className="content-top">
                <h1 className="content-title">Perfil</h1>
            </div>
        </section>
        <section className="section row">
            <section className="section-block column">
                <div className="input-group justify-between">
                    <input
                        type="text"
                        name="name_usuario"
                        id="name_usuario"
                        className="input-perfil"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nome"
                        onBlur={e => focusOut(e.target)}/>

                    <input
                        type="text"
                        name="sname_usuario"
                        id="sname_usuario"
                        className="input-perfil"
                        value={sname}
                        onChange={e => setSname(e.target.value)}
                        placeholder="Sobrenome"
                        onBlur={e => focusOut(e.target)}/>
                </div>

                <div className="input-group justify-between">
                    <input
                        type="text"
                        name="user_usuario"
                        id="user_usuario"
                        className="input-perfil"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                        placeholder="Usuário"
                        onBlur={e => focusOut(e.target)}/>
                    
                    <input 
                        type="text"
                        name="email_usuario"
                        id="email_usuario"
                        className="input-perfil"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="E-mail"
                        onBlur={e => focusOut(e.target)}/>
                </div>
                <div className="input-group justify-between">
                    <input
                        type="number"
                        name="user_peso"
                        min="0"
                        step="0.1"
                        id="user_peso"
                        className="input-perfil"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        placeholder="Peso atual"
                        onBlur={e => focusOut(e.target)}/>
                    
                    <input 
                        type="number"
                        min="0"
                        step="0.1"
                        name="peso_meta"
                        id="peso_meta"
                        className="input-perfil"
                        value={target}
                        onChange={e => setTarget(e.target.value)}
                        placeholder="Meta de peso"
                        onBlur={e => focusOut(e.target)}/>
                </div>
                <button className="btn btn-salvar-alteracao" onClick={() => updateUser()}>
                    Salvar alterações
                </button>
                <span className="alteracao" id="alert-alteracao">Alteração concluída</span>
            </section>
            <section className="section-block column">

            </section>
        </section>
    </React.Fragment>
    )
}

export default Perfil;