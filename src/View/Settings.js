import React, { useState } from 'react'
import exerciseService from '../Services/ExerciseService'

function Settings() {

    document.title = 'Yowa | Configurações'

    const [exercise, setExercise] = useState('')
    const { createExercise } = exerciseService

    function create(){
        createExercise(exercise)
    }

    return (
        <>
        </>
    )
}

export default Settings