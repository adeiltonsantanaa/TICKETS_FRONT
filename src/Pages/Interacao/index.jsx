import React, { useEffect } from "react";
import './style.css';
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";



export default function Interacao() {

    const location = useLocation();


    return (
        <>
            <Header />
            <div className="div-interacao-container">
                <div className="div-interacao-interna">
                    <h1>Ticket: <span className="span-interacao">123</span></h1>
                    <div className="div-interacao-cabecalho">
                        <div className="div-interacao-assuntos">
                            <div className="row">
                                <h3>Id:</h3>
                                <input value="1" className="input-interacao" type="text" disabled />
                            </div>
                            <div className="row">
                                <h3>Assunto:</h3>
                                <input value="Toner" className="input-interacao" type="text" disabled />
                            </div>
                            <div className="row">
                                <h3>Funcionário:</h3>
                                <input value="Adeilton" className="input-interacao" type="text" disabled />
                            </div>
                            <div className="row">
                                <h3>Nome do Problema:</h3>
                                <input value="Troca de Toner" className="input-interacao" type="text" disabled />
                            </div>
                            <div className="row">
                                <h3>Código do Problema:</h3>
                                <input value="5" className="input-interacao" type="text" disabled />
                            </div>
                        </div>
                    </div>
                    <h1>Olá</h1>
                </div>
            </div>
            <Footer />
        </>
    )
}