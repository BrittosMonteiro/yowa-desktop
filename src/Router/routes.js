import React from "react";

import PrivateRoute from '../Router/PrivateRoute'
import PublicRoute from '../Router/PublicRoutes'
// import Dashboard from '../Components/Dashboard'
import Treinos from '../Components/Treinos'
import Historico from '../Components/Historico'
import Perfil from '../Components/Perfil'
import Configuracoes from '../Components/Configuracoes'
import ResumoTreino from '../Components/ResumoTreino'
import VisualizarAtividade from "../Components/VisualizarAtividade"
import Exercicios from '../Components/Exercicios'
import Atividade from '../Components/Atividade'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import PassRecovery from "../Components/PassRecovery";

import Dashboard from '../View/Dashboard'
import Activity from '../View/Activity'
import Exercise from '../View/Exercise'
import History from '../View/History'
import Profile from '../View/Profile'
import Settings from '../View/Settings'
import Activityview from "../View/Activityview";
import Activityreview from "../View/Activityreview";

class Routes extends React.Component{
    render(){
      return(
        <>
          {/* Rotas privadas */}
          <PrivateRoute exact path="/" component={Dashboard}/>
          <PrivateRoute path="/activity" component={Activity}/>
          <PrivateRoute path="/activity-view/:activity_id/:activity_name" component={Activityview}/>
          <PrivateRoute path="/activity-review/:activity_id/:activity_name" component={Activityreview}/>
          <PrivateRoute path="/exercise/:activity_id/:activity_name" component={Exercise}/>
          <PrivateRoute path="/history" component={History}/>
          <PrivateRoute path="/profile" component={Profile}/>
          <PrivateRoute path="/settings" component={Settings}/>
          {/*  Rotas públicas */}
          <PublicRoute path="/login" component={Login}/>
          <PublicRoute path="/password-recovery" component={PassRecovery}/>
          <PublicRoute path="/signup" component={Signup}/>
        </>
      )
    }
}

export default Routes;