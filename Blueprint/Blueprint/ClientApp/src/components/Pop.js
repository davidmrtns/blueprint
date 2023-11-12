import React from "react";
import ReactDOM from "react-dom/client";
import Recursos from "../classes/Recursos";
import style from "./Pop.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class Pop {
    exibirPop(node) {
        if (node.data.pop) {
            var recursos = new Recursos();
            var pop = recursos.getPop(node.data.pop);

            var popCard = document.querySelector('#pop');
            popCard.style.display = 'block';
            popCard.style.background = node.data.fundo;
            const root = ReactDOM.createRoot(popCard);

            var nPop = pop.numero,
                dataEstabelecido = pop.estabelecido,
                nomeProcesso = pop.nomeProcesso,
                setor = pop.setor,
                responsavel = pop.responsavel,
                material = pop.material,
                pontosCriticos = pop.pontosCriticos,
                resultado = pop.resultado,
                acoesCorretivas = pop.acoesCorretivas;

            var element = (
                <div className={style.popCard}>
                    <div>
                        <h2>Procedimento Operacional Padrão</h2>
                        <div className={style.linha}></div>
                    </div>

                    <div className={style.conteudo}>
                        <p>N° POP: {nPop} | Estabelecido em: {dataEstabelecido}</p>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Processo interno</td>
                                    <td>{nomeProcesso}</td>
                                </tr>
                                <tr>
                                    <td>Setor:</td>
                                    <td>{setor}</td>
                                </tr>
                                <tr>
                                    <td>Responsável pela tarefa:</td>
                                    <td>{responsavel}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan='2'><strong>Material necessário</strong></td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <ol>
                                            {material.map((item) => <li>{item}</li>)}
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2'><strong>Pontos críticos</strong></td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <ol>
                                            {pontosCriticos.map((item) => <li>{item}</li>)}
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2'><strong>Resultado esperado</strong></td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <ol>
                                            {resultado.map((item) => <li>{item}</li>)}
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2'><strong>Ações corretivas</strong></td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <ol>
                                            {acoesCorretivas.map((item) => <li>{item}</li>)}
                                        </ol>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <button className={style.botao} type="button" onClick={this.fecharPop}><FontAwesomeIcon className={style.icone + " " + style.fechar} icon={faSquareXmark}></FontAwesomeIcon></button>
                        <button className={style.botao} type="button"><a target="_blank" href={"/pop/" + nPop}><FontAwesomeIcon className={style.icone} icon={faSquareArrowUpRight}></FontAwesomeIcon></a></button>
                    </div>
                </div>
            );
            root.render(element);
        }
    }

    fecharPop() {
        var popCard = document.querySelector('#pop');
        if (popCard.style.display == "block") {
            popCard.style.display = "none";
            this.limparPop();
        }
    }

    limparPop() {
        var popCard = document.querySelector('#pop');
        const root = ReactDOM.createRoot(popCard);
        root.render(<div></div>);
    }
}

export default Pop;
