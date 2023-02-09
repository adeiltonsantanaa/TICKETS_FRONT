import React, { useEffect, useState } from "react";
import './style.css';
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import logo from '../../Assets/minhaFoto.jpeg'
import { FiArrowLeft } from 'react-icons/fi'
import axios from "axios";
import { BASE_URL } from "../../utils/url";



export default function Interacao() {

    const location = useLocation();
    const [interacao, SetInteracao] = useState();
    const [ticket, SetTicket] = useState([]);
    const [dadosTicket, setDadosTicket] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/ticket/buscar/${location.state.id}`)
            .then(res => { setDadosTicket(res.data); SetTicket(res.data.mensagens) })
            .catch(err => { console.log(err) })
    }, []);

    function atualizaMensagens(novoTicket) {
        SetTicket(ticket => [...ticket, novoTicket]);
    }

    function adicionarInteracao() {
        axios.post(`${BASE_URL}/api/mensagem/salvar`, {
            codMensagem: null,
            descricao: interacao,
            ticket: {
                codTicket: location.state.id
            }
        }).then(res => atualizaMensagens(res.data)).catch(err => console.log(err))
    }

    return (
        <>
            <Header />
            <div className="div-interacao-container">
                <div className="div-interacao-interna">
                    <h1>Ticket: <span className="span-interacao">123</span></h1>
                    <div className="div-interacao-cabecalho">
                        <div className="div-interacao-assuntos">
                            {dadosTicket && (
                                <>
                                    <div className="row">
                                        <h3>Id:</h3>
                                        <input value={dadosTicket.codTicket} className="input-interacao" type="text" disabled />
                                    </div><div className="row">
                                        <h3>Assunto:</h3>
                                        <input value={dadosTicket.assunto} className="input-interacao" type="text" disabled />
                                    </div><div className="row">
                                        <h3>Funcionário:</h3>
                                        <input value={"Adeilton MOCK"} className="input-interacao" type="text" disabled />
                                    </div><div className="row">
                                        <h3>Nome do Problema:</h3>
                                        <input value={dadosTicket.problemas[0].nome} className="input-interacao" type="text" disabled />
                                    </div><div className="row">
                                        <h3>Código do Problema:</h3>
                                        <input value="5" className="input-interacao" type="text" disabled />
                                    </div>
                                </>
                            )}
                        </div>
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
                                            <img src={logo} alt="" />
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