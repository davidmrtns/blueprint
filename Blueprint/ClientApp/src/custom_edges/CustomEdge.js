import React from 'react';
import { getSmoothStepPath } from 'reactflow';

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {
        strokeWidth: 1,
        stroke: '#383838'
    },
    data,
    markerStart,
    markerEnd
}) {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerStart={markerStart}
                markerEnd={markerEnd}
            />
        </>
    );
}
