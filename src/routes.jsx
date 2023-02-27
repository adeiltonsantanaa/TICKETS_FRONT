import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";


import Login from "./Pages/Login";
import HomeAdm from "./Pages/HomeAdm";
import Interacao from "./Pages/Interacao";
import TicketsClosed from "./Pages/TicketsClosed";
import Erro404 from "./Pages/404";
import Informacoes from "./Pages/Informacoes";


const Private = ({ Component }) => {
    return isAuthenticated() ? <Component /> : <Navigate to="/" />
};

export default function rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Private Component={HomeAdm} />} />
                <Route path="/interacao" element={<Private Component={Interacao} />} />
                <Route path="/home/ticketsFechados" element={<Private Component={TicketsClosed} />} />
                <Route path="/informacoes" element={<Private Component={Informacoes} />} />
                <Route path="*" element={<Erro404 />} />
            </Routes>
        </BrowserRouter>
    )
}