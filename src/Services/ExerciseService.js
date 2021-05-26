import firebase from '../js/Firestore'

const exerciseDB = firebase.firestore().collection('exercise')
const exerciseList = [];

function createExercise(){

}

function readExercise(){

}

function updateExercise(){

}

function deleteExercise(){

}

const exerciseService = {
    exerciseDB,
    createExercise,
    readExercise,
    updateExercise,
    deleteExercise,
}

export default exerciseService;