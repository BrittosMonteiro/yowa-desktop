import React from 'react';
import '../css/default.css'
import '../css/Dashboard.css'
import ListarTreinos from './ListarTreinos';

function Dashboard() {
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
            <div className="section-block row">
                <div className="board">
                    <h2 className="board-title">Último treino</h2>
                </div>
                <div className="board">
                    <h2 className="board-title">Treino mais frequente</h2>
                </div>
                <div className="board">
                    <h2 className="board-title">Treinos</h2>
                </div>
                <div className="board">
                    <h2 className="board-title">Peso</h2>
                </div>
            </div>
        </section>

    </React.Fragment>
    )
}

export default Dashboard;