import React, { useState } from "react";
import Footer from "../../Components/Footer";
import './style.css';
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    async function login(e) {
        e.preventDefault();
        const data = {
            username,
            password,
        };
        try {
            const response = await axios.post(`${BASE_URL}/auth/signin`, data);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('name', response.data.username)
            localStorage.setItem('funcionario', response.data.nomeFuncionario)
            localStorage.setItem('codFuncionario', response.data.codFuncionario)
            localStorage.setItem('role', response.data.roles[0])
            console.log()
            history('/home')
        } catch (err) {
            alert("Login ou Senha incorreto, tente novamente!");
        }

    };

    return (
        <>
            <div className="div-login-container">
                <div className="div-login-box">
                    <div className="div-login-title">
                        <h2>Login em <strong>Tickets Uni LS</strong></h2>
                        <p>Sistema de realizações de chamados.</p>
                    </div>
                    <div className="div-login-inputs">
                        <form onSubmit={login}>
                            <div>
                                <label htmlFor="usr-login-input">Username</label>
                                <input id="usr-login-input" type="text" onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="usr-login-pwd">Password</label>
                                <input id="usr-login-pwd" type="password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <span><a href="mailto:tecnologia@unils.edu.br?subject=Problemas para fazer login no tickets">problemas com o Login</a></span>
                            <button className="btn-login" type="submit">Login</button>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
