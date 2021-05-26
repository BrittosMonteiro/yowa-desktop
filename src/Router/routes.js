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

class Routes extends React.Component{
    render(){
      return(
        <>
          <PrivateRoute exact path="/" component={Dashboard}/>
          <PrivateRoute path="/activity" component={Activity}/>
          <PrivateRoute path="/exercise" component={Exercise}/>
          <PrivateRoute path="/history" component={History}/>
          <PrivateRoute path="/profile" component={Profile}/>
          {/* */}
          <PrivateRoute path="/treinos" component={Treinos}/>
          <PrivateRoute path="/historico" component={Historico}/>
          <PrivateRoute path="/perfil" component={Perfil}/>
          <PrivateRoute path="/settings" component={Settings}/>
          <PrivateRoute path="/resumo-treino/:id_atividade/:nome_atividade" component={ResumoTreino}/>
          <PrivateRoute path="/visualizarAtividade/:id_atividade/:nome_atividade" component={VisualizarAtividade}/>
          <PrivateRoute path="/exercicios/:id_atividade/:nome_atividade" component={Exercicios}/>
          <PrivateRoute path="/atividade/:id_atividade/:nome_atividade" component={Atividade}/>
          <PublicRoute path="/login" component={Login}/>
          <PublicRoute path="/password-recovery" component={PassRecovery}/>
          <PublicRoute path="/signup" component={Signup}/>
        </>
      )
    }
}

export default Routes;