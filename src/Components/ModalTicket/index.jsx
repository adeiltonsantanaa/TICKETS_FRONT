import React, { useState } from "react";
import './style.css';
import { ImExit } from 'react-icons/im'
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { useNavigate } from "react-router-dom";

export default function ModalTicket({ openClose }) {

    const [assunto, setAssunto] = useState();
    const [problema, setProblema] = useState();
    const nav = useNavigate();


    function salvarTicket() {
        const cod = localStorage.getItem("codFuncionario")
        const token = localStorage.getItem("accessToken")
        const dados = {
            codTicket: null,
            assunto: assunto,
            ativo: true,
            problemas: {
                codProblema: problema
            },
            funcionarios: {
                codFuncionario: cod
            }
        }
        try {
            axios.post(`${BASE_URL}/api/ticket/salvar`, dados, { headers: { Authorization: 'Bearer ' + token } })
                .then(res => nav('/interacao', { state: { id: res.data.codTicket } }))
        } catch (error) {
            console.log(error)
        }

    }

    return (<>
        <div className="backdrop">
            <div className="modal-ticket">
                <div className="div-modal-btn">
                    <button className="btn-modal-exit" onClick={() => openClose(true)}><ImExit /></button>
                </div>
                <div className="div-modal-interna">
                    <p>Olá, {localStorage.getItem("funcionario")}.<br /> Digite abaixo informações do Ticket</p>
                    <div className="row-modal-inputs">
                        <label htmlFor="input-modal-assunto">Assunto:</label>
                        <input id="input-modal-assunto" type="text" onChange={(e) => setAssunto(e.target.value)} />
                    </div>
                    <div className="row-modal-inputs">
                        <label htmlFor="select-modal-problema">Problema:</label>
                        <select id="select-modal-problema" onChange={(e) => setProblema(e.target.value)}>
                            <option value="null">Selecionar</option>
                            <option value="1">Toner</option>
                            <option value="2">Cilindro</option>
                            <option value="3">Outros</option>
                        </select>
                    </div>
                    <div className="row-modal-inputs">
                        <button onClick={salvarTicket} className="btn-modal-submit">
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
