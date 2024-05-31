import style from './NewUserPage.module.css';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, Component } from "react";
import Backend from '../classes/Backend';

function NewUserPage() {
    var backend = new Backend();
    var uAdmin = false;

    function atualizarAdmin() {
        uAdmin = !uAdmin;
    }

    async function cadastrarUsuario() {
        var nome = document.getElementById('nome').value.trim();
        var nomeUsuario = document.getElementById('nomeusuario').value.trim();
        var senha = document.getElementById('senha').value;

        var resposta = await backend.inserirUsuario(nome, nomeUsuario, senha, uAdmin);

        if (resposta) {
            alert("Usuário inserido com sucesso");
        } else {
            alert("Não foi possível inserir o usuário");
        }
    }

    async function checarAdmin() {
        var resposta = await backend.checarAdmin();

        if (resposta) {
            renderizar();
        } else {
            const root = createRoot(document.getElementById("container-novo-usuario"));
            root.render(
                <p>Você não tem permissão para executar essa ação</p>
            );
        }
    }

    function renderizar() {
        const root = createRoot(document.getElementById("container-novo-usuario"));

        root.render(
            <>
                <div>
                    <h1>Novo usuário</h1>
                </div>
                <div>
                    <input type="text" id="nome" placeholder="Nome" />
                    <input type="text" id="nomeusuario" placeholder="Nome de usuário" />
                    <input type="password" id="senha" placeholder="Senha" />
                </div>
                <div>
                    <input onChange={() => atualizarAdmin()} type="checkbox" id="admin" />
                    <label for="admin">Administrador</label>
                </div>
                <div>
                    <button onClick={() => cadastrarUsuario()}>Salvar</button>
                </div>
            </>
        );
    }

    checarAdmin();

    return (
        <div id="container-novo-usuario" className={style.conteudo}>

        </div>
    );
}

export default NewUserPage;
