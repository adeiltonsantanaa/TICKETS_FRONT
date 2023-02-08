import axios from "axios";
import React from "react";
import './style.css';
import { BASE_URL } from "../../utils/url";
import {FiCheck} from 'react-icons/fi'


export default function Fechar(id) {

    //configurar essa função de acordo com o endPoint
    function fechar(id) {
        axios.delete(`${BASE_URL}/id`)
    }


    return (
        <>
            <button onClick={() => fechar}><FiCheck/></button>
        </>
    )
}