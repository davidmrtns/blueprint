import React, { useEffect, useState, useCallback, useStoreState } from "react";
import Recursos from "../classes/Recursos";
import style from './OrganogramaEstatico.module.css';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    useNodesState,
    useEdgesState,
    useReactFlow,
    MiniMap,
    ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import Backend from '../classes/Backend';

function Organograma() {
    var recursos = new Recursos();
    var backend = new Backend();

    const [departamentos, setDepartamentos] = useState(null);

    useEffect(() => {
        const buscarDados = async () => {
            try {
                var departamentosDados = await backend.listarDepartamentos();

                setDepartamentos(departamentosDados);
            } catch {

            }
        }

        buscarDados();
    }, []);

    function renderizar() {
        return (
            <>
                <table className={style.tabledep}>
                    <tbody>
                        <tr>
                            <td className={style.cabecalho}>Departamentos</td>
                        </tr>
                        {departamentos ?
                            departamentos.map((dep) => (
                                <tr key={dep.nome}>
                                    <td style={{ background: dep.cor }}>{dep.nome}</td>
                                </tr>
                            )) : <tr><td></td></tr>
                        }
                    </tbody>
                </table>
            </>
        );
    }

    return (
        <div>
            {renderizar()}
        </div>
    );
}

export default Organograma;