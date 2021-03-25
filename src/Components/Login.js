import React from 'react'
import '../css/form.css'

function Login() {
    return (
        <>
            <form name="form-login" id="form-login" className="form-login">
                <h1 className="form-title">Acessar minha conta</h1>
                <div className="error-message" id="error-message">
                </div>
                <div className="form-label">
                    <label for="username">Usuário</label>
                    <input type="text" name="username" id="username" className="form-input" required autofocus />
                </div>
                <div class="form-label">
                    <label for="password">Senha</label>
                    <input type="password" name="password" id="password" className="form-input" required />
                </div>
                <button className="btn btn-acessar" id="btn-acessar">Acessar</button>
            </form>
        </>
    )
}

export default Login;