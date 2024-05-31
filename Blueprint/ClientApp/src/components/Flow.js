import { useState, useCallback, Component, useEffect } from 'react';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    useNodesState,
    useEdgesState,
    useReactFlow,
    MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';
import RVT from '../fluxos/RVT';
import ImageNode from '../custom_nodes/ImageNode';
import IconTextNode from '../custom_nodes/IconTextNode';
import ConditionNode from '../custom_nodes/ConditionNode';
import EndingNode from '../custom_nodes/EndingNode';
import style from './Flow.module.css';
import CustomEdge from '../custom_edges/CustomEdge';
import Pop from './Pop';
import Draggable from 'react-draggable';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var pop = new Pop();
const nodeTypes = { image: ImageNode, iconText: IconTextNode, condition: ConditionNode, ending: EndingNode };
const edgeTypes = { custom: CustomEdge };
const onNodeClick = (event, node) => pop.exibirPop(node);

function getNodes(idSparks) {
    if (idSparks == "rvt") {
        var rvt = new RVT();
        const initialNodes = rvt.getNodes();
        return initialNodes;
    }
}

function getEdges(idSparks) {
    if (idSparks == "rvt") {
        var rvt = new RVT();
        const initialEdges = rvt.getEdges();
        return initialEdges;
    }
}

function Flow() {
    const [nodes, setNodes] = useState(getNodes("rvt"));
    const [edges, setEdges] = useState(getEdges("rvt"));

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const escFunction = useCallback((event) => {
        var pop = new Pop();
        if (event.key == "Escape") {
            pop.fecharPop();
        }
    });

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    //desativado para prevenir conexões de nodes no modo de visualização
    //const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const nodeColor = (node) => {
        switch (node.type) {
            case 'group':
                return 'transparent';
            case 'image':
            case 'iconText':
                return node.data.fundo;
            case 'condition':
            case 'ending':
                return 'gray';
        }
    }

    return (
        <div className={style.raiz}>
            <div className={style.controles}>
                <h2 id='titulo-sparks'><a href='/home'><FontAwesomeIcon className={style.menu} icon={faBars}></FontAwesomeIcon></a>Fluxograma ● Revisão da Vida Toda</h2>
            </div>

            <Draggable bounds='parent'>
                <div id="pop" className={style.pop}>
                    <h2>Pop</h2>
                </div>
            </Draggable>

            <div className={style.flow}>
                <ReactFlow
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    //onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    nodesDraggable={false}
                    proOptions={{ hideAttribution: true }}
                    id="flow-root"
                >
                    <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable ariaLabel={false} />
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}

export default Flow;
