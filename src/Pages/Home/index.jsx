import React from "react";
import './style.css';
import Header from '../../Components/Header'
import Footer from "../../Components/Footer";
import Fechar from "../../Components/Fechar";
import Enviar from "../../Components/Enviar"

export default function Home() {

    return (
        <>
            <Header />
            <div className="div-home-container">
                <div className="div-home-interna">
                    <h1>Tickets:</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ASSUNTO</th>
                                <th>MENSAGEM</th>
                                <th>COD. PROBLEMA</th>
                                <th>NOME PROBLEMA</th>
                                <th>ENVIAR INTERAÇÃO</th>
                                <th>FECHAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>troca de toner</td>
                                <td>preciso que troquem o toner do setor...</td>
                                <td>4</td>
                                <td>Toner</td>
                                <td><Enviar id={1} /></td>
                                <td><Fechar id={1} /></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>troca de toner</td>
                                <td>preciso que troquem o toner do setor...</td>
                                <td>4</td>
                                <td>Toner</td>
                                <td><Enviar id={1} /></td>
                                <td><Fechar id={1} /></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>troca de toner</td>
                                <td>preciso que troquem o toner do setor...</td>
                                <td>4</td>
                                <td>Toner</td>
                                <td><Enviar id={1} /></td>
                                <td><Fechar id={1} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    )
}