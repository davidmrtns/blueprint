import React, { useState, useEffect, Component } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../Paginas.module.css";
import ErrorPage from "../ErrorPage";
import { useNavigate } from 'react-router-dom';
import Backend from '../../classes/Backend';
import Recursos from "../../classes/Recursos";
import ListaDinamica from "../../components/ListaDinamica";
import ListaDinamicaSuperiores from "../../components/ListaDinamicaSuperiores";

function EditAssignmentPage() {
    var { id } = useParams();
    const backend = new Backend();
    const recursos = new Recursos();
    const navigate = useNavigate();

    const [autenticacao, setAutenticacao] = useState({
        admin: null,
        carregando: true
    })

    const [dados, setDados] = useState({
        atribuicao: null,
        subordinacao: null,
        departamentos: null,
        cargos: null,
        atividades: null,
        expectativas: null
    })

    useEffect(() => {
        const buscarDados = async () => {
            setDados({
                atribuicao: null,
                subordinacao: null,
                departamentos: null,
                cargos: null,
                atividades: null,
                expectativas: null
            });

            setAutenticacao({
                carregando: true
            });

            try {
                var adminDados = await backend.checarAdmin();
                var atribuicaoDados = await backend.buscarAtribuicao(id);

                if (adminDados && atribuicaoDados) {
                    var subordinacaoDados = await backend.buscarSubordinacao(id);
                    var departamentosDados = await backend.listarDepartamentos();
                    var cargosDados = await backend.listarCargos();
                    var atividadesDados = await backend.buscarDescricaoAtividades(id);
                    var expectativasDados = await backend.buscarDescricaoExpectativas(id);

                    setDados({
                        atribuicao: atribuicaoDados,
                        subordinacao: subordinacaoDados,
                        departamentos: departamentosDados,
                        cargos: cargosDados,
                        atividades: atividadesDados,
                        expectativas: expectativasDados
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
            } catch (error) {
                console.error('Error fetching data:', error);
                setAutenticacao({
                    admin: null,
                    carregando: false
                });
            }
        }

        buscarDados();
    }, [id]);

    function cancelar() {
        navigate('/atribuicoes/atribuicao/' + id);
    }

    async function editar() {
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
            var resposta = await backend.editarAtribuicao(id, departamento, unidade, cargo, jornada, superiores, horario, atividades, expectativas);

            if (resposta) {
                navigate('/atribuicoes/atribuicao/' + id);
            } else {
                alert('Não foi possível editar a atribuição');
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
                const { atribuicao, subordinacao, departamentos, cargos, atividades, expectativas } = dados;

                if (atribuicao) {
                    const getCor = (id) => {
                        const item = departamentos.find(dep => dep.id === parseInt(id));
                        const cor = item ? item.cor : null;
                        return cor;
                    }

                    return (
                        <>
                            <table className={style.tabela}>
                                <tbody>
                                    <tr>
                                        <td className={style.titulo}>Cargo</td>
                                        <td colSpan={3}><input id="cargo" type="text" defaultValue={atribuicao.cargo}></input></td>
                                    </tr>
                                    <tr style={{ background: getCor(atribuicao.departamento) }}>
                                        <td className={style.titulo}>Departamento</td>
                                        <td colSpan={3}>
                                            <select id="departamento" defaultValue={atribuicao.departamento} name="departamento">
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
                                            <select id="unidade" defaultValue={atribuicao.unidade} name="unidade">
                                                <option value="0">Hortolândia</option>
                                                <option value="1">Campinas</option>
                                            </select>
                                        </td>
                                        <td className={style.titulo}>Jornada semanal</td>
                                        <td>
                                            <select id="jornada" defaultValue={atribuicao.jornada} name="jornada">
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
                                                id={"reporta"}
                                                dados={subordinacao} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={style.titulo}>Horário de trabalho</td>
                                        <td colSpan={3}>
                                            <select id="horario" defaultValue={atribuicao.horario} name="horario">
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
                                            <p className={style.aviso}>Atenção: qualquer alteração às atividades será refletida nos POPs já cadastrados</p>
                                            {atividades ? <ListaDinamica id="atividades" dados={atividades} movivel={false} /> : <ListaDinamica id="atividades" movivel={false} />}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={style.cabecalho} colSpan={4}>Expectativas</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            {expectativas ? <ListaDinamica id="expectativas" dados={expectativas} movivel={true} /> : <ListaDinamica id="expectativas" movivel={true} />}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className={style.acoes}>
                                <button id="btadicionar" onClick={() => editar()}>Salvar alterações</button>
                                <button onClick={() => cancelar()}>Cancelar</button>
                            </div>
                        </>
                    );
                } else {
                    return (<ErrorPage />);
                }
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

export default EditAssignmentPage;