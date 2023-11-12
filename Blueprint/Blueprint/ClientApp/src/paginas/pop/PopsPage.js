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

function PopsPage() {
    const backend = new Backend();
    const recursos = new Recursos();
    const navigate = useNavigate();

    const [autenticacao, setAutenticacao] = useState({
        admin: null,
        carregando: true
    })

    const [dados, setDados] = useState({
        atividades: null,
        atribuicoes: null,
        departamentos: null,
        pops: null
    })

    const [filtros, setFiltros] = useState({
        visivel: false,
        porDepartamento: null,
        porOperacao: null,
        porResponsavel: null
    })

    useEffect(() => {
        const buscarDados = async () => {
            try {
                var adminDados = await backend.checarAdmin();
                var atividadesDados = await backend.buscarTodasAtividades();
                var popsDados = await backend.listarPops();
                var departamentosDados = await backend.listarDepartamentos();
                var atribuicoesDados = await backend.listarAtribuicoes();

                setAutenticacao({
                    admin: adminDados,
                    carregando: false
                });

                setDados({
                    atividades: atividadesDados,
                    atribuicoes: atribuicoesDados,
                    departamentos: departamentosDados,
                    pops: popsDados
                });

                setFiltros({
                    visivel: false,
                    porDepartamento: 0,
                    porOperacao: null,
                    porResponsavel: 0
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
            if (window.confirm("Deseja excluir este POP? Essa ação não pode ser desfeita") == true) {
                var resposta = backend.excluirPop(id);
                if (resposta) {
                    alert('POP excluído com sucesso');
                    navigate('/pops');
                } else {
                    alert('Não foi possível excluir o POP, tente novamente');
                }
            }
        }
    }

    function renderizar() {
        const { atividades, atribuicoes, departamentos, pops } = dados;
        const { admin } = autenticacao;

        const getCor = (id) => {
            const item = departamentos.find(dep => dep.id === parseInt(id));
            const cor = item ? item.cor : null;
            return cor;
        }

        const getOperacao = (id) => {
            const item = atividades.find(atv => atv.numero === parseInt(id));
            return item.descricao;
        }

        const handleDepartamentoChange = (departamento) => {
            setFiltros({ ...filtros, porDepartamento: departamento });
        }

        const handleOperacaoChange = (operacao) => {
            setFiltros({ ...filtros, porOperacao: operacao });
        }

        const handleResponsavelChange = (responsavel) => {
            setFiltros({ ...filtros, porResponsavel: responsavel });
        }

        const mostrarFiltros = () => {
            setFiltros({ ...filtros, visivel: !filtros.visivel });
        }

        let popsFiltrados = [];
        if (pops) {
            popsFiltrados = pops;
            if (filtros.porDepartamento !== 0) {
                popsFiltrados = pops.filter(
                    (object) => object.departamento === filtros.porDepartamento
                );
            }

            if (filtros.porResponsavel !== 0) {
                popsFiltrados = popsFiltrados.filter(
                    (object) => object.responsavel === filtros.porResponsavel
                );
            }

            if (filtros.porOperacao) {
                const matchingIds = [];
                atividades.forEach((item) => {
                    if (item.descricao.toLowerCase().startsWith(filtros.porOperacao.toLowerCase().trim())) {
                        matchingIds.push(parseInt(item.numero));
                    }
                });

                popsFiltrados = popsFiltrados.filter(
                    (object) => matchingIds.includes(object.numAtividade)
                );
            }
        }

        return (
            <>
                <div className={style.lista}>
                    <div className={style.cabecalho}>
                        <h1><Link to={'/home'}><FontAwesomeIcon className={style.menu} icon={faHome}></FontAwesomeIcon></Link>POPs</h1>
                        <div className={style.containerfiltros}>
                            <div className={style.caixapesquisa}>
                                <input onChange={(e) => handleOperacaoChange(e.target.value)} placeholder="Pesquisar" />
                                <div className={style.ferramentafiltro}>
                                    <a onClick={() => mostrarFiltros()}><FontAwesomeIcon className={style.iconesacao} icon={faFilter}></FontAwesomeIcon></a>
                                </div>
                            </div>
                            {filtros.visivel &&
                                <div>
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
                                    <div className={style.filtros} id="filtros">
                                        <p>Responsável:</p>
                                        <select id="responsavel" name="responsavel" onChange={(e) => handleResponsavelChange(parseInt(e.target.value))}>
                                            <option value={0}>Todos</option>
                                            {atribuicoes ?
                                                atribuicoes.map((atb) => (
                                                    <option key={atb.numero} value={atb.numero}>{atb.cargo}</option>
                                                )) : ""
                                            }
                                        </select>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div id='lista-pops' className={style.elementos}>
                        {pops ?
                            popsFiltrados.map((pop) => (
                                <div key={pop.numero} className={style.elemento} style={{ background: getCor(pop.departamento) }}>
                                    <div>
                                        <Link to={'pop/' + pop.numero} className={style.link}><p>{getOperacao(pop.numAtividade)}</p></Link>
                                    </div>

                                    {admin ?
                                        <div className={style.ferramentasadmin}>
                                            <Link to={'editar-pop/' + pop.numero}><FontAwesomeIcon className={style.iconesacao} icon={faPencil}></FontAwesomeIcon></Link>
                                            <a onClick={() => excluir(pop.numero)}><FontAwesomeIcon className={style.iconesacao} icon={faTrash}></FontAwesomeIcon></a>
                                        </div> : ""
                                    }
                                </div>
                            ))
                            : <div className={style.carregando}>
                                <img src={recursos.getCarregando()} />
                            </div>}
                        {admin ?
                            <div className={style.elemento + " " + style.novaatribuicao}>
                                <Link to={'novo-pop'}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Criar novo POP</Link>
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

export default PopsPage;