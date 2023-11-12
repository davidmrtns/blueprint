import React, { useState, useEffect, Component } from "react";
import style from "../Paginas.module.css";
import ListaDinamica from "../../components/ListaDinamica";
import Backend from '../../classes/Backend';
import Recursos from "../../classes/Recursos";
import { useNavigate } from 'react-router-dom';

function NewPopPage() {
    const backend = new Backend();
    const recursos = new Recursos();
    const navigate = useNavigate();

    const [autenticacao, setAutenticacao] = useState({
        admin: null,
        carregando: true
    })

    const [dados, setDados] = useState({
        departamentos: null,
        atribuicoesDepartamento: null,
        atividadesSemPop: null
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
        var resposta;

        var departamento = document.getElementById("departamento").value.trim();
        var estabelecido = document.getElementById("dataestabelecido").value;
        var responsavel = document.getElementById("atribuicao-selecionada").value;
        var numAtividade = document.getElementById("atividade-selecionada").value.trim();
        var materiais = document.getElementById("materiais").value;
        var pontosCriticos = document.getElementById("pontoscriticos").value;
        var manuseios = document.getElementById("manuseios").value;
        var resultados = document.getElementById("resultados").value;
        var acoesCorretivas = document.getElementById("acoescorretivas").value;
        var habilidades = document.getElementById("habilidades").value;

        if (responsavel == "" || departamento == "" || responsavel == "" || numAtividade == "") {
            alert('Preencha corretamente os campos!');
            botao.disabled = false;
        } else {
            var resposta = await backend.adicionarPop(departamento, estabelecido, numAtividade, responsavel, materiais, pontosCriticos, manuseios, resultados, acoesCorretivas, habilidades);

            if (resposta && resposta != 0) {
                navigate('/pops/pop/' + resposta);
            } else {
                alert('Não foi possível incluir o POP');
                botao.disabled = false;
            }
        }
    }

    function atualizarAtribuicoes(id) {
        const atualizar = async () => {
            var atribuicoesDepDados = await backend.listarAtribuicoesDepartamento(id);

            if (atribuicoesDepDados) {
                setDados((prevState) => ({
                    ...prevState,
                    atribuicoesDepartamento: atribuicoesDepDados
                }));
            }
        }
        atualizar();
    }

    async function atualizarAtividades(id) {
        const atualizar = async () => {
            var atividadesSemPopDados = await backend.buscarAtividadesSemPop(id);

            if (atividadesSemPopDados) {
                setDados((prevState) => ({
                    ...prevState,
                    atividadesSemPop: atividadesSemPopDados
                }));
            }
        }
        atualizar();
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
                const { departamentos, atribuicoesDepartamento, atividadesSemPop } = dados;
                var hoje = new Date();
                var hojeFormat = hoje.toISOString().substring(0, 10);

                return (
                    <>
                        <table className={style.tabela}>
                            <tbody>
                                <tr>
                                    <td colSpan={4}>
                                        <h1>Procedimento Operacional Padrão</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho}>Departamento</td>
                                    <td>
                                        <select id="departamento" name="departamento" onChange={(e) => atualizarAtribuicoes(e.target.value)}>
                                            <option value="">-</option>
                                            {departamentos.map((dep) => (
                                                <option value={dep.id}>{dep.nome}</option>
                                            ))
                                            }
                                        </select>
                                    </td>
                                    <td className={style.cabecalho}>Estabelecido em</td>
                                    <td>
                                        <input id="dataestabelecido" type="date" defaultValue={hojeFormat} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho}>Responsável pela tarefa</td>
                                    <td colSpan={3}>
                                        <div id="select-atribuicoes">
                                            <select id="atribuicao-selecionada" onChange={(e) => atualizarAtividades(e.target.value)}>
                                                <option value="">-</option>
                                                {atribuicoesDepartamento ? atribuicoesDepartamento.map((atrib) => (
                                                    <option value={atrib.numero}>{atrib.cargo}</option>
                                                ))
                                                : ""}
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho}>Nome da operação</td>
                                    <td colSpan={3}>
                                        <div id="select-atividade">
                                            <select id="atividade-selecionada">
                                                {atividadesSemPop ?
                                                    atividadesSemPop.map((atv) => (
                                                        <option key={atv.numero} value={atv.numero}>
                                                            {atv.descricao}
                                                        </option>
                                                    ))
                                                    : <option value="">-</option>}
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho} colSpan={4}>Materiais necessários</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <div>
                                            <ListaDinamica id="materiais" movivel={true} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho} colSpan={4}>Passos críticos</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <div>
                                            <ListaDinamica id="pontoscriticos" movivel={true} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho} colSpan={4}>Manuseio do material</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <div>
                                            <ListaDinamica id="manuseios" movivel={true} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho} colSpan={4}>Resultado esperado</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <div>
                                            <ListaDinamica id="resultados" movivel={true} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho} colSpan={4}>Ações corretivas</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <div>
                                            <ListaDinamica id="acoescorretivas" movivel={true} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho} colSpan={4}>Habilidades esperadas do time</td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <div>
                                            <ListaDinamica id="habilidades" movivel={true} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.cabecalho} colSpan={4}>Aprovação</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Operação</td>
                                    <td colSpan={2}>Aprovado</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Supervisão</td>
                                    <td colSpan={2}>Aprovado</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Diretoria</td>
                                    <td colSpan={2}>Aprovado</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className={style.acoes}>
                            <button id="btadicionar" onClick={() => adicionar()}>Salvar</button>
                            <button onClick={() => cancelar()}>Cancelar</button>
                        </div>
                    </>
                );
            }
        }
    }
    
    return (
        <div id="tabela-pop-edicao">
            {renderizar()}
        </div>
    );
}

export default NewPopPage;