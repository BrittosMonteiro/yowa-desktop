import React, { useState } from 'react';
import activityService from '../Services/ActivityService'
import { useAuth } from '../contexts/AuthContext'

function Activity() {

    const [activity, setActivity] = useState('')
    const { createActivity } = activityService
    const { currentUser } = useAuth()
    const uid = currentUser.uid

    function create(){
        createActivity(uid, activity)
    }

    return(
        <React.Fragment>
        </React.Fragment>
    )
}

export default Activity;