import React, { useState } from "react";
import './style.css';
import Header from '../../Components/Header'
import { BASE_URL } from "../../utils/url";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import ModalImagem from "../../Components/ModalImagem";


export default function Informacoes() {

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);

        const reader = new FileReader();

        reader.onload = () => {
            setPreviewUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };

    function handleOpenClose() {
        previewUrl === null ? toast.warn("Selecione uma imagem para visualizá-la") : setOpen(!open);
    }

    const handleSubmit = () => {
        if (file) {
            const formData = new FormData();
            const newName = localStorage.getItem('codFuncionario').concat(".jpeg")
            formData.set("imagem", file, newName)

            const token = localStorage.getItem('accessToken')
            axios.post(`${BASE_URL}/api/imagem/salvarImagem`, formData, { headers: { Authorization: 'Bearer ' + token } })
                .then(res => { toast.success(res.data) })
                .catch(error => toast.error(error.response.data));
        }
    };

    return (
        <>
            <ToastContainer />
            <Header />
            {open && <ModalImagem openClose={handleOpenClose} image={previewUrl} />}
            <div className="div-informacoes-container">
                <div className="div-informacoes-interna">
                    <div className="div-informacoes-box">
                        <div className="div-informacoes-descricao">
                            <h1>Olá, <span>{localStorage.getItem('funcionario')}</span>. Para alterar sua foto selecione o ícone abaixo e escolha o arquivo de imagem.</h1>
                            <h2>Obs: O arquivo precisa ser jpeg e conter menos de 10MB</h2>
                        </div>
                        <div className="div-informacoes-campos">
                            <div className="div-informacoes-inputs">
                                <input type="file" id="input-informacoes" onChange={handleFileChange} />
                                <button className="btn-informacoes-ver" type="button" onClick={handleOpenClose}>Ver Imagem</button>
                                <button className="btn-informacoes-submit" onClick={handleSubmit} type="button">Salvar Imagem</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}