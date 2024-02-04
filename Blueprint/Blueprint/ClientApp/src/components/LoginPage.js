import React, { Component, useState } from "react";
import Recursos from "../classes/Recursos";
import style from "./LoginPage.module.css";
import Backend from "../classes/Backend";

function LoginPage() {
    var recursos = new Recursos();
    var backend = new Backend();
    const [enviado, setEnviado] = useState(null);

    function enviar(e) {
        if (e.keyCode === 13) {
            enviarSolicitacao();
        }
    }

    async function enviarSolicitacao() {
        setEnviado(true);

        var usuario = document.getElementById("usuario").value;
        var senha = document.getElementById("senha").value;

        if (usuario && senha) {
            var resultado = await backend.conectar(usuario, senha);
            setEnviado(resultado);
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