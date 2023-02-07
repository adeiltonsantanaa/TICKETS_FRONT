import React from "react";
import './style.css';
import img from '../../Assets/UNILS - 02.png'
import {FiPower} from 'react-icons/fi'


export default function Header() {

    return (
        <div className="div-header-container">
            <img className="img-header-logo" src={img} alt="logo Uni LS" />

            <div className="div-header-interna1">
                <ul className="ul-header">
                    <a><li className="li-header">teste1</li></a>
                    <a><li className="li-header">teste2</li></a>
                    <a><li className="li-header">teste3</li></a>
                </ul>
                <button className="btn-header"><FiPower/></button>
            </div>
        </div>
    )
}