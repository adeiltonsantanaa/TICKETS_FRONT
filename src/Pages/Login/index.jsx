import React, { useState } from "react";
import Footer from "../../Components/Footer";
import './style.css';
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import ModalCriarConta from "../../Components/ModalCriarConta";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


export default function Login() {
    const [openModal, setOpenModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const history = useNavigate();


    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/auth/signin`, { username, password });
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('name', response.data.username);
            localStorage.setItem('funcionario', response.data.nomeFuncionario);
            localStorage.setItem('codFuncionario', response.data.codFuncionario);
            localStorage.setItem('role', response.data.roles[0]);
            localStorage.setItem('expiration', response.data.expiration);
            history('/home');
        } catch (err) {
            toast.warning("Login ou Senha incorretos!")
        }
    };

    function togglePasswordVisibility() {
        setShowPassword((prevState) => !prevState);
    }

    function handleModal() {
        setOpenModal(!openModal);
    }

    return (
        <>
            <ToastContainer />
            {openModal && <ModalCriarConta openClose={handleModal} />}
            <div className="div-login-container">
                <div className="div-login-box">
                    <div className="div-login-title">
                        <h2>Login em <strong>Tickets Uni LS</strong></h2>
                        <p>Sistema de realizações de chamados.</p>
                    </div>
                    <div className="div-login-inputs">
                        <form onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="usr-login-input">Username</label>
                                <input id="usr-login-input" required type="text" onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="usr-login-pwd">Password</label>
                                <div className="password-input">
                                    <input id="usr-login-pwd" type={showPassword ? 'text' : 'password'} required onChange={e => setPassword(e.target.value)} />
                                    <button type="button" className="btn-login-eye" onClick={togglePasswordVisibility}>{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                                </div>
                            </div>
                            <button className="btn-login" type="submit">Login</button>
                        </form>
                        <button onClick={handleModal}>Criar conta</button>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

