import style from './SettingsPage.module.css';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, Component } from "react";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SettingsPage() {
    var admin;
    var usuario;

    function desconectar() {
        fetch('auth/desconectar', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => { window.location.href = "/home" });
    }

    function voltar() {
        window.location.href = "/home"
    }

    async function validar() {
        try {
            await fetch('auth/usuario', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json()).then((data) => { usuario = data });
        } catch {
            usuario = null;
        }
        

        if (usuario) {
            admin = usuario.Admin;
            renderizar();
        } else {
            const root = createRoot(document.getElementById("container-novo-usuario"));
            root.render(
                <p>Você deve estar conectado para acessar essa página</p>
            );
        }
    }

    async function buscarDepartamentos() {
        var resposta;

        await fetch('api/listar-departamentos', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((data) => { resposta = data });

        if (resposta) {
            const root = createRoot(document.getElementById("container-tabela-conteudo"));

            root.render(
                <div>
                    <table className={style.tabelaconteudo}>
                        <thead>
                            <tr>
                                <td>Código</td>
                                <td>Nome do departamento</td>
                                <td>Cor</td>
                                <td>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            {resposta ?
                                resposta.map((dep) => (
                                    <tr>
                                        <td>{dep.id}</td>
                                        <td>{dep.nome}</td>
                                        <td><input type="color" readOnly={true} value={dep.cor} /></td>
                                        <td></td>
                                    </tr>
                                ))
                                : <p>Nenhum departamento cadastrato</p>
                            }
                        </tbody>
                    </table>
                    <p className={style.novo}><a target="_blank" href="novo-departamento">+ Adicionar departamento</a></p>
                </div>
            );
        }
    }

    async function buscarUsuarios() {
        var resposta;

        await fetch('auth/listar-usuarios', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => { resposta = data });

        if (resposta) {
            const root = createRoot(document.getElementById("container-tabela-conteudo"));

            root.render(
                <div>
                    <table className={style.tabelaconteudo}>
                        <thead>
                            <tr>
                                <td>Nome</td>
                                <td>Nome de usuário</td>
                                <td>Senha</td>
                                <td>Admin?</td>
                                <td>Cargo</td>
                                <td>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            {resposta ?
                                resposta.map(function (d) {
                                    var object = JSON.parse(d);

                                    return (
                                        <tr>
                                            <td>{object.Nome}</td>
                                            <td>{object.NomeUsuario}</td>
                                            <td>********</td>
                                            <td>{object.Admin ? "Sim" : "Não"}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    );
                                })
                                : <p>Nenhum usuário cadastrato</p>
                            }
                        </tbody>
                    </table>
                    <p className={style.novo}><a target="_blank" href="novo-usuario">+ Adicionar usuário</a></p>
                </div>
            );
        }
    }

    function renderizar() {
        const root = createRoot(document.getElementById("container-configuracoes"));

        root.render(
            <>
                <div className={style.cabecalho}>
                    <div className={style.dados}>
                        <h1>{usuario.Nome}</h1>
                        <p>{usuario.NomeUsuario}</p>
                    </div>

                    <div className={style.icone}>
                        <div>
                            <ul>
                                <li onClick={() => voltar()}><FontAwesomeIcon icon={faHouse} /></li>
                                <li onClick={() => desconectar()}><FontAwesomeIcon icon={faRightFromBracket} /></li>
                            </ul>
                        </div>
                        <div className={style.contaicone}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </div>
                </div>

                <div className={style.opcoes}>
                    {admin ?
                        <>
                            <button onClick={() => buscarUsuarios()}>Ver usuários</button>
                            <button onClick={() => buscarDepartamentos()}>Departamentos</button>
                            <div id="container-tabela-conteudo"></div>
                        </> : <>
                            <button>Editar meus dados</button>
                        </>
                    }
                </div>
            </>
        );
    }

    validar();

    return (
        <div id="container-configuracoes" className={style.conteudo}>

        </div>
    );
}

export default SettingsPage;
