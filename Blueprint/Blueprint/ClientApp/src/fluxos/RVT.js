import { useState, useCallback } from 'react';
import 'reactflow/dist/style.css';
import Recursos from '../classes/Recursos';
import { Position } from 'reactflow';

class RVT {
    getNodes() {
        var recursos = new Recursos();
        return [
            {
                id: 'negocios',
                type: 'group',
                position: {
                    x: -88,
                    y: 0
                },
                style: {
                    width: 768,
                    height: 1760,
                    border: 0,
                    background: recursos.getCorDepartamento(1),
                    opacity: 0.29
                }
            },
            {
                id: 'recepcao',
                type: 'group',
                position: {
                    x: 1119,
                    y: 0
                },
                style: {
                    width: 310,
                    height: 1760,
                    border: 0,
                    background: recursos.getCorDepartamento(5),
                    opacity: 0.29
                }
            },
            {
                id: 'juridico',
                type: 'group',
                position: {
                    x: 1492,
                    y: 0
                },
                style: {
                    width: 310,
                    height: 1760,
                    border: 0,
                    background: recursos.getCorDepartamento(3),
                    opacity: 0.29
                }
            },
            {
                id: 'administrativo',
                type: 'group',
                position: {
                    x: 746,
                    y: 0
                },
                style: {
                    width: 310,
                    height: 1760,
                    border: 0,
                    background: recursos.getCorDepartamento(4),
                    opacity: 0.29
                }
            },
            {
                id: '1',
                data: { label: 'Captação de leads' },
                position: { x: 224, y: 15 },
                type: 'input',
                style: {
                    background: recursos.getCorDepartamento(1)
                },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '2',
                type: 'image',
                data: { imgSrc: recursos.getLogoGoogleAds(), fundo: recursos.getCorDepartamento(1) },
                position: { x: 18, y: 114 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '3',
                type: 'image',
                data: { imgSrc: recursos.getLogoFaceAds(), fundo: recursos.getCorDepartamento(1) },
                position: { x: 203.5, y: 114 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '4',
                type: 'image',
                data: { titulo: 'Carteira de clientes', icon: true, imgSrc: recursos.getIconCarteira(), fundo: recursos.getCorDepartamento(1) },
                position: { x: 546.6, y: 118.6 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '5',
                type: 'image',
                data: { imgSrc: recursos.getLogoRd(), sourceHandle: Position.Right, quantSourceHandles: 2, fundo: recursos.getCorDepartamento(1) },
                position: { x: 18, y: 217 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '6',
                type: 'image',
                data: { imgSrc: recursos.getIconDigisac(), icon: true, targetHandle: Position.Left, fundo: recursos.getCorDepartamento(1) },
                position: { x: 297.7, y: 204 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '7',
                type: 'image',
                data: { titulo: 'Clientes presenciais', icon: true, imgSrc: recursos.getIconClientes(), fundo: recursos.getCorDepartamento(1) },
                position: { x: 419, y: 119 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '8',
                type: 'image',
                data: { titulo: 'Indicação', icon: true, imgSrc: recursos.getIconIndicacao(), fundo: recursos.getCorDepartamento(1) },
                position: { x: 693, y: 118.5 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '9',
                type: 'image',
                data: { imgSrc: recursos.getLogoRd(), sourceHandle: Position.Right, fundo: recursos.getCorDepartamento(1) },
                position: { x: 548.4, y: 286.2 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '10',
                type: 'iconText',
                data: { imgSrc: recursos.getIconTecno(), titulo: 'Atualizar ou cadastrar contato no TecnoJuris', targetHandle: Position.Left, sourceHandle: Position.Bottom, fundo: recursos.getCorDepartamento(5) },
                position: { x: 77, y: 264.8 },
                parentNode: 'recepcao',
                extent: 'parent'
            },
            {
                id: '11',
                type: 'iconText',
                data: { imgSrc: recursos.getIconClientes(), titulo: 'Solicitar documentos: envio físico', fundo: recursos.getCorDepartamento(5) },
                position: { x: 77, y: 382 },
                parentNode: 'recepcao',
                extent: 'parent'
            },
            {
                id: '12',
                type: 'iconText',
                data: { imgSrc: recursos.getIconTecno(), segImgSrc: recursos.getIconLuci(), titulo: 'Emitir recibo ao cliente e anotar no histórico do TecnoJuris', fundo: recursos.getCorDepartamento(5) },
                position: { x: 77, y: 510 },
                parentNode: 'recepcao',
                extent: 'parent'
            },
            {
                id: '13',
                type: 'iconText',
                data: { imgSrc: recursos.getIconDigisac(), segImgSrc: recursos.getIconMicrosip(), titulo: 'Entrar em contato com a lead para identificação de interesse', fundo: recursos.getCorDepartamento(1) },
                position: { x: 33.7, y: 317 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '14',
                type: 'iconText',
                data: { imgSrc: recursos.getIconDigisac(), segImgSrc: recursos.getIconMicrosip(), sourceHandle: Position.Right, quantSourceHandles: 2, titulo: 'Explicar sobre a revisão e checar pré-requisitos básicos', fundo: recursos.getCorDepartamento(1), pop: 1 },
                position: { x: 33.7, y: 452.6 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '15',
                type: 'iconText',
                data: { imgSrc: recursos.getIconLuci(), titulo: 'Enviar documentos recebidos para controladoria (monitoramento)', fundo: recursos.getCorDepartamento(3), targetHandle: Position.Left },
                position: { x: 70, y: 1010.6 },
                parentNode: 'juridico',
                extent: 'parent'
            },
            {
                id: '16',
                type: 'iconText',
                data: { imgSrc: recursos.getIconLuci(), titulo: 'Distribuir para realização de cálculo (providência)', fundo: recursos.getCorDepartamento(3) },
                position: { x: 70, y: 1140 },
                parentNode: 'juridico',
                extent: 'parent'
            },
            {
                id: '17',
                type: 'iconText',
                data: { imgSrc: recursos.getIconCalculo(), targetHandle: Position.Right, titulo: 'Realizar cálculo', fundo: recursos.getCorDepartamento(4), pop: 2 },
                position: { x: 70, y: 1150 },
                parentNode: 'administrativo',
                extent: 'parent'
            },
            {
                id: '18',
                type: 'condition',
                data: { titulo: "Há necessidade?", targetHandle: Position.Left },
                position: { x: 290, y: 426 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '19',
                type: 'iconText',
                data: { imgSrc: recursos.getIconMeet(), SourcetHandle: Position.Left, titulo: 'Agendar atendimento online para sanar dúvidas pontuais', fundo: recursos.getCorDepartamento(1) },
                position: { x: 278.6, y: 606 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '20',
                type: 'iconText',
                data: { imgSrc: recursos.getIconDigisac(), titulo: 'Solicitar documentos: envio eletrônico', sourceHandle: Position.Right, fundo: recursos.getCorDepartamento(1), quantSourceHandles: 2 },
                position: { x: 33.7, y: 823 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '21',
                type: 'iconText',
                data: { imgSrc: recursos.getIconPdf(), targetHandle: Position.Left, titulo: 'Organizar documentos em um único arquivo PDF em ordem cronológica', fundo: recursos.getCorDepartamento(4) },
                position: { x: 70, y: 815 },
                parentNode: 'administrativo',
                extent: 'parent'
            },
            {
                id: '22',
                type: 'iconText',
                data: { imgSrc: recursos.getIconTecno(), titulo: 'Registrar o recebimento no TecnoJuris e anexar o documento', fundo: recursos.getCorDepartamento(4) },
                position: { x: 70, y: 950 },
                parentNode: 'administrativo',
                extent: 'parent'
            },
            {
                id: '23',
                type: 'iconText',
                data: { imgSrc: recursos.getIconMicrosip(), segImgSrc: recursos.getIconDigisac(), targetHandle: Position.Left, titulo: 'Agendar devolutiva com o cliente', fundo: recursos.getCorDepartamento(5) },
                position: { x: 70, y: 1350 },
                parentNode: 'recepcao',
                extent: 'parent'
            },
            {
                id: '24',
                type: 'iconText',
                data: { imgSrc: recursos.getIconLuci(), titulo: 'Monitorar se o cliente compareceu à consulta', fundo: recursos.getCorDepartamento(5) },
                position: { x: 70, y: 1490 },
                parentNode: 'recepcao',
                extent: 'parent'
            },
            {
                id: '25',
                type: 'iconText',
                data: { imgSrc: recursos.getIconTecno(), sourceHandle: Position.Right, titulo: 'Cadastrar cliente no TecnoJuris com dados básicos (para geração de contrato)', fundo: recursos.getCorDepartamento(1), pop: 3 },
                position: { x: 33.5, y: 1011 },
                parentNode: 'negocios',
                extent: 'parent'
            },
            {
                id: '26',
                type: 'ending',
                position: { x: 82, y: 1611 },
                parentNode: 'recepcao',
                extent: 'parent'
            }
        ];
    }

    getEdges() {
        return [
            {
                id: '1-2',
                source: '1',
                target: '2',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '1-3',
                source: '1',
                target: '3',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '1-4',
                source: '1',
                target: '4',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '2-5',
                source: '2',
                target: '5',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '5-6',
                source: '5',
                target: '6',
                sourceHandle: 'a',
                type: 'custom',
                markerStart: { type: 'arrowclosed', orient: 'auto-start-reverse', color: '#383838', width: 100, height: 20 },
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '3-6',
                source: '3',
                target: '6',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '1-7',
                source: '1',
                target: '7',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '1-8',
                source: '1',
                target: '8',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '4-9',
                source: '4',
                target: '9',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '7-9',
                source: '7',
                target: '9',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '8-9',
                source: '8',
                target: '9',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '9-10',
                source: '9',
                target: '10',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '10-11',
                source: '10',
                target: '11',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '11-12',
                source: '11',
                target: '12',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '5-13',
                source: '5',
                target: '13',
                sourceHandle: 'b',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '13-14',
                source: '13',
                target: '14',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '12-15',
                source: '12',
                target: '15',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '15-16',
                source: '15',
                target: '16',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '16-17',
                source: '15',
                target: '17',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '14-18',
                source: '14',
                target: '18',
                sourceHandle: 'a',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '18-19',
                source: '18',
                target: '19',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '19-20',
                source: '19',
                target: '20',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '14-20',
                source: '14',
                target: '20',
                sourceHandle: 'b',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '20-21',
                source: '20',
                target: '21',
                sourceHandle: 'a',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '21-22',
                source: '21',
                target: '22',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '22-15',
                source: '22',
                target: '15',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '17-23',
                source: '17',
                target: '23',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '23-24',
                source: '23',
                target: '24',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '20-25',
                source: '20',
                target: '25',
                sourceHandle: 'b',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '25-15',
                source: '25',
                target: '15',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            },
            {
                id: '24-26',
                source: '24',
                target: '26',
                type: 'custom',
                markerEnd: { type: 'arrowclosed', color: '#383838', width: 100, height: 20 }
            }
        ];
    }
}

export default RVT;
