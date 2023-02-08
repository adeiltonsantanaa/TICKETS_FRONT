import React from "react";
import './style.css';
import { FiCheck } from 'react-icons/fi'
import axios from "axios";
import { BASE_URL } from "../../utils/url";

export default function Fechar(props) {

    function fechar() {
        axios.put(`${BASE_URL}/api/ticket/${props.id}`)
    }


    return (
        <>
            <button className="btn-fechar-icons" onClick={fechar}><FiCheck /></button>
        </>
    )
}