import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import firebase from '../js/Firestore'
import '../css/default.css'
import '../css/ResumoTreino.css'

import {MdDoneAll} from 'react-icons/md'
import {MdClear} from 'react-icons/md'
import {IoCalendarSharp} from 'react-icons/io5'
import {MdPlace} from 'react-icons/md'
import {BsClockFill} from 'react-icons/bs'

function ResumoTreino(){
    let {id_atividade, nome_atividade} = useParams();

    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [finalizados, setFinalizados] = useState([]);
    const [pendentes, setPendentes] = useState([]);
    const [local, setLocal] = useState('');
    const [tempo, setTempo] = useState('');

    const historico = firebase.firestore().collection('historico')

    function getDescricaoHistorico(){
        historico.doc(id_atividade)
        .onSnapshot((documentSnapshot) => {
          setData(
            new Date(
              documentSnapshot.data().createdAt.toDate(),
            ).toLocaleDateString('pt-BR'),
          );
          setHora(
            new Date(
              documentSnapshot.data().createdAt.toDate(),
            ).toLocaleTimeString('pt-BR'),
          );
          setFinalizados(documentSnapshot.data().finalizados);
          setPendentes(documentSnapshot.data().pendentes);
          setLocal(documentSnapshot.data().local);
          setTempo(documentSnapshot.data().tempo_treino);
        });
    }

    useEffect(() => {
        getDescricaoHistorico()
    }, [])

    return(
    <React.Fragment>
        <section className="section">
          <div className="content-top">
            <h1 className="content-title">Resumo</h1>
          </div>
        </section>
        <section className="section column">
          <span className="content-subtitle">
            {nome_atividade}
          </span>
          <span className="content-subtitle">
            <IoCalendarSharp />&nbsp;{data} - {hora}
          </span>
          <span className="content-subtitle">
            <MdPlace />&nbsp;{local}
          </span>
          <span className="content-subtitle">
            <BsClockFill />&nbsp;{tempo}
          </span>
          <section className="section row">
            <section className="section-block column">
              {finalizados.length > 0 ?
              <React.Fragment>
                <span className="content-subtitle">Finalizados</span>
                <ol className="list-activities">
                  {finalizados.map((item, key) => (
                    <li className="list-activities-item" key={key}>
                    <div className="view-activity-item-title">
                        <span className="view-activity-item-header">
                        <MdDoneAll style={{color: 'green'}}/>&nbsp;{item.split(' ,-, ')[0]}
                        </span>
                        <span className="view-activity-item-sub">{item.split(' ,-, ')[1]}</span>
                    </div>
                    </li>
                  ))}
                </ol>
              </React.Fragment>
              :
              <span className="content-subtitle">Você não completou nenhuma atividade!</span>
              }
            </section>
            <div className="section-block column">
              {pendentes.length > 0 ?
              <React.Fragment>
                <span className="content-subtitle">Pendentes</span>
                <ol className="list-activities">
                  {pendentes.map((item, key) => (
                    <li className="list-activities-item" key={key}>
                      <div className="view-activity-item-title">
                          <span className="view-activity-item-header">
                            <MdClear style={{color: 'red'}}/>&nbsp;{item.split(' ,-, ')[0]}
                          </span>
                          <span className="view-activity-item-sub">{item.split(' ,-, ')[1]}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </React.Fragment>
              :
              <span className="content-subtitle">Você completou todas as atividades!</span>
              }
            </div>
          </section>
        </section>
    </React.Fragment>
    )
}

export default ResumoTreino;