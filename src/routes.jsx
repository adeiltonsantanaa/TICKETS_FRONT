import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Interacao from "./Pages/Interacao";



export default function rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/interacao" element={<Interacao/>}/>
            </Routes>
        </BrowserRouter>
    )
}