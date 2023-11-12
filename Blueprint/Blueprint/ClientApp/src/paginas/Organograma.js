import React, { useEffect, useState, useCallback, useStoreState } from "react";
import Backend from "../classes/Backend";
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
import dagre from "dagre";

function Organograma() {
    var backend = new Backend();
    const [graphData, setGraphData] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        const buscarDados = async () => {
            var dados = await backend.gerarOrganograma();
            setGraphData(dados);
            setNodes(dados.nodes);
            setEdges(dados.edges);
        }

        buscarDados();
    }, []);

    function handleFlowLoad(reactFlowInstance) {
        var nodePositions = {};

        if (nodes && nodes.length > 0) {
            const dagreGraph = new dagre.graphlib.Graph();
            dagreGraph.setDefaultEdgeLabel(() => ({}));

            nodes.forEach((node) => {
                dagreGraph.setNode(node.id, { width: 172, height: 32 });
            });

            edges.forEach((edge) => {
                dagreGraph.setEdge(edge.source, edge.target);
            });

            dagre.layout(dagreGraph);

            nodePositions = nodes.reduce((positions, node) => {
                const nodeWithPosition = dagreGraph.node(node.id);
                const x = nodeWithPosition.x - 172 / 2;
                const y = nodeWithPosition.y - 32 / 2;

                return {
                    ...positions,
                    [node.id]: { x, y }
                };
            }, {});
            
            /*nodes.forEach((node) => {
                const nodeWithPosition = dagreGraph.node(node.id);
                node.targetPosition = 'top';
                node.sourcePosition = 'bottom';

                nodePositions[node.id] = {
                    x: nodeWithPosition.x - 172 / 2,
                    y: nodeWithPosition.y - 32 / 2
                };
            });*/
        }

        reactFlowInstance.setNodePositions(nodePositions);
    }

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    function renderizar() {
        
        return (
            <>
                {graphData ? 
                    <div style={{ width: '100vw', height: '100vh' }}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            nodesDraggable={true}
                            onEdgesChange={onEdgesChange}
                            onNodesChange={onNodesChange}
                            onLoad={handleFlowLoad}
                        >
                            <Background />
                            <Controls />
                        </ReactFlow>
                    </div> : <p>Carregando...</p>
                }
                
            </>
        );
    }

    return (
        <div>
            <ReactFlowProvider>
                {renderizar()}
            </ReactFlowProvider>
        </div>
    );
}

export default Organograma;