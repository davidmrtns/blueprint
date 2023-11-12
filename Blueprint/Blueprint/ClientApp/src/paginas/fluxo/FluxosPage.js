import style from "../Paginas.module.css";
import { Link, Outlet } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from "react";
import Backend from '../../classes/Backend';
import Recursos from "../../classes/Recursos";
import { useNavigate } from 'react-router-dom';

function FluxosPage() {
    const backend = new Backend();
    const recursos = new Recursos();
    const navigate = useNavigate();

    function renderizar() {
        return (
            <>
                <div className={style.lista}>
                    <div className={style.cabecalho}>
                        <h1><Link to={'/home'}><FontAwesomeIcon className={style.menu} icon={faHome}></FontAwesomeIcon></Link>Fluxos</h1>
                        <div className={style.containerfiltros}>
                            <div className={style.caixapesquisa}>
                                <input /*onChange={(e) => handleOperacaoChange(e.target.value)}*/ placeholder="Pesquisar" />
                                <div className={style.ferramentafiltro}>
                                    <a /*onClick={() => mostrarFiltros()}*/><FontAwesomeIcon className={style.iconesacao} icon={faFilter}></FontAwesomeIcon></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='lista-pops' className={style.elementos}>
                    </div>
                </div>

                <div className={style.conteudo}>
                    <Outlet />
                </div>
            </>
        );
    }

    return (
        <div className={style.container}>
            {renderizar()}
        </div>
    );
}

export default FluxosPage;