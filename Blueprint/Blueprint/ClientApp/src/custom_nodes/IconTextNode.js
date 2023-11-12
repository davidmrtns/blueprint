import { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import style from './IconTextNode.module.css';
import blueprint from '../imagens/blueprint-colorido.svg';

function IconTextNode({ data }) {
    return (
        <div className={style.corpo + " " + (data.pop ? style.popClick : "")} style={{ background: data.fundo }}>
            {data.targetHandle ?
                <Handle className={style.ocultarHandle} type="target" position={data.targetHandle} /> : <Handle className={style.ocultarHandle} type="target" position={Position.Top} />
            }

            {data.pop ?
                <img className={style.popIcon} src={blueprint} /> : ""
            }

            <img className={style.imagem + " " + style.posPrim + " " + (data.icon ? style.icon : "")} src={data.imgSrc} alt="logo" />

            {data.segImgSrc ?
                <img className={style.imagem + " " + style.posSec + " " + (data.icon ? style.icon : "")} src={data.segImgSrc} alt="logo" /> : ""
            }

            <p className={style.titulo}>{data.titulo}</p>

            {data.sourceHandle ?
                <Handle className={style.ocultarHandle} type="source" position={data.sourceHandle} id="a" /> : <Handle className={style.ocultarHandle} type="source" position={Position.Bottom} id="a" />
            }

            {data.quantSourceHandles ?
                <Handle className={style.ocultarHandle} type="source" position={Position.Bottom} id="b" /> : ""
            }
        </div>
    );
};

export default IconTextNode;
