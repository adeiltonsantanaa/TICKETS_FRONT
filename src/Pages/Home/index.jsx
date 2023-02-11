import React, { useState, useEffect } from "react";
import './style.css';
import Header from '../../Components/Header'
import Fechar from "../../Components/Fechar";
import Enviar from "../../Components/Enviar"
import ModalTicket from "../../Components/ModalTicket";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

export default function Home() {

    const [open, setOpen] = useState(false);
    const [tickets, setTickets] = useState([]);
    const nomeUsuario = ajustaNomeUsuario();

    function ajustaNomeUsuario() {
        var nomeMinusculo = localStorage.getItem('funcionario').toLowerCase()
        return nomeMinusculo.charAt(0).toUpperCase().concat(nomeMinusculo.slice(1))
    }

    function openClose(data) {
        setOpen(!open)
    }

    function verificaRole() {
        const role = localStorage.getItem('role')
        const user = localStorage.getItem('codFuncionario');
        if (role === "ADM") {
            return "/api/ticket/todos/ativos"
        }
        return `/api/ticket/todos/ativos/${user}`
    }

    useEffect(() => {
        const request = verificaRole()
        const token = localStorage.getItem('accessToken');
        axios.get(`${BASE_URL}${request}`, { headers: { Authorization: 'Bearer ' + token } })
            .then(res => { console.log(res.data); setTickets(res.data); setTickets(res.data) })
            .catch(err => { console.log(err) })
    }, []);

    return (
        <>
            {open && (
                <ModalTicket openClose={openClose} nome={nomeUsuario} />
            )}
            <Header />
            <div className="div-home-container">
                <div className="div-home-interna">
                    <div className="div-home-add">
                        <h1>Olá, <span>{nomeUsuario}</span>.<br /> Você tem <strong>{tickets.length}</strong> tickets Abertos em seu nome.</h1>
                        <button onClick={openClose} >Add Ticket</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ASSUNTO</th>
                                <th>FUNCIONÁRIO</th>
                                <th>COD. PROBLEMA</th>
                                <th>NOME PROBLEMA</th>
                                <th>ENVIAR INTERAÇÃO</th>
                                <th>FECHAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(t => (
                                <tr key={t.codTicket}>
                                    <td>{t.codTicket}</td>
                                    <td>{t.assunto}</td>
                                    <td>{t.funcionarios.nome}</td>
                                    {/* <td>{tickets[t.codTicket - 1].mensagens.length === 0
                                        ? "*sem mensagem*"
                                        : tickets[t.codTicket - 1].mensagens[t.mensagens.length - 1].descricao.substring(0, 15) + "..."}</td> */}
                                    <td>{t.problemas.codProblema}</td>
                                    <td>{t.problemas.nome}</td>
                                    <td><Enviar id={t.codTicket} /></td>
                                    <td><Fechar id={t.codTicket} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
