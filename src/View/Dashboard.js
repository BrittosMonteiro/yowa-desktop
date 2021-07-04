import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import firebase from '../js/Firestore'
import { useAuth } from '../contexts/AuthContext'
import '../css/Dashboard.css'
import { ArrowRightCircle } from 'react-feather';
import { CheckCircle } from 'react-feather';
import { XCircle } from 'react-feather';
import { RotateCw } from 'react-feather';
import { Edit } from 'react-feather';

function Dashboard() {

    document.title = 'Yowa | Dashboard'

    const { currentUser } = useAuth()
    const uid = currentUser.uid

    const [historicoLimitado, setHistoricoLimitado] = useState([])
    const [maisFrequentes, setMaisFrquentes] = useState([])

    const listaHistorico = firebase.firestore().collection('historico')
    const treinosDB = firebase.firestore().collection('treino')

    function getLimitedTreinos(){
        listaHistorico
        .orderBy('createdAt', 'desc')
        .where('key_usuario', '==', uid)
        .limit(3)
        .onSnapshot((querySnapshot) => {
            const listaHistorico = []
            querySnapshot.forEach((documentSnapshot) => {
            listaHistorico.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            })
            })
            setHistoricoLimitado(listaHistorico)
        })
    }

    function countTreinos() {
        treinosDB
        .where('key_usuario', '==', uid)
        .orderBy('frequencia', 'desc')
        .orderBy('updatedAt')
        .limit(3)
        .onSnapshot((treinoSnapshot) => {
            const itens = []
            treinoSnapshot.forEach((doc) => {
                itens.push({...doc.data(), id: doc.id})
            })
            setMaisFrquentes(itens)
        })
    }

    useEffect(() => {
        getLimitedTreinos()
        countTreinos()
    }, [])

    return(
        <React.Fragment>
            <section className="row">
                <div className="board">
                    <div className="board-top">
                        <h1 className="board-title">Últimas atividades</h1>
                        <Link to={'/history'} className="btn btn-last-activities">Ver mais</Link>
                    </div>
                    {
                        historicoLimitado.length > 0 &&
                    <ol className="board-list">
                        {historicoLimitado.map((item) => (
                        <li key={item.key} className="board-list-item">
                            <div className="board-list-item-top">
                                <Link to={'/activity-review/'+item.key+'/'+item.nome_treino} className="board-list-item-name">
                                    {item.nome_treino}
                                </Link>
                                <Link to={''}>
                                    <RotateCw size={20} className="icon-link"/>
                                </Link>
                            </div>
                            <div className="board-list-item-brief">
                                <CheckCircle size={16} style={{marginRight: '5px'}}/>
                                <span className="board-list-item-brief-text">Completos: {item.finalizados.length}</span>
                            </div>
                            <div className="board-list-item-brief">
                                <XCircle size={16} style={{marginRight: '5px'}}/>
                                <span className="board-list-item-brief-text">Incompletos: {item.pendentes.length}</span>
                            </div>
                            <div className="board-list-item-brief brief-date">
                                {item.local_date}
                            </div>
                        </li> 
                        ))
                        }
                    </ol>
                    }
                </div>
                <div className="board">
                    <div className="board-top">
                        <h1 className="board-title">Mais frequentes</h1>
                        <Link to={'/activity'} className="btn btn-last-activities">Meus treinos</Link>
                    </div>
                    {
                        maisFrequentes.length > 0 &&
                    <ol className="board-list">
                        {
                            maisFrequentes.map((item) => (
                        <li key={item.id} className="board-list-item">
                            <div className="board-list-item-top">
                                <span className="board-list-item-name">{item.nome_treino}</span>
                                <Link to={'/activity-view/'+item.id+'/'+item.nome_treino}>
                                    <ArrowRightCircle size={20} className="icon-link"/>
                                </Link>
                            </div>
                        </li>
                            ))
                        }
                    </ol>
                    }
                    <div className="board-top">
                        <h1 className="board-title">Informações</h1>
                        <Link to={''}>
                            <Edit size={20} color={'#029DAF'} strokeWidth={'2px'}/>
                        </Link>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Dashboard;