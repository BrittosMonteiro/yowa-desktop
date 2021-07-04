import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import { ArrowLeftCircle } from 'react-feather'

function History() {
    return(
        <React.Fragment>
            <section className="row">
                <div className="board">
                    <div className="board-top">
                        <Link to={'/'}>
                            <ArrowLeftCircle size={25} color={'#029DAF'}/>
                        </Link>
                    </div>
                    <div className="board-top">
                        <h1 className="board-title">Histórico de treino</h1>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default History;