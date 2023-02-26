import React, { useState, useEffect } from "react";
import './style.css';
import Header from '../../Components/Header'
import ModalTicket from "../../Components/ModalTicket";
import { BASE_URL } from "../../utils/url";
import axios from "axios";
import VoltarExec from "../../Components/VoltarExec";

export default function TicketsClosed() {

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
            return "/api/ticket/todos/disable"
        }
        return `/api/ticket/todos/disable/${user}`
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
                        <h1>Olá, <span>{nomeUsuario}</span>.<br /> Você tem <strong>{tickets.length}</strong> tickets fechados em seu nome.</h1>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ASSUNTO</th>
                                <th>FUNCIONÁRIO</th>
                                <th>COD. PROBLEMA</th>
                                <th>NOME PROBLEMA</th>
                                <th>VOLTAR A EXECUÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(t => (
                                <tr key={t.codTicket}>
                                    <td>{t.codTicket}</td>
                                    <td>{t.assunto}</td>
                                    <td>{t.funcionarios.nome}</td>
                                    <td>{t.problemas.codProblema}</td>
                                    <td>{t.problemas.nome}</td>
                                    <td><VoltarExec id={t.codTicket} func={() => retiraTicketDaLista(t.codTicket)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
