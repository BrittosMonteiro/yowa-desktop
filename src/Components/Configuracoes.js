import React, { useEffect, useState } from 'react';
import firebase from '../js/Firestore'

function Confirugacoes() {

    const [nomeExercicio, setNomeExercicio] = useState([])

    const exercicio = firebase.firestore().collection('exercicio')

    async function createExercicio(e) {
        e.preventDefault()
        if(nomeExercicio !== '' && nomeExercicio !== ' ' && nomeExercicio != null){
            await exercicio.add({
            nome_exercicio: nomeExercicio,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                setNomeExercicio('')
                let alertAlteracao = document.getElementById('alert-alteracao')
                alertAlteracao.style.display = 'flex'
                setTimeout(() => {
                    alertAlteracao.style.display = 'none'
                }, 3000)
            }).catch((err) => {
                console.log('Caiu no catch!')
            });
        }
    }

    return(
    <React.Fragment>
        <section className="section">
            <div className="content-top">
                <h1 className="content-title">Configurações</h1>
            </div>
        </section>
        <section className="section row">
            <section className="section-block column">
                <h1 className="">
                    Novo exercício
                </h1>
                <form className="form">
                    <input type="text" className="novoTreino" name="novoTreino" placeholder="Nome exercício" value={nomeExercicio} onChange={e => setNomeExercicio(e.target.value)} />
                    <button className="btn" onClick={e => createExercicio(e)}>Adicionar</button>
                    <span className="alteracao" id="alert-alteracao">Exercício cadastrado</span>
                </form>
            </section>
        </section>
    </React.Fragment>
    )
}

export default Confirugacoes;