import React, { useState, useEffect, Component } from "react";
import { Link, BrowserRouter as Router, Route, useParams } from "react-router-dom";
import style from "../Paginas.module.css";
import { useNavigate } from 'react-router-dom';
import Backend from '../../classes/Backend';
import Recursos from "../../classes/Recursos";
import ListaDinamica from "../../components/ListaDinamica";

function EditPopPage() {
    var { id } = useParams();
    const backend = new Backend();
    const recursos = new Recursos();
    const navigate = useNavigate();

    const [autenticacao, setAutenticacao] = useState({
        admin: null,
        carregando: true
    })

    const [dados, setDados] = useState({
        pop: null,
        materiais: null,
        pontosCriticos: null,
        manuseios: null,
        resultados: null,
        acoesCorretivas: null,
        habilidades: null,
        cargoResponsavel: null,
        departamentos: null,
        operacao: null,
        atribuicoesDep: null,
    })

    useEffect(() => {
        const buscarDados = async () => {
            setDados({
                pop: null,
                materiais: null,
                pontosCriticos: null,
                manuseios: null,
                resultados: null,
                acoesCorretivas: null,
                habilidades: null,
                cargoResponsavel: null,
                departamentos: null,
                operacao: null,
                atribuicoesDep: null,
            });

            setAutenticacao({
                carregando: true
            });

            try {
                var adminDados = await backend.checarAdmin();
                var popDados = await backend.buscarPop(id);

                if (adminDados && popDados) {
                    var materiaisDados = await backend.buscarDescricaoMateriais(id);
                    var pontosCriticosDados = await backend.buscarDescricaoPontosCriticos(id);
                    var manuseiosDados = await backend.buscarDescricaoManuseios(id);
                    var resultadosDados = await backend.buscarDescricaoResultados(id);
                    var acoesCorretivasDados = await backend.buscarDescricaoAcoesCorretivas(id);
                    var habilidadesDados = await backend.buscarDescricaoHabilidades(id);
                    var cargoResponsavelDados = await backend.buscarCargoResponsavel(popDados.responsavel);
                    var departamentosDados = await backend.listarDepartamentos();
                    var operacaoDados = await backend.buscarDescricaoAtividade(popDados.numAtividade);
                    var atribuicoesDepDados = await backend.listarAtribuicoesDepartamento(popDados.departamento);

                    setDados({
                        pop: popDados,
                        materiais: materiaisDados,
                        pontosCriticos: pontosCriticosDados,
                        manuseios: manuseiosDados,
                        resultados: resultadosDados,
                        acoesCorretivas: acoesCorretivasDados,
                        habilidades: habilidadesDados,
                        cargoResponsavel: cargoResponsavelDados,
                        departamentos: departamentosDados,
                        operacao: operacaoDados,
                        atribuicoesDep: atribuicoesDepDados
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
        var responsavel = document.getElementById("atribuicao-selecionada").value;
        var atividade = document.getElementById("atividade").value.trim();
        var materiais = document.getElementById("materiais").value;
        var pontosCriticos = document.getElementById("pontoscriticos").value;
        var manuseios = document.getElementById("manuseios").value;
        var resultados = document.getElementById("resultados").value;
        var acoesCorretivas = document.getElementById("acoescorretivas").value;
        var habilidades = document.getElementById("habilidades").value;

        if (responsavel == "" || departamento == "" || atividade == "") {
            alert('Preencha corretamente os campos!');
            botao.disabled = false;
        } else {
            var resposta = await backend.editarPop(id, departamento, "0000-00-00", "0000-00-00", atividade, 0, responsavel, materiais,
                pontosCriticos, manuseios, resultados, acoesCorretivas, habilidades);

            if (resposta) {
                navigate('/pops/pop/' + id);
            } else {
                alert('Não foi possível editar o POP');
            }
        }
    }

    function renderizar(){
        const { admin, carregando } = autenticacao;

        if (carregando) {
            return (
                <div className={style.carregando}>
                    <img src={recursos.getCarregando()} />
                </div>
            );
        } else {
            if (admin) {
                const { pop, materiais, pontosCriticos, manuseios, resultados, acoesCorretivas, habilidades, cargoResponsavel, departamentos, operacao, atribuicoesDep } = dados;

                if (pop) {
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
                                        <td colSpan={3}>
                                            <select disabled={true} id="departamento" defaultValue={pop.departamento} name="departamento" /*onChange={() => atualizarAtb()}*/>
                                                <option value="">-</option>
                                                {departamentos.map((dep) => (
                                                    <option key={dep.id} value={dep.id}>{dep.nome}</option>
                                                ))
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={style.cabecalho}>Responsável pela tarefa</td>
                                        <td colSpan={3}>
                                            <div id="select-atribuicoes">
                                                {atribuicoesDep ?
                                                    <select disabled={true} id="atribuicao-selecionada" defaultValue={pop.responsavel} /*onChange={() => atualizarAtv()}*/>
                                                        <option value="">-</option>
                                                        {atribuicoesDep.map((atb) => (
                                                            <option key={atb.numero} value={atb.numero}>{atb.cargo}</option>
                                                        ))
                                                        }
                                                    </select> :
                                                    <p>Carregando...</p>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={style.cabecalho}>Nome da operação</td>
                                        <td colSpan={3}>
                                            <div id="select-atividade">
                                                <input type="text" id="atividade" defaultValue={operacao} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={style.cabecalho} colSpan={4}>Materiais necessários</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            <div>
                                                {materiais ? <ListaDinamica id="materiais" dados={materiais} movivel={true} /> : <ListaDinamica id="materiais" movivel={true} />}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={style.cabecalho} colSpan={4}>Passos críticos</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            <div>
                                                {pontosCriticos ? <ListaDinamica id="pontoscriticos" dados={pontosCriticos} movivel={true} /> : <ListaDinamica id="pontoscriticos" movivel={true} />}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={style.cabecalho} colSpan={4}>Manuseio do material</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            <div>
                                                {manuseios ? <ListaDinamica id="manuseios" dados={manuseios} movivel={true} /> : <ListaDinamica id="manuseios" movivel={true} />}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={style.cabecalho} colSpan={4}>Resultado esperado</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            <div>
                                                {resultados ? <ListaDinamica id="resultados" dados={resultados} movivel={true} /> : <ListaDinamica id="resultados" movivel={true} />}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={style.cabecalho} colSpan={4}>Ações corretivas</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            <div>
                                                {acoesCorretivas ? <ListaDinamica id="acoescorretivas" dados={acoesCorretivas} movivel={true} /> : <ListaDinamica id="acoescorretivas" movivel={true} />}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={style.cabecalho} colSpan={4}>Habilidades esperadas do time</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            <div>
                                                {habilidades ? <ListaDinamica id="habilidades" dados={habilidades} movivel={true} /> : <ListaDinamica id="habilidades" movivel={true} />}
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
                                <button id="btadicionar" onClick={() => editar()}>Salvar</button>
                                <button onClick={() => cancelar()}>Cancelar</button>
                            </div>
                        </>
                    );
                }
            }
        }
    }

    return (
        <div id="tabela-pop-edicao">
            {renderizar()}
        </div>
    );
}

export default EditPopPage;