import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { isAuthenticated, whatsRole } from "./utils/auth";


import Login from "./Pages/Login";
import Home from "./Pages/Home";
import HomeAdm from "./Pages/HomeAdm";
import Interacao from "./Pages/Interacao";
import TicketsClosed from "./Pages/TicketsClosed";
import Erro404 from "./Pages/404";
import Informacoes from "./Pages/Informacoes";


const Private = ({ Component }) => {
    return isAuthenticated() ? <Component /> : <Navigate to="/" />
};

const Role = ({ Adm, Func }) => {
    if (whatsRole()) {
        return <Private Component={Adm} />
    }
    return <Private Component={Func} />
}

export default function rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Role Adm={HomeAdm} Func={Home} />} />
                <Route path="/interacao" element={<Private Component={Interacao} />} />
                <Route path="/home/ticketsFechados" element={<Private Component={TicketsClosed} />} />
                <Route path="/informacoes" element={<Private Component={Informacoes} />} />
                <Route path="*" element={<Erro404 />} />
            </Routes>
        </BrowserRouter>
    )
}