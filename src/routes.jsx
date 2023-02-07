import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";



export default function rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}