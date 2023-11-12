import style from './NewUserPage.module.css';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, Component } from "react";

function NewUserPage() {
    var admin;
    var uAdmin = false;

    function atualizarAdmin() {
        uAdmin = !uAdmin;
    }

    async function cadastrarUsuario() {
        var resposta;

        var nome = document.getElementById('nome').value.trim();
        var nomeUsuario = document.getElementById('nomeusuario').value.trim();
        var senha = document.getElementById('senha').value;

        await fetch('api/inserir-usuario', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                nomeUsuario: nomeUsuario,
                senha: senha,
                admin: uAdmin
            })
        }).then((response) => response.json()).then((data) => { resposta = data });

        if (resposta) {
            alert("Usuário inserido com sucesso");
        } else {
            alert("Não foi possível inserir o usuário");
        }
    }

    async function checarAdmin() {
        var resposta;

        await fetch('auth/admin', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((data) => { resposta = data });

        admin = resposta;

        if (admin) {
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
