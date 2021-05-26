import firebase from '../js/Firestore'

const activityDB = firebase.firestore().collection('activity')
const activityList = [];

function createActivity(key, name){
    if(key && name){
        activityDB.add({
            activity_name: name,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            frequency: 0,
            key_user: key,
        })
        .then(() => {
            console.log('Cadastrado')
        })
        .catch((err) => {
            console.log('Erro ao cadastrar - ' + err)
        })
    }
}

function readActivity(){
    
}

function updateActivity(key, name){
    if(key && name){
        activityDB
        .doc(key)
        .update({
            activity_name: name,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log('Atualizado!')
        })
        .catch((err) => {
            console.log('Erro ao atualizar - ' + err)
        })
    }
}

function deleteActivity(key){
    if(key){
        activityDB
        .doc(key)
        .delete()
        .then(() => {
            console.log('Excluído!')
        })
        .catch((err) => {
            console.log('Erro ao excluir - ' + err)
        })
    }
}

const activityService = {
    activityDB,
    createActivity,
    readActivity,
    updateActivity,
    deleteActivity,
}

export default activityService;