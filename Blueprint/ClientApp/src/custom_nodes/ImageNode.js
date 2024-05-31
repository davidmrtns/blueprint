import { Handle, Position } from 'reactflow';
import style from './ImageNode.module.css';

function ImageNode({ data }) {
    return (
        <>
            {data.targetHandle ?
                <Handle className={style.ocultarHandle} type="target" position={data.targetHandle} /> : <Handle className={style.ocultarHandle} type="target" position={Position.Top} />
            }
            <img className={style.imagem + " " + (data.icon ? style.icon : "")} src={data.imgSrc} alt="logo" />

            {data.titulo ?
                <p className={style.titulo}>{data.titulo}</p> : ""
            }

            {data.sourceHandle ?
                <Handle className={style.ocultarHandle} type="source" position={data.sourceHandle} id="a" /> : <Handle className={style.ocultarHandle} type="source" position={Position.Bottom} id="a" />
            }

            {data.quantSourceHandles ?
                <Handle className={style.ocultarHandle} type="source" position={Position.Bottom} id="b" /> : ""
            }
        </>
    );
};

export default ImageNode;