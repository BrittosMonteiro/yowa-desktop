import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import firebase from '../js/Firestore'
import { useAuth } from '../contexts/AuthContext'
import '../css/Atividade.css'
import {IoCheckmarkDoneSharp} from 'react-icons/io5'
import {MdClear} from 'react-icons/md'

function Atividade(){

    let {id_atividade, nome_atividade} = useParams();
    document.title = 'Yowa! | Executando - ' + nome_atividade
    
    const { currentUser } = useAuth()
    const uid = currentUser.uid
    
    const history = useHistory()

    const descricao = firebase.firestore().collection('descricao')
    const historico = firebase.firestore().collection('historico')
    const treino = firebase.firestore().collection('treino')

    const [itensPendentes, setItensPendentes] = useState([])
    const listaPendentes = []
    const [itensFeitos, setItensFeitos] = useState([])
    const listaFeitos = []
    
    const [segundo, setSegundo] = useState(0)
    const [minuto, setMinuto] = useState(0)
    const [hora, setHora] = useState(0)

    function getAllDescricao(){
        descricao
        .where('key_treino', '==', id_atividade)
        .onSnapshot((querySnapshot) => {
            const items = []
            const pendentes = []
            const feitos = []
            querySnapshot.forEach((doc) => {
                if(doc.data().status_descricao === false){
                    pendentes.push({...doc.data(), key: doc.id})
                } else{
                    if(doc.data().status_descricao === true){
                        feitos.push({...doc.data(), key: doc.id})
                    }
                }
                items.push({...doc.data(), key: doc.id})
            })
            setItensPendentes(pendentes)
            setItensFeitos(feitos)
        })
    }

    async function statusItem(item, status, key) {
        if (status === false) {
            descricao.doc(key).update({
                status_descricao: true,
            });
        } else {
            descricao.doc(key).update({
                status_descricao: false,
            });
        }
        getAllDescricao()
    }

    async function addHistorico(){

        await itensPendentes.map((item) => (
            listaPendentes.push(item.nome_exercicio+' ,-, '+item.conteudo_descricao)
        ))

        await itensFeitos.map((item) => (
            listaFeitos.push(item.nome_exercicio+' ,-, '+item.conteudo_descricao)
        ))
        
        await historico
        .add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            local_date: new Date().toLocaleDateString('pt-BR'),
            local_time: new Date().toLocaleTimeString('pt-BR'),
            finalizados: listaFeitos,
            key_usuario: uid,
            local: 'Local teste',
            nome_treino: nome_atividade,
            id_atividade: id_atividade,
            pendentes: listaPendentes,
            tempo_treino: `${hora}:${minuto < 10 ? '0'+minuto : minuto}:${segundo < 10? '0'+segundo : segundo}`
        }).then(() => {
            descricao
            .where('key_treino', '==', id_atividade)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let status = doc.data().status_descricao
                    let idDesc = doc.id
                    if(status === true){
                        descricao.doc(idDesc).update({status_descricao: false})
                    }
                })
            })
            
            treino
            .doc(id_atividade)
            .get()
            .then((item) => {
                treino
                .doc(id_atividade)
                .update({
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    frequencia: item.data().frequencia+1,
                })
            })

            history.push('/')
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            descricao
            .where('key_treino', '==', id_atividade)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let status = doc.data().status_descricao
                    let idDesc = doc.id
                    if(status === true){
                        descricao.doc(idDesc).update({status_descricao: false})
                    }
                })
            })
        })
        history.push('/')
    }

    useEffect(() => {
        const interval = setInterval(() => {
        if (segundo === 59 && minuto !== 59) {
            setSegundo((segundos) => segundos - 60);
            setMinuto((minutos) => minutos + 1);
            } else {
                if (segundo === 59 && minuto === 59) {
                    setSegundo((segundos) => segundos - 60);
                    setMinuto((minutos) => minutos - 59);
                    setHora((horas) => horas + 1);
                }
            }
    
            setSegundo((segundos) => segundos + 1);
        }, 1000);
        return () => clearInterval(interval);
        
    });

    useEffect(() => {
        getAllDescricao()
    }, [])
    

    return (
    <React.Fragment>
        <section className="section">
            <div className="content-top">
                <h1 className="content-title">Executar - {nome_atividade}</h1>
            </div>
            <div className="content-top">
                <h1 className="content-title">
                    Tempo - {hora}:{minuto < 10 ? '0'+minuto : minuto}:{segundo < 10? '0'+segundo : segundo}
                </h1>
                <button className="btn" onClick={() => addHistorico()}>
                    Finalizar
                </button>
            </div>
        </section>
        <section className="section row">
            <section className="section-block column">
                {itensPendentes.length > 0 ?
                    <>
                        <span className="content-subtitle">Pendentes</span>
                        <ol className="list-execute">
                        {itensPendentes.map((item) => (
                            <li className="list-execute-item" key={item.key}>
                                <div className="view-activity-item-title">
                                    <span className="view-activity-item-header">{item.nome_exercicio}</span>
                                    <span className="view-activity-item-sub">{item.conteudo_descricao}</span>
                                </div>
                                {item.status_descricao === false ? 
                                <IoCheckmarkDoneSharp onClick={() => statusItem(
                                    item.nome_exercicio,
                                    item.status_descricao,
                                    item.key,
                                )} style={{fontSize: '20px', cursor: 'pointer'}}/>
                                :
                                <MdClear onClick={() => statusItem(
                                    item.nome_exercicio,
                                    item.status_descricao,
                                    item.key,
                                )} style={{fontSize: '20px', cursor: 'pointer'}}/>
                                }
                            </li>
                        ))}
                        </ol>
                    </>
                :
                    <span className="content-subtitle">Voc?? concluiu todos os exerc??cios</span>
                }
            </section>
            <section className="section-block column">
                {itensFeitos.length > 0 ?
                <>
                    <span class="content-subtitle">Feitos</span>
                    <ol className="list-execute">
                    {itensFeitos.map((item) => (
                        <li className="list-execute-item" key={item.key}>
                            <div className="view-activity-item-title">
                                <span className="view-activity-item-header">{item.nome_exercicio}</span>
                                <span className="view-activity-item-sub">{item.conteudo_descricao}</span>
                            </div>
                            {item.status_descricao === false ? 
                            <IoCheckmarkDoneSharp onClick={() => statusItem(
                                item.nome_exercicio,
                                item.status_descricao,
                                item.key,
                            )} style={{fontSize: '20px', cursor: 'pointer'}}/>
                            :
                            <MdClear onClick={() => statusItem(
                                item.nome_exercicio,
                                item.status_descricao,
                                item.key,
                            )} style={{fontSize: '20px', cursor: 'pointer'}}/>
                            }
                        </li>
                    ))}
                    </ol>
                </>
                :
                    <span className="content-subtitle">Voc?? ainda n??o concluiu nenhum exerc??cio ;(</span>
                }
            </section>
        </section>
    </React.Fragment>
    )
}

export default Atividade;