import React from "react";
import './style.css';


export default function Login() {

    return (
        <div className="div-login-container">
            <div className="div-login-box">
                <div className="div-login-title">
                    <h2>Sign in to <strong>Tickets Uni LS</strong></h2>
                    <p>Sistema de realizações de chamados.</p>
                </div>
                <div className="div-login-inputs">
                    <div>
                        <label htmlFor="usr-login-input">Username</label>
                        <input id="usr-login-input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="usr-login-pwd">Password</label>
                        <input id="usr-login-pwd" type="password" />
                    </div>
                    <span><a href="mailto:tecnologia@unils.edu.br?subject=Problemas para fazer login no tickets">problemas com o Login</a></span>
                    <button className="btn-login">Login</button>
                </div>
            </div>
        </div>
    )
}
