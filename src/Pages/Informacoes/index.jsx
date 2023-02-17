import React, { useState } from "react";
import './style.css';
import Header from '../../Components/Header'
import { BASE_URL } from "../../utils/url";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function Informacoes() {

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [openPreview, setOpenPreview] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);

        const reader = new FileReader();

        reader.onload = () => {
            setPreviewUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (file) {
            const formData = new FormData();
            const newName = localStorage.getItem('codFuncionario').concat(".jpeg")
            formData.set("imagem", file, newName)

            const token = localStorage.getItem('accessToken')
            axios.post(`${BASE_URL}/api/imagem/salvarImagem`, formData, { headers: { Authorization: 'Bearer ' + token } })
                .then(res => toast.success(res.data))
                .catch(error => toast.error(error.response.data));
               
        }

    };

    return (
        <>
            <ToastContainer/>
            <Header />
            <div className="div-informacoes-container">
                <div className="div-informacoes-interna">
                    <div className="div-informacoes-box">
                        <div className="div-informacoes-descricao">
                            <h1>Olá, <span>{localStorage.getItem('funcionario')}</span>. Para alterar sua foto selecione o ícone abaixo e escolha o arquivo de imagem.</h1>
                            <h2>Obs: O arquivo precisa ser jpeg e conter menos de 10Kb</h2>
                        </div>
                        <div className="div-informacoes-campos">
                            {openPreview && <img src={previewUrl} alt="Preview" />}
                            <form className="form-informacoes" onSubmit={handleSubmit}>
                                <input type="file" id="input-informacoes" onChange={handleFileChange} />
                                <button className="btn-informacoes-ver" type="button" onClick={() => setOpenPreview(!openPreview)}>Ver Imagem</button>
                                <button className="btn-informacoes-submit" type="submit">Salvar Imagem</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}