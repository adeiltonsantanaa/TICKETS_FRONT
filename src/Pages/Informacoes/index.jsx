import React, { useState } from "react";
import './style.css';
import Header from '../../Components/Header'
import { BASE_URL } from "../../utils/url";
import axios from "axios";

export default function Informacoes() {

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [open, setOpen] = useState(false);

    function openClose(data) {
        setOpen(!open)
    }


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
                .then(res => console.log(res.data))
                .catch(error => console.log(error));
        }
    };

    return (
        <>
            <Header />
            <div className="div-informacoes-container">
                <div className="div-informacoes-interna">
                    <div className="div-informacoes-box">
                        <div className="div-informacoes-descricao">
                            <h1>Olá, <span>{localStorage.getItem('funcionario')}</span>. Para alterar sua foto selecione o ícone abaixo e escolha o arquivo de imagem.</h1>
                            <h2>Obs: O arquivo precisa ser jpeg e conter menos de 10Kb</h2>
                        </div>
                        <div className="div-informacoes-campos">
                            {open && <img src={previewUrl} alt="Preview" />}
                            <form className="form-informacoes" onSubmit={handleSubmit}>
                                <input onChange={handleFileChange} type="file" id="input-informacoes" />
                                <button className="btn-informacoes-ver" onClick={openClose} type="button">Ver Imagem</button>
                                <button className="btn-informacoes-submit" type="submit">Salvar Imagem</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
{/* <div className="div-informacoes-pre">
<img src={previewUrl} alt="Preview" />
</div> */}