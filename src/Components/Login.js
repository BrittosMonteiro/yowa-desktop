import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../css/form.css'

function Login() {

    const userRef = useRef();
    const passRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState('none')
    const history = useHistory()

    async function handleSubmit(event){
        event.preventDefault()

        try{
            setLoading(true)
            await login(userRef.current.value, passRef.current.value)
            .then(() => {
                return history.push('/')
            })
        } catch {
            setDisplay('flex')
            setTimeout(() => {
                setDisplay('none')
            }, 5000)
            setError('Não foi possível acessar :/')
        }
        setLoading(false)
    };

    return (
        <>
            <form onSubmit={handleSubmit} name="form-login" id="form-login" className="form-login">
                <h1 className="form-title">Acessar minha conta</h1>
                <div className="error-message" id="error-message" style={{display: display}}>
                    {error}
                </div>
                <div className="form-label">
                    <label htmlFor="username">Email</label>
                    <input type="text" name="username" id="username" ref={userRef} className="form-input" required />
                </div>
                <div className="form-label">
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" ref={passRef} className="form-input" required />
                </div>
                <button className="btn btn-acessar" disabled={loading} id="btn-acessar">Acessar</button>
                <Link to="/password-recovery" className="form-pass-recovery">
                    Recuperar senha
                </Link>
                <Link to="/signup" className="form-link-new-account">
                    Ainda não tem uma conta? Crie já!
                </Link>
            </form>
        </>
    )
}

export default Login;