import { Handle, Position } from 'reactflow';
import style from './ConditionNode.module.css';

function ConditionNode({ data }) {
    return (
        <div className={style.diamond}>
            {data.targetHandle ?
                <Handle className={style.ocultarHandle + " " + style.target} type="target" position={data.targetHandle} /> : <Handle className={style.ocultarHandle + " " + style.target} type="target" position={Position.Top} />
            }

            <svg viewBox='0 0 100 100' preserveAspectRatio='none'>
                <filter id="dropshadow" height="125%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                    <feOffset dx="0" dy="0" result="offsetblur" />
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <path d='M8,50 50,8 92,50 50,92z' className={style.inner} />
            </svg>

            {data.titulo}

            {data.sourceHandle ?
                <Handle className={style.ocultarHandle + " " + style.source} type="source" position={data.sourceHandle} id="a" /> : <Handle className={style.ocultarHandle + " " + style.source} type="source" position={Position.Bottom} id="a" />
            }
        </div>
    );
};

export default ConditionNode;
