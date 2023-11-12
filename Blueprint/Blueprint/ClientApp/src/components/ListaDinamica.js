import React, { useState, useEffect, Component, useRef } from "react";
import style from './ListaDinamica.module.css';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ListaDinamica({ id, dados, movivel }) {

    const [opcoes, setOpcoes] = useState(dados || []);

    function adicionar() {
        var valor = document.getElementById("novo-valor-" + id).value.trim();

        if (valor) {
            if (valor.includes(';')) {
                alert('Ponto e vírgula (;) não é um caractere permitido');
            } else {
                if (valor != "") {
                    setOpcoes([...opcoes, valor]);
                    document.getElementById("novo-valor-" + id).value = "";
                } else {
                    alert('Preencha o campo corretamente!');
                }
            }
        } else {
            alert('Preencha o campo corretamente!');
        }
    }

    function excluir(index) {
        const updatedOpcoes = [...opcoes];
        updatedOpcoes.splice(index, 1);
        setOpcoes(updatedOpcoes);
    }

    function enviar(e) {
        if (e.keyCode === 13) {
            adicionar();
        }
    }

    const handleOpcaoChange = (index, value) => {
        if (value.trim() != "") {
            const updatedOpcoes = [...opcoes];
            updatedOpcoes[index] = value;
            setOpcoes(updatedOpcoes);
        } else {
            excluir(index);
        }
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        'list-style-type': isDragging ? "disc" : "",
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver) => ({
        'list-style-type': isDraggingOver ? "none" : ""
    })

    const renderOpcaoInput = (opcao, index) => {
        if (movivel) {
            return (
                <Draggable key={index} draggableId={"draggable-" + index} index={index}>
                    {(provided, snapshot) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                            <input key={index} type="text" value={opcao} onChange={(e) => handleOpcaoChange(index, e.target.value)} />
                            <a className={style.adicionar} onClick={() => excluir(index)}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></a>
                        </li>
                    )}
                </Draggable>
            );
        } else {
            return (
                <li>
                    <input key={index} type="text" value={opcao} onChange={(e) => handleOpcaoChange(index, e.target.value)} />
                    <a className={style.adicionar} onClick={() => excluir(index)}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></a>
                </li>
            );
        }
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(opcoes);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setOpcoes(items);
    }

    useEffect(() => {
        var semicolonSeparated = opcoes.join(';');

        if (!semicolonSeparated.endsWith(";") && semicolonSeparated != "") {
            semicolonSeparated += ";";
        }

        document.getElementById(id).value = semicolonSeparated;
    }, [opcoes])

    return (
        <div className={style.listadinamica}>
            <div>
                <input placeholder="Digite um item da lista..." className={style.novodado} type="text" id={"novo-valor-" + id} onKeyDown={(e) => enviar(e)} />
                <a className={style.adicionar} onClick={() => adicionar()}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></a>
            </div>
            <div>
                {movivel ?
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId={"droppable-" + id}>
                            {(provided, snapshot) => (
                                <ol {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                    {opcoes.map(renderOpcaoInput)}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                    </DragDropContext>
                    : <ol>{opcoes.map(renderOpcaoInput)}</ol>
                }
            </div>
            <textarea style={{ display: 'none' }} readOnly={true} id={id}></textarea>
        </div>
    );
}

export default ListaDinamica;