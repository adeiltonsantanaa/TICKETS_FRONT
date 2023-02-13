import React, { useState } from "react";
import './style.css';
import { ImExit } from 'react-icons/im'
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { useNavigate } from "react-router-dom";

export default function ModalCriarConta(props) {

    const [username, setUsername] = useState();
    const [fullName, setFullName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const nav = useNavigate();

    const { openClose, nome } = props;

    function salvarTicket() {
        const dados = {
            username: username,
            fullName: fullName,
            password: password,
            email: email,
        }

        try {
            axios.post(`${BASE_URL}/auth/createUser`, dados)
                .then(res => alert("Usuário " + res.data.username + " criado!"))
        } catch (error) {
            console.log(error)
        }

    }

    return (<>
        <div className="backdrop">
            <div className="modalCriarConta-ticket">
                <div className="div-modalCriarConta-btn">
                    <button className="btn-modalCriarConta-exit" onClick={() => openClose(true)}><ImExit /></button>
                </div>
                <div className="div-modalCriarConta-interna">
                    <p>Digite abaixo informações do Ticket</p>
                    <div className="row-modalCriarConta-inputs">
                        <label htmlFor="input-modalCriarConta-username">Username:</label>
                        <input id="input-modalCriarConta-username" type="text" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="row-modalCriarConta-inputs">
                        <label htmlFor="input-modalCriarConta-nome">Nome Completo:</label>
                        <input id="input-modalCriarConta-nome" type="text" onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="row-modalCriarConta-inputs">
                        <label htmlFor="input-modalCriarConta-pwd">Password:</label>
                        <input id="input-modalCriarConta-pwd" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="row-modalCriarConta-inputs">
                        <label htmlFor="input-modalCriarConta-mail">E-mail:</label>
                        <input id="input-modalCriarConta-mail" type="text" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    
                    <div className="row-modalCriarConta-inputs">
                        <button onClick={salvarTicket} className="btn-modalCriarConta-submit">
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
