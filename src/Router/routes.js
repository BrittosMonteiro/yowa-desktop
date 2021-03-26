import React from "react";
import {
  Route,
} from "react-router-dom";

import PrivateRoute from '../Router/PrivateRoute'
import PublicRoute from '../Router/PublicRoutes'
import Dashboard from '../Components/Dashboard'
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

class Routes extends React.Component{
    render(){
      return(
        <>
          <PrivateRoute exact path="/" component={Dashboard}/>
          <PrivateRoute path="/treinos" component={Treinos}/>
          <PrivateRoute path="/historico" component={Historico}/>
          <PrivateRoute path="/perfil" component={Perfil}/>
          <PrivateRoute path="/configuracoes" component={Configuracoes}/>
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