import React, { useEffect, useState } from 'react'
import firebase from '../js/Firestore'
import '../css/ListarTreinos.css'
import {Link} from 'react-router-dom'
import {MdDoneAll} from 'react-icons/md'
import {MdClear} from 'react-icons/md'
import {MdRemoveRedEye} from 'react-icons/md'
import {RiDeleteBin5Fill} from 'react-icons/ri'
import { useAuth } from '../contexts/AuthContext'

function ListarTreinos(props) {

    
    const [historico, setHistorico] = useState([])
    const [historicoLimitado, setHistoricoLimitado] = useState([])
    const { currentUser } = useAuth()
    const uid = currentUser.uid
    
    const listaHistorico = firebase.firestore().collection('historico')
    const treinoDB = firebase.firestore().collection('treino')
    
    function getLimitedTreinos(){
        listaHistorico
        .orderBy('createdAt', 'desc')
        .where('key_usuario', '==', uid)
        .limit(3)
        .onSnapshot((querySnapshot) => {
            const listaHistorico = [];
            querySnapshot.forEach((documentSnapshot) => {
            listaHistorico.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
            });
            setHistoricoLimitado(listaHistorico);
        });
    }

    function getAllTreinos(){
        listaHistorico
        .orderBy('createdAt', 'desc')
        .where('key_usuario', '==', uid)
        .onSnapshot((querySnapshot) => {
            const listaHistorico = [];

            querySnapshot.forEach((documentSnapshot) => {
            listaHistorico.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
                data_hora: documentSnapshot.data().createdAt
            });
            });

            setHistorico(listaHistorico);
        });
    }

    function deleteActivity(e, idItem, idAtividade){
        e.preventDefault();
        listaHistorico
        .doc(idItem)
        .delete()
        .then(() => {
            treinoDB
            .doc(idAtividade)
            .get()
            .then((item) => {
                treinoDB
                .doc(idAtividade)
                .update({
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    frequencia: item.data().frequencia-1,
                })
            })
        })
    }

    useEffect(() => {
        getAllTreinos();
        getLimitedTreinos();
    }, [])
    
    return(
    <React.Fragment>
        <div className="content-top">
            {(historicoLimitado.length > 0 || historico.length > 0) ?
                <h2 className="content-title">{props.title}</h2>
            :
                <h2 className="content-title">Voc?? ainda n??o treinou</h2>
            }
            {props.showButton === 'true' ?
            <Link to="/historico">
                <button className="btn btn-ver-mais">+Hist??rico</button>
            </Link>
            : ''}
        </div>
        {(historicoLimitado.length > 0 || historico.length > 0) ?
        <nav className="nav-listar-treino">
            <ol className="listar-treino-list">
                {props.limited === 'true' ?
                    historicoLimitado.map((item) => 
                    <li key={item.key} className="listar-list-item">
                        <div className="listar-list-item-sub justify-between align-start">
                            <span className="activity-name">{item.nome_treino}</span>
                            {item.local_date}
                        </div>
                        <div className="listar-list-item-sub row justify-between align-end">
                            <div className="summary">
                                <span className="summary-status">
                                    <MdDoneAll style={{color: 'green', marginRight: '5px'}}/>
                                    &nbsp;Completos: {item.finalizados.length}
                                </span>
                                <span className="summary-status">
                                    <MdClear style={{color: 'red', marginRight: '5px'}} />
                                    &nbsp;Incompletos: {item.pendentes.length}
                                </span>
                            </div>
                            <div className="item-action">
                            <Link to={"/resumo-treino/"+item.key+"/"+item.nome_treino}>
                                <MdRemoveRedEye style={{fontSize: '20px', marginLeft: '10px', cursor: 'pointer'}} />
                            </Link>
                            </div>
                        </div>
                    </li>
                    )
                :
                    historico.map((item) => 
                    <li key={item.key} className="listar-list-item">
                        <div className="listar-list-item-sub justify-between align-start">
                            <span className="activity-name">{item.nome_treino}</span>
                            {item.local_date}
                        </div>
                        <div className="listar-list-item-sub row justify-between align-end">
                            <div className="summary">
                                <span className="summary-status">
                                    <MdDoneAll style={{color: 'green', marginRight: '5px'}}/>
                                    &nbsp;Completos: {item.finalizados.length}
                                </span>
                                <span className="summary-status">
                                    <MdClear style={{color: 'red', marginRight: '5px'}} />
                                    &nbsp;Incompletos: {item.pendentes.length}
                                </span>
                            </div>
                            <div className="item-action">
                            <Link to={"/resumo-treino/"+item.key+"/"+item.nome_treino}>
                                <MdRemoveRedEye style={{fontSize: '20px', marginLeft: '10px', cursor: 'pointer'}} />
                            </Link>
                            <RiDeleteBin5Fill style={{fontSize: '20px', marginLeft: '10px', cursor: 'pointer'}} onClick={e => deleteActivity(e, item.key, item.id_atividade)}/>
                            </div>
                        </div>
                    </li>
                    )
                }
            </ol>
        </nav>
        :
        ''
        }
    </React.Fragment>
    )
}

export default ListarTreinos;