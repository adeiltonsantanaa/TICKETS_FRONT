import React from "react";
import './style.css';
import { FiCheck } from 'react-icons/fi'
import axios from "axios";
import { BASE_URL } from "../../utils/url";

export default function Fechar(props) {
    const { id, func } = props;

    function fechar() {
        const token = localStorage.getItem("accessToken");
        axios.put(`${BASE_URL}/api/ticket/disable/${id}`, null, { headers: { Authorization: 'Bearer ' + token } })
            .then(func())
            .catch(err => console.log(err))
    }

    return (
        <>
            <button className="btn-fechar-icons" onClick={fechar}><FiCheck /></button>
        </>
    )
}