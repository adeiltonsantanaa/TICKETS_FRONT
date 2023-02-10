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

    function openClose(data) {
        setOpen(!open)
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        axios.get(`${BASE_URL}/api/ticket/todos/ativos`, { headers: { Authorization: 'Bearer ' + token } })
            .then(res => { console.log(res.data); setTickets(res.data); setTickets(res.data) })
            .catch(err => { console.log(err) })
    }, []);

    return (
        <>
            {open && (
                <ModalTicket openClose={openClose} />
            )}
            <Header />
            <div className="div-home-container">
                <div className="div-home-interna">
                    <div className="div-home-add">
                        <h1>Tickets Abertos: <strong>{tickets.length}</strong></h1>
                        <button onClick={openClose} >Add Ticket</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ASSUNTO</th>
                                <th>ÚLTIMA MENSAGEM</th>
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
                                    <td>*EM MANUTENÇÃO*</td>
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
