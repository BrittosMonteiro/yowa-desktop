import React from 'react';
import '../css/default.css'
import ListarTreinos from './ListarTreinos';

function Historico(){
    return (
    <React.Fragment>
        <section className="section">
            <div className="content-top">
                <h1 className="content-title">Histórico</h1>
            </div>
        </section>
        <section className="section row">
            <section className="section-block column">
                <ListarTreinos title="Todos os treinos" showButton="false"/>
            </section>
            <section className="section-block column"></section>
        </section>

    </React.Fragment>
    )
}

export default Historico;