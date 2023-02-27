import React, { useState, useEffect } from "react";
import './style.css';
import Header from '../../Components/Header'
import Fechar from "../../Components/Fechar";
import Enviar from "../../Components/Enviar"
import ModalTicket from "../../Components/ModalTicket";
import { BASE_URL } from "../../utils/url";
import axios from "axios";
import { rolesOfDecodedToken } from "../../utils/jwtDecoder";

export default function Home() {

    const [open, setOpen] = useState(false);
    const [tickets, setTickets] = useState([]);
    const nomeUsuario = ajustaNomeUsuario();
    const role = rolesOfDecodedToken()

    function ajustaNomeUsuario() {
        var nomeMinusculo = localStorage.getItem('funcionario').toLowerCase()
        return nomeMinusculo.charAt(0).toUpperCase().concat(nomeMinusculo.slice(1))
    }

    function openClose(data) {
        setOpen(!open)
    }

    function verificaRole() {
        const user = localStorage.getItem('codFuncionario');
        return role === "ADM" ? "/api/ticket/todos/ativos" : `/api/ticket/todos/ativos/${user}`;
    }

    function visao() {
        return role === "ADM" ? "Administrador" : "Funcionário(a)"
    }

    function descricaoTicketsAbertos() {
        return tickets.length === 1 ? "ticket aberto" : "tickets abertos"
    }

    function retiraTicketDaLista(id) {
        setTickets(prevTickets => prevTickets.filter(ticket => ticket.codTicket !== id))
    }

    useEffect(() => {
        const request = verificaRole()
        const token = localStorage.getItem('accessToken');
        axios.get(`${BASE_URL}${request}`, { headers: { Authorization: 'Bearer ' + token } })
            .then(res => { setTickets(res.data); setTickets(res.data) })
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
                        <h1>Visão: {visao()} <br />Olá, <span>{nomeUsuario}</span>. Atualmente temos <strong>{tickets.length}</strong> {descricaoTicketsAbertos()} no sistema.</h1>
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
                                    <td><Fechar id={t.codTicket} func={() => retiraTicketDaLista(t.codTicket)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
