import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import style from "../Paginas.module.css";
import ErrorPage from "../ErrorPage";
import Recursos from "../../classes/Recursos";
import Backend from '../../classes/Backend';

function PopPage() {
    var { id } = useParams();
    const backend = new Backend();
    const recursos = new Recursos();

    const [erro, setErro] = useState(false);
    const [dados, setDados] = useState({
        pop: null,
        materiais: null,
        pontosCriticos: null,
        manuseios: null,
        resultados: null,
        acoesCorretivas: null,
        habilidades: null,
        cargoResponsavel: null,
        operacao: null,
        departamentos: null
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
                operacao: null,
                departamentos: null
            });

            try {
                var popDados = await backend.buscarPop(id);

                if (popDados) {
                    var pontosCriticosDados = await backend.buscarPontosCriticos(id);
                    var materiaisDados = await backend.buscarMateriais(id);
                    var manuseiosDados = await backend.buscarManuseios(id);
                    var resultadosDados = await backend.buscarResultados(id);
                    var acoesCorretivasDados = await backend.buscarAcoesCorretivas(id);
                    var habilidadesDados = await backend.buscarHabilidades(id);
                    var cargoResponsavelDados = await backend.buscarCargoResponsavel(popDados.responsavel);
                    var operacaoDados = await backend.buscarDescricaoAtividade(popDados.numAtividade);
                    var departamentosDados = await backend.listarDepartamentos();
                    
                    setDados({
                        pop: popDados,
                        materiais: materiaisDados,
                        pontosCriticos: pontosCriticosDados,
                        manuseios: manuseiosDados,
                        resultados: resultadosDados,
                        acoesCorretivas: acoesCorretivasDados,
                        habilidades: habilidadesDados,
                        cargoResponsavel: cargoResponsavelDados,
                        operacao: operacaoDados,
                        departamentos: departamentosDados
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

    function renderizar() {
        const { pop, materiais, pontosCriticos, manuseios, resultados, acoesCorretivas, habilidades, cargoResponsavel, operacao, departamentos } = dados;

        const getNomeDepartamento = (id) => {
            const item = departamentos.find(dep => dep.id === parseInt(id));
            const nome = item ? item.nome : null;
            return nome;
        }

        const getCor = (id) => {
            const item = departamentos.find(dep => dep.id === parseInt(id));
            const cor = item ? item.cor : null;
            return cor;
        }

        if (erro) {
            return (<ErrorPage />);
        } else {
            if (pop) {
                var dataEstabelecido = new Date(pop.estabelecido);
                var dataRevisado = new Date(pop.revisado);
                var dataEstabFormat = dataEstabelecido.toLocaleDateString("pt-BR");
                var dataRevFormat = dataRevisado.toLocaleDateString("pt-BR");

                return (
                    <table className={style.tabela}>
                        <tbody>
                            <tr>
                                <td colSpan={2} rowSpan={2}>
                                    <h1>Procedimento Operacional Padrão</h1>
                                </td>
                                <td className={style.cabecalho}>N° POP</td>
                                <td>{pop.numero}</td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho}>Estabelecido em</td>
                                <td>{dataEstabFormat}</td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho} style={{ background: getCor(pop.departamento) }}>Departamento</td>
                                <td style={{ background: getCor(pop.departamento) }}>{getNomeDepartamento(pop.departamento)}</td>
                                <td className={style.cabecalho}>Revisão em</td>
                                <td>{dataRevFormat}</td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho}>Responsável pelas tarefas</td>
                                <td>{cargoResponsavel}</td>
                                <td className={style.cabecalho}>N° da revisão</td>
                                <td>{pop.numRevisao}</td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho}>Nome da operação</td>
                                <td colSpan={3}>{operacao}</td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho} colSpan={4}>Materiais necessários</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    {materiais ?
                                        <ol>
                                            {materiais.map((item) => <li key={item.numero}>{item.descricao};</li>)}
                                        </ol> : <p className={style.semdado}>Nenhum material</p>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho} colSpan={4}>Passos críticos</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    {pontosCriticos ?
                                        <ol>
                                            {pontosCriticos.map((item) => <li key={item.numero}>{item.descricao};</li>)}
                                        </ol> : <p className={style.semdado}>Nenhum passo crítico</p>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho} colSpan={4}>Manuseio do material</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    {manuseios ?
                                        <ol>
                                            {manuseios.map((item) => <li key={item.numero}>{item.descricao};</li>)}
                                        </ol> : <p className={style.semdado}>Nenhum passo de manuseio</p>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho} colSpan={4}>Resultado esperado</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    {resultados ?
                                        <ol>
                                            {resultados.map((item) => <li key={item.numero}>{item.descricao};</li>)}
                                        </ol> : <p className={style.semdado}>Nenhum resultado</p>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho} colSpan={4}>Ações corretivas</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    {acoesCorretivas ?
                                        <ol>
                                            {acoesCorretivas.map((item) => <li key={item.numero}>{item.descricao};</li>)}
                                        </ol> : <p className={style.semdado}>Nenhuma ação corretiva</p>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className={style.cabecalho} colSpan={4}>Habilidades esperadas do time</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    {habilidades ?
                                        <ol>
                                            {habilidades.map((item) => <li key={item.numero}>{item.descricao};</li>)}
                                        </ol> : <p className={style.semdado}>Nenhuma habilidade esperada</p>
                                    }
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
        <div id="tabela-pop">
            {renderizar()}
        </div>
    );
}

export default PopPage;