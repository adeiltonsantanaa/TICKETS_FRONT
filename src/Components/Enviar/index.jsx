import React from "react";
import './style.css';
import { FiSend } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

export default function Enviar(props) {

    const navigate = useNavigate();
    function enviarInteracao() {
        navigate('/interacao', {state:{id:props.id}})
    }


    return <button className="btn-enviar-icons" onClick={enviarInteracao}><FiSend /></button>
}