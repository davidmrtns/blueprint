import React, { Component, useState } from "react";
import Recursos from "../classes/Recursos";
import style from "./LoginPage.module.css";

function LoginPage() {
    var recursos = new Recursos();
    const [enviado, setEnviado] = useState(null);

    function enviar(e) {
        if (e.keyCode === 13) {
            enviarSolicitacao();
        }
    }

    async function enviarSolicitacao() {
        setEnviado(true);

        var resultado;
        var usuario = document.getElementById("usuario").value;
        var senha = document.getElementById("senha").value;

        if (usuario && senha) {
            try {
                await fetch('auth', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: usuario,
                        password: senha
                    })
                }).then((response) => response.json())
                    .then((data) => { resultado = data });

                if (resultado) {
                    window.location.href = "/home";
                } else {
                    alert('O usuário ou senha inseridos não existem');
                    setEnviado(false);
                }
            } catch {
                alert('Um erro ocorreu');
                setEnviado(false);
            }
        } else {
            alert('Digite um nome de usuário e senha válidos!');
            setEnviado(false);
        }
    }

    return (
        <div className={style.login}>
            <div className={style.logincard}>
                <h1>Login</h1>

                <div className={style.formulario}>
                    <div className={style.campo}>
                        <label>
                            <input placeholder="Nome de usuário" id="usuario" type="text" onKeyDown={(e) => enviar(e)} />
                        </label>
                    </div>

                    <div className={style.campo}>
                        <label>
                            <input placeholder="Senha" id="senha" type="password" onKeyDown={(e) => enviar(e)} />
                        </label>
                    </div>

                    <div className={style.botao}>
                        <button className={enviado ? style.enviado : ""} id="btentrar" type="button" disabled={enviado} onClick={() => enviarSolicitacao()}>
                            {enviado ? <img className={style.enviando} src={recursos.getEnviando()} />
                                : ("Entrar")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;