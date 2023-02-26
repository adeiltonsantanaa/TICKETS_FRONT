import React from "react";
import './style.css';
import { ImExit } from 'react-icons/im'

export default function ModalImagem(props) {
    const { openClose, image } = props;

    return (<>
        <div className="backdrop">
            <div className="modalImagem-ticket">
                <div className="div-modalImagem-btn">
                    <button className="btn-modalImagem-exit" onClick={() => openClose(true)}><ImExit /></button>
                </div>
                <div className="div-modalImagem-interna">
                    <img className="img-modalImagem" src={image} alt="preview" />
                </div>
            </div>
        </div>
    </>)
}
