import {useEffect, useState} from "react";
import axios from "axios";

function Cadastrar() {
    const [DarkTheme, setDarkTheme] = useState(false)
    const carregarDados = () => {
        let id = '#form-cadastrar'

        document.querySelector(id).addEventListener('submit', (evento) => {
            evento.preventDefault()
            
            let msgTextArea = document.querySelector("#form-content");
            let messageField = msgTextArea.value;
            let messageError = '';
            
            let dadosFormulario = new FormData();

            dadosFormulario.append('mensagem', messageField);

            axios ({
                method: 'post',
                url: "http://localhost:8080/messages/new",
                data: dadosFormulario,
            }).then((resposta) => {
                console.log(resposta)
                if (resposta.status == 200){
                    document.querySelector("#Cadastrar-Feedback").innerHTML = "<div class='alert alert-success mt-2 ml-4 mr-4'>Mensagem enviada com sucesso !</div>"
                    document.querySelector("#Cadastrar-Feedback").style.display = 'block';

                    msgTextArea.value = ""

                    setTimeout(() => {
                        document.querySelector("#Cadastrar-Feedback").style.display = 'none';
                    }, 2000);

                    return
                }
            }).catch((erro) => {
                console.log(erro)

                if (messageField.length < 5) {
                    messageError = "- A mensagem deve ter no mínimo 5 caracteres !<br>"
                }

                document.querySelector("#Cadastrar-Feedback").innerHTML = `<div class='alert alert-danger mt-2 ml-4 mr-4'>${messageError}</div>`
                document.querySelector("#Cadastrar-Feedback").style.display = 'block'
            })
        })
    }
    
    useEffect(() => {
        carregarDados()
    },[DarkTheme])

    return (
        <>
            {DarkTheme == false ? <WhiteForm/> : <BlackForm/>}
        </>
    )
}

function WhiteForm () {
    return (
        <>
        <div>
            <h1 className="text-center mt-4 mb-4">Enviar mensagem</h1>
            <form id="form-cadastrar" className="ml-4 mr-4">
                <div className="form-group">
                    <label for="form-content">Aqui vai o conteúdo da sua mensagem</label>
                    <textarea class="form-control" aria-label="With textarea" id="form-content"></textarea>
                </div>
                <button type="submit" className="btn btn-primary mb-2 mt-4">Enviar</button>
            </form>
            <div id="Cadastrar-Feedback" style={{display: 'none'}}></div>
        </div>
    </>
    )
}

function BlackForm () {
    return (
        <>
            <div className="bg-dark mx-4 my-4 pb-4 pt-1 rounded">
                <h1 className="text-center mt-4 mb-4 text-white">Cadastrar</h1>
                <form id='black-form-cadastrar' className="ml-4 mr-4">
                    <div className="form-group">
                        <label htmlFor="form-nome" className="text-white">Nome</label>
                        <input type="text" className="form-control" id="form-nome" placeholder="Seu nome" name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="form-email" className="text-white">Email</label>
                        <input type="email" className="form-control" id="form-email" placeholder="Seu email" name="email"/>
                    </div>
                    <button type="submit" className="btn btn-info mb-2 text-white">Cadastrar</button>
                </form>
                <div id="Cadastrar-Feedback" style={{display: 'none'}}></div>
            </div>
        </>
    )
}

export default Cadastrar
