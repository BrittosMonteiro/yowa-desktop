import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {

    const nameRef = useRef()
    const snameRef = useRef()
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwRef = useRef()
    const confirmPasswRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState('none')
    const history = useHistory()

    async function handleSubmit(event) {
        event.preventDefault();

        if(passwRef.current.value !== confirmPasswRef.current.value){
            return (
                setDisplay('flex'),
                setTimeout(() => {
                    setDisplay('none')
                }, 5000),
                setError('Senhas não idênticas!')
            )
        }

        try{
            setError('')
            setLoading(true)
            await signup(
                nameRef.current.value,
                snameRef.current.value,
                usernameRef.current.value,
                emailRef.current.value,
                passwRef.current.value)
            .then(() => {
                history.push('/login')
            })
        } catch {
            setDisplay('flex')
            setTimeout(() => {
                setDisplay('none')
            }, 5000)
            setError('Não foi possível cadastrar :/')
        }
        setLoading(false)
    };
    
    return (
        <>
            <form onSubmit={handleSubmit} name="form-login" id="form-login" className="form-login">
                <h1 className="form-title">Criar uma conta</h1>
                <div className="error-message" id="error-message" style={{display: display}}>
                    {error}
                </div>
                <div className="form-label">
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" ref={nameRef} className="form-input" required autoFocus={true} />
                </div>
                <div className="form-label">
                    <label htmlFor="sname">Sobrenome</label>
                    <input type="text" name="sname" id="sname" ref={snameRef} className="form-input" required />
                </div>
                <div className="form-label">
                    <label htmlFor="username">Usuário</label>
                    <input type="text" name="username" id="username" ref={usernameRef} className="form-input" required />
                </div>
                <div className="form-label">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" ref={emailRef} className="form-input" required />
                </div>
                <div className="form-label">
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" ref={passwRef} className="form-input" required />
                </div>
                <div className="form-label">
                    <label htmlFor="re-password">Repita</label>
                    <input type="password" name="re-password" id="re-password" ref={confirmPasswRef} className="form-input" required />
                </div>
                <button className="btn btn-acessar" id="btn-acessar" disabled={loading}>Acessar</button>
                <Link to="/login" className="form-link-new-account">
                    Já possui uma conta? Acesse já!
                </Link>
            </form>
        </>
    )
}
