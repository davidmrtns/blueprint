import React, { useState, useEffect } from "react";
import style from "../Paginas.module.css";
import { useNavigate } from 'react-router-dom';
import ListaDinamica from "../../components/ListaDinamica";
import ListaDinamicaSuperiores from "../../components/ListaDinamicaSuperiores";
import Backend from '../../classes/Backend';
import Recursos from "../../classes/Recursos";

function NewAssignmentPage() {
    const backend = new Backend();
    const recursos = new Recursos();
    const navigate = useNavigate();

    const [autenticacao, setAutenticacao] = useState({
        admin: null,
        carregando: true
    })

    const [dados, setDados] = useState({
        departamentos: null
    })

    useEffect(() => {
        const buscarDados = async () => {
            try {
                var adminDados = await backend.checarAdmin();

                if (adminDados) {
                    var departamentosDados = await backend.listarDepartamentos();

                    setDados({
                        departamentos: departamentosDados
                    });

                    setAutenticacao({
                        admin: adminDados,
                        carregando: false
                    });
                } else {
                    setAutenticacao({
                        admin: null,
                        carregando: false
                    });
                }
            } catch {
                setAutenticacao({
                    admin: null,
                    carregando: false
                });
            }
        }

        buscarDados();
    }, []);

    function cancelar() {
        navigate('/atribuicoes');
    }

    async function adicionar() {
        var botao = document.getElementById('btadicionar');
        botao.disabled = true;

        var departamento = document.getElementById("departamento").value.trim();
        var unidade = document.getElementById("unidade").value.trim();
        var cargo = document.getElementById("cargo").value.trim();
        var jornada = document.getElementById("jornada").value.trim();
        var superiores = document.getElementById("reporta").value;
        var horario = document.getElementById("horario").value.trim();
        var atividades = document.getElementById("atividades").value;
        var expectativas = document.getElementById("expectativas").value;

        if (cargo == "") {
            alert('Preencha corretamente os campos!');
            botao.disabled = false;
        } else {
            var resposta = await backend.adicionarAtribuicao(departamento, unidade, cargo, jornada, superiores, horario, atividades, expectativas);

            if (resposta && resposta != 0) {
                navigate('/atribuicoes/atribuicao/' + resposta);
            } else {
                alert('Não foi possível incluir a atribuição');
                botao.disabled = false;
            }
        }
    }

    function renderizar() {
        const { admin, carregando } = autenticacao;

        if (carregando) {
            return (
                <div className={style.carregando}>
                    <img src={recursos.getCarregando()} />
                </div>
            );
        } else {
            if (admin) {
                const { departamentos, atribuicoes } = dados;

                return (
                    <>
                        <table className={style.tabela}>
                            <tbody>
                                <tr>
                                    <td className={style.titulo}>Cargo</td>
                                    <td colSpan={3}><input id="cargo" type="text"></input></td>
                                </tr>
                                <tr>
                                    <td className={style.titulo}>Departamento</td>
                                    <td colSpan={3}>
                                        <select id="departamento" name="departamento">
                                            {departamentos.map((dep) => (
                                                <option value={dep.id}>{dep.nome}</option>
                                            ))
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.titulo}>Unidade</td>
                                    <td>
                                        <select id="unidade" name="unidade">
                                            <option value="0">Hortolândia</option>
                                            <option value="1">Campinas</option>
                                        </select>
                                    </td>
                                    <td className={style.titulo}>Jornada semanal</td>
                                    <td>
                                        <select id="jornada" name="jornada">
                                            <option value="44 horas">44 horas</option>
                                            <option value="36 horas">36 horas</option>
                                            <option value="PJ">PJ</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.titulo}>Reporta a</td>
                                    <td colSpan={3}>
                                        <ListaDinamicaSuperiores
                                            id={"reporta"} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.titulo}>Horário de trabalho</td>
                                    <td colSpan={3}>
                                        <select id="horario" name="horario">
                                            <option value="Integral">Integral</option>
                                            <option value="Estagiário">Estagiário</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho} colSpan={4}>Descrição das atividades</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <div>
                                            <ListaDinamica id="atividades" movivel={true} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho} colSpan={4}>Expectativas</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <div>
                                            <ListaDinamica id="expectativas" movivel={true} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className={style.acoes}>
                            <button id="btadicionar" onClick={() => adicionar()}>Salvar</button>
                            <button onClick={() => cancelar()}>Cancelar</button>
                        </div>
                    </>
                );
            } else {
                return (<p>Você não tem permissão para executar essa ação</p>);
            }
        }
    }

    return (
        <div id="tabela-atribuicao-edicao">
            {renderizar()}
        </div>
    );
}

export default NewAssignmentPage;