class Backend {
    async adicionarAtribuicao(departamento, unidade, cargo, jornada, superiores, horario, atividades, expectativas) {
        var resposta;
        try {
            await fetch('api/adicionar-atribuicao', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    numero: 0,
                    departamento: departamento,
                    unidade: unidade,
                    cargo: cargo,
                    jornada: jornada,
                    superiores: superiores,
                    horario: horario,
                    atividades: atividades,
                    expectativas: expectativas
                })
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async adicionarPop(departamento, estabelecido, numAtividade, responsavel, materiais, pontosCriticos, manuseios, resultados, acoesCorretivas, habilidades) {
        var resposta;
        try {
            await fetch('api/adicionar-pop', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    numero: 0,
                    departamento: departamento,
                    estabelecido: estabelecido,
                    revisado: estabelecido,
                    numAtividade: numAtividade,
                    numRevisao: 0,
                    responsavel: responsavel,
                    materiais: materiais,
                    pontosCriticos: pontosCriticos,
                    manuseios: manuseios,
                    resultados: resultados,
                    acoesCorretivas: acoesCorretivas,
                    habilidades: habilidades
                })
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async editarAtribuicao(numero, departamento, unidade, cargo, jornada, superiores, horario, atividades, expectativas) {
        var resposta;
        try {
            await fetch('api/editar-atribuicao', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    numero: numero,
                    departamento: departamento,
                    unidade: unidade,
                    cargo: cargo,
                    jornada: jornada,
                    superiores: superiores,
                    horario: horario,
                    atividades: atividades,
                    expectativas: expectativas
                })
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null
        }

        return resposta;
    }

    async editarPop(numero, departamento, estabelecido, revisado, atividade, numRevisao, responsavel, materiais, pontosCriticos, manuseios, resultados, acoesCorretivas, habilidades) {
        var resposta;
        try {
            await fetch('api/editar-pop', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    numero: numero,
                    departamento: departamento,
                    estabelecido: estabelecido,
                    revisado: revisado,
                    atividade: atividade,
                    numRevisao: numRevisao,
                    responsavel: responsavel,
                    materiais: materiais,
                    pontosCriticos: pontosCriticos,
                    manuseios: manuseios,
                    resultados: resultados,
                    acoesCorretivas: acoesCorretivas,
                    habilidades: habilidades
                })
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null
        }

        return resposta;
    }

    async buscarAtribuicao(id) {
        var resposta;
        try {
            await fetch('api/buscar-atribuicao/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async buscarPop(id) {
        var resposta;
        try {
            await fetch('api/buscar-pop/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async buscarAtividades(id) {
        var resposta;
        try {
            await fetch('api/buscar-atividades/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarTodasAtividades() {
        var resposta;
        try {
            await fetch('api/buscar-todas-atividades/', {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarExpectativas(id) {
        var resposta;
        try {
            await fetch('api/buscar-expectativas/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarMateriais(id) {
        var resposta;
        try {
            await fetch('api/buscar-materiais/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarPontosCriticos(id) {
        var resposta;
        try {
            await fetch('api/buscar-pontos-criticos/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarManuseios(id) {
        var resposta;
        try {
            await fetch('api/buscar-manuseios/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarResultados(id) {
        var resposta;
        try {
            await fetch('api/buscar-resultados/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarAcoesCorretivas(id) {
        var resposta;
        try {
            await fetch('api/buscar-acoes-corretivas/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json())
                .then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarHabilidades(id) {
        var resposta;
        try {
            await fetch('api/buscar-habilidades/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarCargoResponsavel(id) {
        var resposta;
        try {
            await fetch('api/buscar-cargo-responsavel/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async buscarSubordinacao(id) {
        var resposta;
        try {
            await fetch('api/buscar-subordinacoes/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta
    }

    async buscarDescricaoAtividades(id) {
        var resposta;
        try {
            await fetch('api/buscar-descricao-atividades/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarDescricaoAtividade(id) {
        var resposta;
        try {
            await fetch('api/buscar-descricao-atividade/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarDescricaoExpectativas(id) {
        var resposta;
        try {
            await fetch('api/buscar-descricao-expectativas/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = false;
        }

        return resposta;
    }

    async buscarDescricaoMateriais(id) {
        var resposta;
        try {
            await fetch('api/buscar-descricao-materiais/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async buscarDescricaoPontosCriticos(id) {
        var resposta;
        try {
            await fetch('api/buscar-descricao-pontos-criticos/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async buscarDescricaoManuseios(id) {
        var resposta;
        try {
            await fetch('api/buscar-descricao-manuseios/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data; });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async buscarDescricaoResultados(id) {
        var resposta;
        try {
            await fetch('api/buscar-descricao-resultados/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async buscarDescricaoAcoesCorretivas(id) {
        var resposta;
        try {
            await fetch('api/buscar-descricao-acoes-corretivas/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async buscarDescricaoHabilidades(id) {
        var resposta;
        try {
            await fetch('api/buscar-descricao-habilidades/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json())
                .then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async listarAtribuicoes() {
        var resposta;
        await fetch('api/listar-atribuicoes', {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((data) => { resposta = data });

        return resposta;
    }

    async listarAtribuicoesDepartamento(id) {
        var resposta;
        try {
            await fetch('api/listar-atribuicoes-departamento/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async listarPops() {
        var resposta;
        await fetch('api/listar-pops', {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((data) => { resposta = data });

        return resposta;
    }

    async listarDepartamentos() {
        var resposta;

        await fetch('api/listar-departamentos', {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((data) => { resposta = data });

        return resposta;
    }

    async listarCargos() {
        var resposta;
        await fetch('api/listar-cargos', {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((data) => { resposta = data });

        return resposta;
    }

    async buscarNumPopAtividade(id) {
        var resultado;
        await fetch('api/buscar-num-pop-atividade/' + id, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((data) => { resultado = data });

        return resultado;
    }

    async buscarAtividadesSemPop(id) {
        var resposta;
        try {
            await fetch('api/buscar-atividades-sem-pop/' + id, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async excluirAtribuicao(id) {
        var resposta;
        await fetch('api/excluir-atribuicao/' + id, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((data) => { resposta = data });

        return resposta;
    }

    async excluirPop(id) {
        var resposta;
        await fetch('api/excluir-pop/' + id, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((data) => { resposta = data });

        return resposta;
    }

    async inserirUsuario(nome, nomeUsuario, senha, admin) {
        var resposta;

        await fetch('api/inserir-usuario', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                nomeUsuario: nomeUsuario,
                senha: senha,
                admin: admin
            })
        }).then((response) => response.json()).then((data) => { resposta = data });

        return resposta;
    }

    async buscarUsuario() {
        var resposta;

        try {
            await fetch('auth/usuario', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch {
            resposta = null;
        }

        return resposta;
    }

    async listarUsuarios() {
        var resposta;

        await fetch('auth/listar-usuarios', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((data) => { resposta = data });

        return resposta;
    }

    async conectar(usuario, senha) {
        var resposta;
        try {
            await fetch('auth', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usuario,
                    password: senha
                })
            }).then((response) => response.json())
                .then((data) => { resposta = data });

            if (resposta) {
                window.location.href = "/home";
            } else {
                alert('O usuário ou senha inseridos não existem');
                return false;
            }
        } catch {
            alert('Um erro ocorreu');
            return false;
        }
    }

    async checarAdmin() {
        var resposta;
        await fetch('auth/admin', {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((data) => { resposta = data });

        return resposta;
    }

    async checarLogin() {
        var resposta;
        await fetch('auth/validar', {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((data) => { resposta = data });

        return resposta;
    }

    async desconectar() {
        fetch('auth/desconectar', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => { window.location.href = "/home" });
    }

    async gerarOrganograma() {
        var resposta;
        await fetch('api/organograma', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((data) => { resposta = data });

        return resposta;
    }
}

export default Backend;