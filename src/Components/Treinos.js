import React, { useEffect, useState } from 'react';
import firebase from '../js/Firestore'
import {Link} from 'react-router-dom'
import '../css/default.css'
import '../css/Treinos.css'
import { useAuth } from '../contexts/AuthContext'

import {MdRemoveRedEye} from 'react-icons/md'
import {RiDeleteBin5Fill} from 'react-icons/ri'

function Treinos(){

    const [treinos, setTreinos] = useState([])
    const [nomeTreino, setNomeTreino] = useState('')
    const { currentUser } = useAuth()
    const uid = currentUser.uid
    
    const listarTreinos = firebase.firestore().collection('treino')

    function getTreinos() {
        listarTreinos
        // .orderBy('createdAt', 'desc')
        .where('key_usuario', '==', uid)
        .onSnapshot((querySnapshot) => {
            const listaTreinos = [];

            querySnapshot.forEach((documentSnapshot) => {
            listaTreinos.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
            });

            setTreinos(listaTreinos);
            // setLoading(false);
        });
    }

    useEffect(() => {
        getTreinos();
    }, [])

    async function createActivity(e) {
        e.preventDefault()
        if(nomeTreino !== '' && nomeTreino !== ' ' && nomeTreino != null){
            await listarTreinos.add({
            nome_treino: nomeTreino,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            key_usuario: uid,
            });
            setNomeTreino('')
        }
    }

    async function deleteActivity(e, idItem){
        e.preventDefault();
        listarTreinos.doc(idItem).delete()
    }

    return (
        <React.Fragment>
        <section className="section">
            <div className="content-top">
                <h2 className="content-title">Treinos</h2>
                {/* <Link to="/treinos">
                    <button className="btn btn-criar-treino">+Criar treino</button>
                </Link> */}
            </div>
        </section>
        <section className="section row">
            <section className="section-block column">
                <h1 className="">
                    Novo treino
                </h1>
                <form className="form">
                    <input type="text" className="novoTreino" name="novoTreino" placeholder="Dê um nome para seu treino" value={nomeTreino} onChange={e => setNomeTreino(e.target.value)} />
                    <button className="btn" onClick={e => createActivity(e)}>Adicionar</button>
                </form>
            </section>
            <section className="section-block column">
                <nav className="nav-listar-treino">
                    <ol className="list-activity">
                        {treinos.map((item) => 
                        <li className="list-activity-item" key={item.key}>
                            <span className="list-activity-name">{item.nome_treino}</span>
                            <div className="btn-action">
                                <Link to={"/visualizarAtividade/"+item.key+"/"+item.nome_treino} style={{display: 'flex'}} className="list-activity-item-link">
                                    <MdRemoveRedEye style={{fontSize: '20px', marginRight: '10px'}}/>
                                </Link>
                                
                                {/* <Link to={"/exercicios/"+item.key+"/"+item.nome_treino} style={{display: 'flex'}} className="list-activity-item-link">
                                    <RiPlayListAddLine style={{fontSize: '20px'}}/>
                                </Link> */}
                                
                                <RiDeleteBin5Fill style={{fontSize: '20px', marginLeft: '10px', cursor: 'pointer'}} onClick={e => deleteActivity(e, item.key)} />
                            </div>
                        </li>
                        )}
                    </ol>
                </nav>
            </section>
        </section>
        
    </React.Fragment>
    )
}

export default Treinos;