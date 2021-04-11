import React, { useState, useEffect } from 'react';
import '../css/default.css'
import '../css/Dashboard.css'
import ListarTreinos from './ListarTreinos';
import { useAuth } from '../contexts/AuthContext'
import firebase from '../js/Firestore'

import { FaChevronCircleUp } from 'react-icons/fa'
import { FaChevronCircleDown } from 'react-icons/fa'
import { BiTargetLock } from 'react-icons/bi'
import { RiScales2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom';

function Dashboard() {

    const { currentUser } = useAuth()
    const uid = currentUser.uid

    document.title = 'Yowa! | Dashboard'
    
    const [peso, setPeso] = useState([])
    const [variacao, setVariacao] = useState('');
    const [maisFrequentes, setMaisFrquentes] = useState([])

    const pesoDB = firebase.firestore().collection('peso')
    const treinosDB = firebase.firestore().collection('treino')
    const historicoDB = firebase.firestore().collection('historico')

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
    
    async function getAllWeight(){
        await pesoDB
        .where('key_usuario', '==', uid)
        .orderBy('createdAt', 'desc')
        .limit(2)
        .onSnapshot((querySnapshot) => {
            const itens = []
            querySnapshot.forEach((doc) => {
                itens.push({...doc.data(), id: doc.id})
            })
            setPeso(itens)
            if(itens.length === 2){
                setVariacao((itens[0].user_peso - itens[1].user_peso).toFixed(2))
            } else {
                setVariacao(0)
            }
        })
    }
    
    useEffect(() => {
        getAllWeight()
        countTreinos()
    }, [])
    
    function calcVariacao(){
        if(variacao > 0.000 && peso[0].user_peso <= peso[0].meta){
            return <FaChevronCircleUp className="variation-sign variation-green"/>
        } else {
            if(variacao > 0.000 && peso[0].user_peso > peso[0].meta){
                 return <FaChevronCircleUp className="variation-sign variation-red"/>
            } else {
                if(variacao < 0.000 && peso[0].user_peso <= peso[0].meta){
                    return <FaChevronCircleDown className="variation-sign variation-red"/>
                } else {
                    if(variacao < 0.000 && peso[0].user_peso > peso[0].meta){
                        return <FaChevronCircleDown className="variation-sign variation-green"/>
                    } else {
                        if(variacao > 0.000) {
                            return <FaChevronCircleUp className="variation-sign variation-blue"/>
                        } else {
                            if(variacao < 0.000) {
                                return <FaChevronCircleDown className="variation-sign variation-blue"/>
                            }
                        }
                    }
                }
            }
        }
    }
    
    return(
        <React.Fragment>
        <section className="section">
            <div className="content-top">
                <h1 className="content-title">Dashboard</h1>
            </div>
        </section>
        <section className="section row">
            <div className="section-block column">
                <ListarTreinos title="Últimos treinos" showButton="true" limited="true"/>
            </div>
            <div className="section-block column">
                <div className="board">
                    <h2 className="board-title">Treinos mais frequentes</h2>
                    {maisFrequentes.map((itens, index) => (
                        <Link className="board-link" key={itens.id} to={"/visualizarAtividade/"+itens.id+"/"+itens.nome_treino}>
                            {index+1}º - {itens.nome_treino}
                        </Link>
                    ))}
                </div>
                {/* <div className="board">
                    <h2 className="board-title">Treinos</h2>
                </div> */}
                {peso.length > 0 ?
                <div className="board">
                    <h2 className="board-title">Peso</h2>
                    <div className="board-cards">
                        <div className="inner-card">
                            <span className="inner-info"><strong>Atual</strong></span>
                            <span className="inner-info">{peso[0].user_peso.toFixed(1)} kg</span>
                            <RiScales2Line />
                        </div>
                        {
                            peso[1] ?
                        <div className="inner-card">
                            <span className="inner-info"><strong>Anterior</strong></span>
                            <span className="inner-info">{peso[1].user_peso.toFixed(1)} kg</span>
                            <RiScales2Line />
                        </div>
                        :
                            ''
                        }
                        {
                            peso[0].meta && (peso[0].meta > 0.00) ?
                        <div className="inner-card">
                            <span className="inner-info"><strong>Meta</strong></span>
                            <span className="inner-info">{peso[0].meta.toFixed(1)} kg</span>
                            <BiTargetLock />
                        </div>
                        :
                            ''
                        }
                        {
                            peso[1] ?
                        <div className="inner-card">
                            <span className="inner-info"><strong>Variação</strong></span>
                            <span className="inner-info">{variacao} kg</span>
                            {calcVariacao()}
                        </div>
                        :
                            ''
                        }
                    </div>
                </div>
                :
                    ''
                }
            </div>
        </section>

    </React.Fragment>
    )
}

export default Dashboard;