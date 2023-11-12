import style from './HomePage.module.css';
import React from 'react';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faDiagramNext } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Recursos from '../classes/Recursos';

function HomePage() {
    var recursos = new Recursos();

    let navigate = useNavigate();
    const routeFluxos = () => {
        let path = '/fluxos';
        alert('Esse recurso ainda está em desenvolvimento e pode apresentar falhas');
        navigate(path);
        //alert("Esse recurso ainda está em desenvolvimento");
    }

    const routePops = () => {
        let path = '/pops';
        navigate(path);
    }

    const routeAtribuicoes = () => {
        let path = '/atribuicoes';
        navigate(path);
    }

    const routeOrganograma = () => {
        /*let path = '/organograma';
        navigate(path);*/
        alert('Esse recurso ainda está em desenvolvimento');
    }

    function mostrarOpcoes() {
        var estado = document.getElementById("opcoesconta").style.display;

        if (estado == "block") {
            document.getElementById("opcoesconta").style.display = "none";
        } else {
            document.getElementById("opcoesconta").style.display = "block";
        }
    }

    function desconectar() {
        fetch('auth/desconectar', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => { window.location.href = "/home" });
    }

    function configuracoes() {
        window.location.href = "/configuracoes"
    }

    return (
        <div className={style.container}>
            <div className={style.conta}>
                <div className={style.contaicone}>
                    <FontAwesomeIcon icon={faUser} onClick={mostrarOpcoes} />
                    <div id="opcoesconta" className={style.opcoes}>
                        <ul>
                            <li onClick={configuracoes}><FontAwesomeIcon icon={faGear} /></li>
                            <li onClick={desconectar}><FontAwesomeIcon icon={faRightFromBracket} /></li>
                        </ul>
                    </div>
                </div>           
            </div>
            <div className={style.cabecalho}>
                <img alt='Logotipo da empresa' className={style.logoemp} src={recursos.getLogoBlueprintVazado()} />
                <h1>Blueprint</h1>
            </div>
            <div className={style.containercards}>
                <div onClick={routePops} className={style.card}>
                    <p>POPs</p>
                    <p className={style.icone}><FontAwesomeIcon icon={faDiagramNext} /></p>
                </div>
                <div onClick={routeAtribuicoes} className={style.card}>
                    <p>Atribuições</p>
                    <p className={style.icone}><FontAwesomeIcon icon={faUsers} /></p>
                </div>
                <div onClick={routeFluxos} className={style.card}>
                    <p>Fluxos</p>
                    <p className={style.icone}><FontAwesomeIcon icon={faDiagramProject} /></p>
                </div>
                <div onClick={routeOrganograma} className={style.card}>
                    <p>Organograma</p>
                    <p className={style.icone}><FontAwesomeIcon icon={faSitemap} /></p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;