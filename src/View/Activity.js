import React, {useEffect, useState} from 'react';
import firebase from '../js/Firestore'
import { Link } from 'react-router-dom'
import { ArrowLeftCircle } from 'react-feather'
import activityService from '../Services/ActivityService'
import { useAuth } from '../contexts/AuthContext'

import '../css/activity.css'

function Activity() {

    const [activitiesList, setActivitiesList] = useState([])
    const [activity, setActivity] = useState('')
    const { activityDB, createActivity, deleteActivity } = activityService
    const { currentUser } = useAuth()
    const uid = currentUser.uid

    async function readActivities() {
        activityDB
        .orderBy('createdAt', 'desc')
        .where('key_usuario', '==', uid)
        .onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach((documentSnapshot) => {
                list.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setActivitiesList(list);
            // setLoading(false);
        });
    }

    function create(e){
        e.preventDefault()
        if(activity && activity.trim()){
            createActivity(uid, activity)
            setActivity('')
        }
    }

    useEffect(() => {
        readActivities()
    })

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
                        <h1 className="board-title">Meus treinos</h1>
                    </div>
                    <form onSubmit={create} className="form">
                        <input
                            type="text"
                            value={activity}
                            placeholder="Criar um novo treino"
                            onChange={(e) => setActivity(e.target.value)}
                            className="input" />
                        <button className="btn">Adicionar</button>
                    </form>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Activity;