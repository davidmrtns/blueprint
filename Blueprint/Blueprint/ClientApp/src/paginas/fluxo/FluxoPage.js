import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import style from "../Paginas.module.css";
import ErrorPage from "../ErrorPage";
import Recursos from "../../classes/Recursos";
import Backend from '../../classes/Backend';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import Draggable from 'react-draggable';

function FluxoPage() {
    function renderizar() {
        return (
            <div className={style.flowraiz}>
                <Draggable bounds='parent'>
                    <div id="pop" className={style.flowpop}>
                        <h2>Pop</h2>
                    </div>
                </Draggable>

                <div className={style.flow}>
                    <ReactFlow
                        //nodes={nodes}
                        //onNodesChange={onNodesChange}
                        //edges={edges}
                        //onEdgesChange={onEdgesChange}
                        //onConnect={onConnect}
                        //onNodeClick={onNodeClick}
                        //nodeTypes={nodeTypes}
                        //edgeTypes={edgeTypes}
                        //nodesDraggable={false}
                        //proOptions={{ hideAttribution: true }}
                        id="flow-root"
                    >
                        <MiniMap /*nodeColor={nodeColor}*/ nodeStrokeWidth={3} zoomable pannable ariaLabel={false} />
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
            </div>
        );
    }

    return (
        <div id="tabela-pop">
            {renderizar()}
        </div>
    );
}

export default FluxoPage;