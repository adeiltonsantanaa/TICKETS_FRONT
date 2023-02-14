import React, { useState } from "react";
import Footer from "../../Components/Footer";
import './style.css';
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import ModalCriarConta from "../../Components/ModalCriarConta";

export default function Login() {

    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [eye, setEye] = useState(false);
    const history = useNavigate();

    function openClose(data) {
        setOpen(!open)
    }

    function passwordView() {
        let value = document.getElementById('usr-login-pwd');
        if (value.type === "password") {
            setEye(!eye)
            return value.type = 'text'
        }
        setEye(!eye)
        return value.type = 'password'
    }

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
            localStorage.setItem('expiration', response.data.expiration)
            history('/home')
        } catch (err) {
            alert("Login ou Senha incorreto, tente novamente!");
        }

    };

    return (
        <>
            {open && (
                <ModalCriarConta openClose={openClose}/>
            )}
            <div className="div-login-container">
                <div className="div-login-box">
                    <div className="div-login-title">
                        <h2>Login em <strong>Tickets Uni LS</strong></h2>
                        <p>Sistema de realizações de chamados.</p>
                    </div>
                    <div className="div-login-inputs">
                        <form  onSubmit={login}>
                            <div>
                                <label htmlFor="usr-login-input">Username</label>
                                <input id="usr-login-input" required type="text" onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="usr-login-pwd">Password</label>
                                <input id="usr-login-pwd" type="password" required onChange={e => setPassword(e.target.value)} />
                                <button className="btn-login-eye" type="button" onClick={passwordView}>{eye ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                            </div>
                            <button className="btn-login" type="submit">Login</button>
                        </form>
                        <button onClick={openClose}>criar conta</button>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
