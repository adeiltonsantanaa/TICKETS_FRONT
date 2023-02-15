import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../../Components/Header'
import Fechar from "../../Components/Fechar";
import Enviar from "../../Components/Enviar"
import ModalTicket from "../../Components/ModalTicket";
import { BASE_URL } from "../../utils/url";

export default function Home() {
    const [open, setOpen] = useState(false);
    const [tickets, setTickets] = useState([]);
    const nomeUsuario = ajustaNomeUsuario();

    function ajustaNomeUsuario() {
        const nome = localStorage.getItem("funcionario");
        return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
    }

    function handleOpenClose() {
        setOpen((prevState) => !prevState);
    }

    useEffect(() => {
        const role = localStorage.getItem("role");
        const userId = localStorage.getItem("codFuncionario");
        const request = role === "ADM" ? "/api/ticket/todos/ativos" : `/api/ticket/todos/ativos/${userId}`;
        const token = localStorage.getItem("accessToken");

        axios
            .get(`${BASE_URL}${request}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setTickets(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <Header />
            <div className="div-home-container">
                <div className="div-home-interna">
                    <div className="div-home-add">
                        <h1>
                            Olá, <span>{nomeUsuario}</span>.<br /> Você tem <strong>{tickets.length}</strong> tickets abertos em seu nome.
                        </h1>
                        <button onClick={handleOpenClose}>Adicionar Ticket</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Assunto</th>
                                <th>Funcionário</th>
                                <th>Código do Problema</th>
                                <th>Nome do Problema</th>
                                <th>Enviar Interação</th>
                                <th>Fechar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket.codTicket}>
                                    <td>{ticket.codTicket}</td>
                                    <td>{ticket.assunto}</td>
                                    <td>{ticket.funcionarios.nome}</td>
                                    {/* <td>{ticket.mensagens.length === 0 ? "*sem mensagem*" : ticket.mensagens[ticket.mensagens.length - 1].descricao.substring(0, 15) + "..."}</td> */}
                                    <td>{ticket.problemas.codProblema}</td>
                                    <td>{ticket.problemas.nome}</td>
                                    <td>
                                        <Enviar id={ticket.codTicket} />
                                    </td>
                                    <td>
                                        <Fechar id={ticket.codTicket} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {open && <ModalTicket openClose={handleOpenClose} nome={nomeUsuario} />}
        </>
    );
}
