import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function PassRecovery() {

    const emailRef = useRef();
    const { resetPassword } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState('none')
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        resetPassword(emailRef.current.value)
    }

    return (
        <>
            <form onSubmit={handleSubmit} name="form-login" id="form-login" className="form-login">
                <h1 className="form-title">Recuperar senha</h1>
                <div className="error-message" id="error-message" style={{display: display}}>
                    {error}
                </div>
                <div className="form-label">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" ref={emailRef} className="form-input" required />
                </div>
                <button className="btn btn-acessar" disabled={loading} id="btn-acessar">Recuperar</button>
                <Link to="/login" className="form-link-new-account">
                    Já possui uma conta? Acesse já!
                </Link>
            </form>
        </>
    )
}

export default PassRecovery;