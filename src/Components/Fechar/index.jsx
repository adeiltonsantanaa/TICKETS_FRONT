import React from "react";
import './style.css';
import { FiCheck } from 'react-icons/fi'
import axios from "axios";
import { BASE_URL } from "../../utils/url";

export default function Fechar(props) {

    function fechar() {
        const token = localStorage.getItem("accessToken");
        axios.put(`${BASE_URL}/api/ticket/disable/${props.id}`, null, { headers: { Authorization: 'Bearer ' + token } })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        window.location.reload()
    }

    return (
        <>
            <button className="btn-fechar-icons" onClick={fechar}><FiCheck /></button>
        </>
    )
}