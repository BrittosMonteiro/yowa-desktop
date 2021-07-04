import firebase from '../js/Firestore'

const userDB = firebase.firestore().collection('user')
const userList = [];

function createUser(){
    
}

function readUser(){

}

function updateUser(){

}

function deleteUser(){

}

const userService = {
    userDB,
    createUser,
    readUser,
    updateUser,
    deleteUser
}

export default userService;