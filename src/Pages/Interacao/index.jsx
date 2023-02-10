import React, { useEffect, useState } from "react";
import './style.css';
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { FiArrowLeft } from 'react-icons/fi'
import axios from "axios";
import { BASE_URL } from "../../utils/url";



export default function Interacao() {

    const location = useLocation();
    const [interacao, SetInteracao] = useState();
    const [ticket, SetTicket] = useState([]);
    const [dadosTicket, setDadosTicket] = useState();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        axios.get(`${BASE_URL}/api/ticket/buscar/${location.state.id}`, { headers: { Authorization: 'Bearer ' + token } })
            .then(res => { console.log(res.data); setDadosTicket(res.data); SetTicket(res.data.mensagens) })
            .catch(err => { console.log(err) })
    }, [location.state.id]);

    function atualizaMensagens(novoTicket) {
        SetTicket(ticket => [...ticket, novoTicket]);
    }

    function adicionarInteracao() {
        const token = localStorage.getItem('accessToken');
        const codFuncionario = localStorage.getItem('codFuncionario');
        axios.post(`${BASE_URL}/api/mensagem/salvar`, {
            codMensagem: null,
            descricao: interacao,
            ticket: {
                codTicket: location.state.id
            },
            funcionario: {
                codFuncionario: codFuncionario
            }
        }, { headers: { Authorization: 'Bearer ' + token } }).then(res => atualizaMensagens(res.data)).catch(err => console.log(err))
    }

    return (
        <>
            <Header />
            <div className="div-interacao-container">
                <div className="div-interacao-interna">
                    <h1>Ticket: <span className="span-interacao">123</span></h1>
                    <div className="div-interacao-cabecalho">
                        {dadosTicket &&
                            (
                                <div key={dadosTicket.codTicket} className="div-interacao-assuntos">
                                    <div className="row">
                                        <h3>Id:</h3>
                                        <input value={dadosTicket.codTicket} className="input-interacao" type="text" disabled />
                                    </div><div className="row">
                                        <h3>Assunto:</h3>
                                        <input value={dadosTicket.assunto} className="input-interacao" type="text" disabled />
                                    </div><div className="row">
                                        <h3>Funcionário:</h3>
                                        <input value={dadosTicket.funcionarios.nome} className="input-interacao" type="text" disabled />
                                    </div><div className="row">
                                        <h3>Nome do Problema:</h3>
                                        <input value={dadosTicket.problemas.nome} className="input-interacao" type="text" disabled />
                                    </div><div className="row">
                                        <h3>Setor:</h3>
                                        <input value={dadosTicket.funcionarios.setor.nome} className="input-interacao" type="text" disabled />
                                    </div>
                                </div>
                            )}
                    </div>
                    <h2>Enviar Interação:</h2>
                    <div className="div-interacao-text">
                        <textarea onChange={(e) => { SetInteracao(e.target.value) }} id="text-ticket" cols="178" rows="1"></textarea>
                        <button onClick={adicionarInteracao} className="btn-interacao-enviar-text">Enviar Interação</button>
                    </div>
                    <hr />
                    <h1>Interações: </h1>
                    <div className="div-interacao-caixa">
                        {ticket.map(msg => (
                            <>
                                <div key={msg.codMensagem}>
                                    <div className="div-interacao-text">
                                        <textarea disabled value={msg.descricao} id="text-ticket" cols="178" rows="1"></textarea>
                                        <FiArrowLeft />
                                        <div className="div-interacao-circulo">
                                            <img src={`/fotos/${msg.funcionario.codFuncionario}.jpeg`} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
} 