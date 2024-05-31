import React, { useState, useEffect, Component, useRef } from "react";
import style from './ListaDinamica.module.css';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backend from "../classes/Backend";

function ListaDinamicaSuperiores({ id, dados }) {
    var backend = new Backend();
    const [superiores, setSuperiores] = useState([]);
    const [atribuicoes, setAtribuicoes] = useState([]);

    function adicionar() {
        var valor = document.getElementById("superiores").value;
        var cargo = document.getElementById("superiores").options[document.getElementById("superiores").selectedIndex].text;

        if (valor && !superiores.some(item => item.valor === parseInt(valor))) {
            valor = parseInt(valor);
            setSuperiores([...superiores, {valor, cargo}]);
        }
    }

    function excluir(index) {
        const novoSuperiores = [...superiores];
        novoSuperiores.splice(index, 1);
        setSuperiores(novoSuperiores);
    }

    const renderSuperiores = (superior, index) => {
        return (
            <li key={index}>
                <input key={index} type="text" value={superior.cargo} readOnly={true} />
                <a className={style.adicionar} onClick={() => excluir(index)}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></a>
            </li>
        );
    }

    useEffect(() => {
        const buscarDados = async () => {
            var atribuicoesDados = await backend.listarAtribuicoes();
            setAtribuicoes(atribuicoesDados);

            if (dados) {
                setSuperiores(prevSuperiores => dados.map((d) => {
                    const item = atribuicoesDados.find((atb) => atb.numero === d.superior);
                    const cargo = item ? item.cargo : null;
                    const valor = item ? item.numero : null;
                    return { valor, cargo };
                }))
            }
            
        }
        buscarDados();
    }, [])

    useEffect(() => {
        var codigos = superiores.map((superior) => superior.valor);
        var semicolonSeparated = codigos.join(';');

        if (!semicolonSeparated.endsWith(";") && semicolonSeparated != "") {
            semicolonSeparated += ";";
        }

        document.getElementById(id).value = semicolonSeparated;
    }, [superiores])

    return (
        <div className={style.listadinamica}>
            <div>
                <select onChange={() => adicionar()} id="superiores" name="superiores">
                    <option value="">-</option>
                    {atribuicoes.map((atb) => (
                        <option value={atb.numero}>{atb.cargo}</option>
                    ))
                    }
                </select>
            </div>
            <div>
                <ol>
                    {superiores.map(renderSuperiores)}
                </ol>
            </div>

            <textarea style={{ display: 'none' }} readOnly={true} id={id}></textarea>
        </div>
    );
}

export default ListaDinamicaSuperiores;