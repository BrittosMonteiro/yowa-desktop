import firebase from '../js/Firestore'

const exerciseDB = firebase.firestore().collection('exercise')
const exerciseList = [];

function createExercise(name){
    if(name){
        exerciseDB
        .add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            exercise_name: name
        })
        .then(() => {
            console.log('Cadastrado')
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

function readExercise(){

}

function updateExercise(key, name){
    exerciseDB
    .doc(key)
    .update({
        exercise_name: name
    })
    .then(() => {
        console.log('Atualizado')
    })
    .catch((err) => {
        console.log(err)
    })
}

function deleteExercise(key){
    exerciseDB
    .doc(key)
    .delete()
}

const exerciseService = {
    exerciseDB,
    createExercise,
    readExercise,
    updateExercise,
    deleteExercise,
}

export default exerciseService;