import style from "../Paginas.module.css";
import { Link, Outlet } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backend from '../../classes/Backend';
import React, { useState, useEffect } from "react";
import Recursos from "../../classes/Recursos";
import { useNavigate } from 'react-router-dom';

function AssignmentsPage() {
    const backend = new Backend();
    const recursos = new Recursos();
    const navigate = useNavigate();

    const [autenticacao, setAutenticacao] = useState({
        admin: null,
        carregando: true
    })

    const [dados, setDados] = useState({
        departamentos: null,
        atribuicoes: null
    })

    const [filtros, setFiltros] = useState({
        visivel: false,
        porDepartamento: null,
        porCargo: null
    })

    useEffect(() => {
        const buscarDados = async () => {
            try {
                var adminDados = await backend.checarAdmin();
                var atribuicoesDados = await backend.listarAtribuicoes();
                var departamentosDados = await backend.listarDepartamentos();

                setAutenticacao({
                    admin: adminDados,
                    carregando: false
                });

                setDados({
                    departamentos: departamentosDados,
                    atribuicoes: atribuicoesDados
                });

                setFiltros({
                    visivel: false,
                    porDepartamento: 0,
                    porCargo: null
                });
            } catch {
                setAutenticacao({
                    admin: null,
                    carregando: false
                });
            }
        }

        buscarDados();
    }, []);

    async function excluir(id) {
        const { admin } = autenticacao;

        if (admin) {
            if (window.confirm("Deseja excluir esta atribuição? Essa ação não pode ser desfeita") == true) {
                var resposta = backend.excluirAtribuicao(id);
                if (resposta) {
                    alert('Atribuição excluída com sucesso');
                    navigate('/atribuicoes');
                } else {
                    alert('Não foi possível excluir a atribuição, tente novamente');
                }
            }
        }
    }

    function renderizar() {
        const { departamentos, atribuicoes } = dados;
        const { admin } = autenticacao;

        const getCor = (id) => {
            const item = departamentos.find(dep => dep.id === parseInt(id));
            const cor = item ? item.cor : null;
            return cor;
        }

        const handleDepartamentoChange = (departamento) => {
            setFiltros({ ...filtros, porDepartamento: departamento });
        }

        const handleCargoChange = (cargo) => {
            setFiltros({ ...filtros, porCargo: cargo });
        }

        const mostrarFiltros = () => {
            setFiltros({ ...filtros, visivel: !filtros.visivel });
        }

        let atribuicoesFiltradas = [];
        if (atribuicoes) {
            atribuicoesFiltradas = atribuicoes;
            if (filtros.porDepartamento !== 0) {
                atribuicoesFiltradas = atribuicoes.filter(
                    (object) => object.departamento === filtros.porDepartamento
                );
            }

            if (filtros.porCargo) {
                atribuicoesFiltradas = atribuicoesFiltradas.filter(
                    (object) => object.cargo.toLowerCase().startsWith(filtros.porCargo.toLowerCase().trim())
                );
            }
        }

        return (
            <>
                <div className={style.lista}>
                    <div className={style.cabecalho}>
                        <h1><Link to={'/home'}><FontAwesomeIcon className={style.menu} icon={faHome}></FontAwesomeIcon></Link>Atribuições</h1>
                        <div className={style.containerfiltros}>
                            <div className={style.caixapesquisa}>
                                <input onChange={(e) => handleCargoChange(e.target.value)} placeholder="Pesquisar" />
                                <div className={style.ferramentafiltro}>
                                    <a onClick={() => mostrarFiltros()}><FontAwesomeIcon className={style.iconesacao} icon={faFilter}></FontAwesomeIcon></a>
                                </div>
                            </div>
                            {filtros.visivel &&
                                <div className={style.filtros} id="filtros">
                                    <p>Departamento:</p>
                                    <select id="departamento" name="departamento" onChange={(e) => handleDepartamentoChange(parseInt(e.target.value))}>
                                        <option value={0}>Todos</option>
                                        {departamentos ?
                                            departamentos.map((dep) => (
                                                <option key={dep.id} value={dep.id}>{dep.nome}</option>
                                            )) : ""
                                        }
                                    </select>
                                </div>    
                            }
                        </div>
                    </div>
                    <div id='lista-atribuicoes' className={style.elementos}>
                        {atribuicoes ?
                            atribuicoesFiltradas.map((atribuicao) => (
                                <div key={atribuicao.numero} className={style.elemento} style={{ background: getCor(atribuicao.departamento) }}>
                                    <div>
                                        <Link to={'atribuicao/' + atribuicao.numero} className={style.link}><p>{atribuicao.cargo}</p></Link>
                                    </div>

                                    {admin ?
                                        <div className={style.ferramentasadmin}>
                                            <Link to={'editar-atribuicao/' + atribuicao.numero}><FontAwesomeIcon className={style.iconesacao} icon={faPencil}></FontAwesomeIcon></Link>
                                            <a onClick={() => excluir(atribuicao.numero)}><FontAwesomeIcon className={style.iconesacao} icon={faTrash}></FontAwesomeIcon></a>
                                        </div> : ""
                                    }
                                </div>
                            ))
                            : <div className={style.carregando}>
                                <img src={recursos.getCarregando()} />
                            </div>}
                        {admin ?
                            <div className={style.elemento + " " + style.novaatribuicao}>
                                <Link to={'nova-atribuicao'}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Criar nova atribuição</Link>
                            </div> : ""
                        }
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

export default AssignmentsPage;