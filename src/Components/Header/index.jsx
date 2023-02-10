import React from "react";
import './style.css';
import img from '../../Assets/UNILS - 02.png'
import { FiPower } from 'react-icons/fi'
import { useNavigate, Link } from "react-router-dom";


export default function Header() {

    const history = useNavigate()

    function sair() {
        localStorage.clear();
        history('/')
    }

    return (
        <div className="div-header-container">
            <img className="img-header-logo" src={img} alt="logo Uni LS" />

            <div className="div-header-interna1">
                <ul className="ul-header">
                    <Link className="a-header" to="/home"><li className="li-header">Home</li></Link>
                    <Link className="a-header" to="/home"><li className="li-header">teste1</li></Link>
                    <Link className="a-header" to="/home"><li className="li-header">teste1</li></Link>
                </ul>
                <button onClick={sair} className="btn-header"><FiPower /></button>
            </div>
        </div>
    )
}