import firebase from '../js/Firestore'

const historyDB = firebase.firestore().collection('history')
const historyList = [];

function createHistory(){

}

function readHistory(){

}

function updateHistory(){

}

function deleteHistory(){

}

const historyService = {
    historyDB,
    createHistory,
    readHistory,
    updateHistory,
    deleteHistory,
}

export default historyService