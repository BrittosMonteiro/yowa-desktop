import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import firebase from '../js/Firestore'
import '../css/VisualizarTreino.css'
import '../css/Exercicios.css'
import {MdAddCircleOutline} from 'react-icons/md'

import {RiDeleteBin5Fill} from 'react-icons/ri'
import { Link } from 'react-router-dom';

function VisualizarTreino() {
    let {id_atividade, nome_atividade} = useParams();
    document.title = 'Yowa! | Visualizar - ' + nome_atividade

    const [listaDescricao, setListaDescricao] = useState([])
    const [listaExercicios, setListaExercicios] = useState([])
    const [conteudo, setConteudo] = useState('')

    const exercicio = firebase.firestore().collection('exercicio')
    const descricao = firebase.firestore().collection('descricao')

    function getTreinoDescricao() {
        descricao
        .where('key_treino', '==', id_atividade)
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push({
                    ...doc.data(),
                    key: doc.id
                })
            })
            setListaDescricao(items)
        })
    }

    function getExercicios() {
        exercicio
        .orderBy('nome_exercicio', 'asc')
        .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push({...doc.data(), key: doc.id})
            })
            setListaExercicios(items)
        })
    }

    async function addDescricao(e, nome_exercicio) {
        await descricao
        .add({
            conteudo_descricao: conteudo,
            nome_exercicio: nome_exercicio,
            key_usuario: 'yx8SrqgeoHKg7rDw6m6r',
            key_treino: id_atividade,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            status_descricao: false
        })
        setConteudo('')
    }

      
    async function removerItem(e, idItem){
        e.preventDefault();
        await descricao
        .doc(idItem)
        .delete();
    }
    useEffect(() => {
        getExercicios();
        getTreinoDescricao();
    }, [])

    return (
        <React.Fragment>
            <section className="section">
                <div className="content-top">
                    <h1 className="content-title">{nome_atividade}</h1>
                    {listaDescricao.length > 0 ?
                    <Link to={"/atividade/"+id_atividade+"/"+nome_atividade}>
                        <button className="btn btn-start-activity">Iniciar atividade</button>
                    </Link>
                    :
                    ''
                    }
                </div>
            </section>
            <section className="section row">
                <section className="section-block column">
                    {listaDescricao.length > 0 ?
                    <React.Fragment>
                        <span className="content-subtitle">Etapas do meu treino</span>
                        <ol className="view-activity-list">
                        {listaDescricao.map((item, key) => (
                            <li className="view-activity-item" key={key}>
                                <div className="view-activity-item-title">
                                    <span className="view-activity-item-header">{item.nome_exercicio}</span>
                                    <span className="view-activity-item-sub">{item.conteudo_descricao}</span>
                                </div>
                                <RiDeleteBin5Fill style={{fontSize: '22px', cursor: 'pointer'}} onClick={e => removerItem(e, item.key)} />
                            </li>
                        ))}
                        </ol>
                    </React.Fragment>
                    :
                        <span className="content-subtitle">Você ainda não adicionou exercícios</span>
                    }
                </section>
                <section className="section-block column">
                    {listaExercicios.length > 0 ?
                    <React.Fragment>
                        <span className="content-subtitle">Adicione exercícios à sua atividade</span>
                        <ol className="exercise-list">
                            {listaExercicios.map((item, key) => (
                            <li className="exercise-list-item" key={key}>
                                <span className="exercise-list-item-header">{item.nome_exercicio}<MdAddCircleOutline style={{cursor: 'pointer', fontSize: '20px'}} onClick={e => addDescricao(e, item.nome_exercicio)}/></span>
                                <input type="text" className="exercise-list-item-input" name="item-description" onChange={e => setConteudo(e.target.value)} placeholder="Descrição sobre a atividade" />
                            </li>
                            ))}
                        </ol>
                    </React.Fragment>
                    :
                    ''
                    }
                </section>
            </section>
        </React.Fragment>
    )
}

export default VisualizarTreino;