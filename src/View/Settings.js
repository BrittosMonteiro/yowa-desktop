import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import { ArrowLeftCircle } from 'react-feather'

import exerciseService from '../Services/ExerciseService'

function Settings() {

    document.title = 'Yowa | Configurações'

    const [exercise, setExercise] = useState('')
    const { createExercise } = exerciseService

    function create(){
        createExercise(exercise)
    }

    return (
        <React.Fragment>
            <section className="row">
                <div className="board">
                    <div className="board-top">
                        <Link to={'/'}>
                            <ArrowLeftCircle size={25} color={'#029DAF'}/>
                        </Link>
                    </div>
                    <div className="board-top">
                        <h1 className="board-title">Configurações</h1>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Settings