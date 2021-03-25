import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import firebase from '../js/Firestore';
import '../css/Exercicios.css'
import {MdAddCircleOutline} from 'react-icons/md'

function Exercicios(props) {

    let {id_atividade, nome_atividade} = useParams();

    const exercicio = firebase.firestore().collection('exercicio')
    const descricao = firebase.firestore().collection('descricao')
    const [listaExercicios, setListaExercicios] = useState([])
    const [conteudo, setConteudo] = useState('')

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
        alert(nome_exercicio)
        await descricao
          .add({
            conteudo_descricao: conteudo,
            nome_exercicio: nome_exercicio,
            key_usuario: 'yx8SrqgeoHKg7rDw6m6r',
            key_treino: id_atividade,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
      }

    useEffect(() => {
        getExercicios();
    }, [])

    return (
        <React.Fragment>
            <section className="section">
                <div className="content-top">
                    <h1 className="content-title">
                        Editar - {nome_atividade}
                    </h1>
                </div>
            </section>
            <section className="section row">
                <section className="section-block column">
                    {listaExercicios.length > 0 ?
                    <ol className="exercise-list">
                        {listaExercicios.map((item) => (
                        <li className="exercise-list-item">
                            <span className="exercise-list-item-header">{item.nome_exercicio}<MdAddCircleOutline style={{cursor: 'pointer', fontSize: '20px'}} onClick={e => addDescricao(e, item.nome_exercicio)}/></span>
                            <input type="text" className="exercise-list-item-input" name="item-description" onChange={e => setConteudo(e.target.value)} placeholder="Descrição sobre a atividade" />
                        </li>
                        ))}
                    </ol>
                    :
                    ''
                    }
                </section>
                <section className="section-block column">

                </section>
            </section>
        </React.Fragment>
    )
}

export default Exercicios;