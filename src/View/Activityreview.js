import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { ArrowLeftCircle } from 'react-feather'
import activityService from '../Services/ActivityService'
import { useAuth } from '../contexts/AuthContext'

function Activityreview() {

    let {activity_id, activity_name} = useParams();
    document.title = 'Yowa! | Visualizar - ' + activity_name

    const { currentUser } = useAuth()
    const uid = currentUser.uid

    return(
        <React.Fragment>
            <section className="row">
                <div className="board">
                    <div className="board-top">
                        <Link to={'/history'}>
                            <ArrowLeftCircle size={25} color={'#029DAF'}/>
                        </Link>
                    </div>
                    <div className="board-top">
                        <h1 className="board-title">{activity_name}</h1>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Activityreview;