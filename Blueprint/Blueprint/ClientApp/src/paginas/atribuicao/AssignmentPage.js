import React, { useState, useEffect, Component } from "react";
import { Link, BrowserRouter as Router, Route, useParams } from "react-router-dom";
import Recursos from "../../classes/Recursos";
import style from "../Paginas.module.css";
import ErrorPage from "../ErrorPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import Backend from '../../classes/Backend';

function AssignmentPage() {
    var { id } = useParams();
    const backend = new Backend();
    const recursos = new Recursos();

    const [erro, setErro] = useState(false);
    const [dados, setDados] = useState({
        atribuicao: null,
        departamentos: null,
        atribuicoes: null,
        atividades: null,
        expectativas: null,
        subordinacao: null
    })

    useEffect(() => {
        const buscarDados = async () => {
            setDados({
                atribuicao: null,
                departamentos: null,
                atribuicoes: null,
                atividades: null,
                expectativas: null,
                subordinacao: null
            });

            try {
                var atribuicaoDados = await backend.buscarAtribuicao(id);

                if (atribuicaoDados) {
                    var departamentosDados = await backend.listarDepartamentos();
                    var atribuicoesDados = await backend.listarAtribuicoes();
                    var atividadesDados = await backend.buscarAtividades(id);
                    var expectativasDados = await backend.buscarExpectativas(id);
                    var subordinacaoDados = await backend.buscarSubordinacao(id);

                    setDados({
                        atribuicao: atribuicaoDados,
                        departamentos: departamentosDados,
                        atribuicoes: atribuicoesDados,
                        atividades: atividadesDados,
                        expectativas: expectativasDados,
                        subordinacao: subordinacaoDados
                    });

                    setErro(false);
                } else {
                    setErro(true);
                }
            } catch {
                setErro(true);
            }
        }

        buscarDados();
    }, [id]);

    async function verPop(id) {
        var numPop;
        numPop = await backend.buscarNumPopAtividade(id);

        if (numPop && numPop != 0) {
            window.open("/pops/pop/" + numPop, "_blank");
        } else {
            alert("Não há nenhum POP relacionado à essa atividade ainda");
        }
    }

    function renderizar() {
        const { atribuicao, departamentos, atribuicoes, atividades, expectativas, subordinacao } = dados;

        const getSuperior = (id) => {
            const item = atribuicoes.find(atb => atb.numero === parseInt(id));
            const cargo = item ? item.cargo : null;
            return cargo;
        }

        const getCor = (id) => {
            const item = departamentos.find(dep => dep.id === parseInt(id));
            const cor = item ? item.cor : null;
            return cor;
        }

        const getNomeDepartamento = (id) => {
            const item = departamentos.find(dep => dep.id === parseInt(id));
            const nome = item ? item.nome : null;
            return nome;
        }

        if (erro) {
            return (<ErrorPage />);
        } else {
            if (atribuicao) {
                return (
                    <table className={style.tabela}>
                        <tbody>
                            <tr>
                                <td className={style.titulo}>Cargo</td>
                                <td colSpan={3}>{atribuicao.cargo}</td>
                            </tr>
                            <tr style={{ background: getCor(atribuicao.departamento) }}>
                                <td className={style.titulo}>Departamento</td>
                                <td colSpan={3}>{getNomeDepartamento(atribuicao.departamento)}</td>
                            </tr>
                            <tr>
                                <td className={style.titulo}>Unidade</td>
                                <td>{recursos.getUnidade(atribuicao.unidade)}</td>
                                <td className={style.titulo}>Jornada semanal</td>
                                <td>{atribuicao.jornada}</td>
                            </tr>
                            <tr>
                                <td className={style.titulo}>Reporta a</td>
                                <td colSpan={3}>
                                    {subordinacao ?
                                        <ul>
                                            {subordinacao.map((sub) => (
                                                <li key={subordinacao.id}>{getSuperior(sub.superior)}</li>
                                            ))}
                                        </ul> : <p className={style.semdado}>Nenhuma subordinação</p>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className={style.titulo}>Horário de trabalho</td>
                                <td colSpan={3}>{atribuicao.horario}</td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho} colSpan={4}>Descrição das atividades</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    {atividades ?
                                        <ol>
                                            {atividades.map((item) => <li key={item.numero}>{item.descricao};<a className={style.linkexterno} onClick={() => verPop(item.numero)}> <FontAwesomeIcon className={style.icone} icon={faSquareArrowUpRight}></FontAwesomeIcon></a></li>)}
                                        </ol> : <p className={style.semdado}>Nenhuma atividade</p>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho} colSpan={4}>Expectativas</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    {expectativas ?
                                        <ol>
                                            {expectativas.map((item) => <li key={item.numero}>{item.descricao};</li>)}
                                        </ol> : <p className={style.semdado}>Nenhuma expectativa</p>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                );
            } else {
                return (
                    <div className={style.carregando}>
                        <img src={recursos.getCarregando()} />
                    </div>
                );
            }
        }
    }

    return (
        <div id="tabela-atribuicao">
            {renderizar()}
        </div>
    ); 
}

export default AssignmentPage;