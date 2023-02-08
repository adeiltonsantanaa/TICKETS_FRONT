import axios from "axios";
import React from "react";
import './style.css';
import { BASE_URL } from "../../utils/url";
import {FiSend} from 'react-icons/fi'

//ajustar props
export default function Enviar({props}) {

    //configurar essa função de acordo com o endPoint
    function fechar({props}) {
        console.log(props)
        //       axios.post(`${BASE_URL}/id`)
    }


    return <button onClick={({props}) => fechar}><FiSend/></button>

}