import firebase from '../js/Firestore'

const treinoDB = firebase.firestore().collection('treino')
const listaTreinos = [];

function createTreino(nome_treino, createdAt, key_usuario){
    treinoDB.add({
        nome_treino: nome_treino,
        createdAt: createdAt,
        key_usuario: key_usuario,
    })
}

function readTreino(key_usuario){

    treinoDB
    .where('key_usuario', '==', key_usuario)
    .onSnapshot((querySnapshot) => {
        listaTreinos.length = 0;
        querySnapshot.forEach((documentSnapshot) => {
            listaTreinos.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });
    });

    return listaTreinos;
};

function deleteTreino(id_item){
    treinoDB
    .doc(id_item)
    .delete()
};

const api = {
    treinoDB,
    createTreino,
    readTreino,
    deleteTreino,
}

export default api;