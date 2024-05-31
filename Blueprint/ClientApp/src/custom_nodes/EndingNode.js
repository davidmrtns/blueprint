import { Handle, Position } from 'reactflow';
import style from './EndingNode.module.css';

function EndingNode() {
    return (
        <div className={style.circle}>
            <Handle className={style.ocultarHandle} type="target" position={Position.Top} />

            <svg height="100" width="100" preserveAspectRatio='none'>
                <circle cx="50" cy="50" r="40" className={style.inner} />
            </svg>
        </div>
    );
};

export default EndingNode;
