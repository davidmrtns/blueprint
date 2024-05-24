# <img src="/Blueprint/Blueprint/ClientApp/src/imagens/blueprint-colorido.svg" width="30px"> Blueprint
## Descrição do projeto
O Blueprint é um aplicativo web ASP.NET Core de gestão de Procedimentos Operacionais Padrão (POP) de cada função dos colaboradores de uma empresa.

## Entidades
O Blueprint compreende dentro do seu escopo dois tipos de entidades: **Atribuição e POP**.

### Atribuição
Uma atribuição é uma ficha que reúne informações da função de um colaborador, sendo elas:
- Nome do cargo;
- Departamento;
- Unidade;
- Jornada semanal;
- Superior hierárquico;
- Horário de trabalho (integral/meio-período);
- Atividades;
- Expectativas.

### POP
O POP (Procedimento Operacional Padrão) é uma ficha criada a partir de cada atividade de uma atribuição. Reúne informações sobre como desempenhar a atividade, sendo essas informações:
- Data em que foi estabelecido;
- Data de revisão;
- Função responsável pela atividade;
- Nome da operação;
- Materiais necessários;
- Passos críticos (passo a passo a ser seguido para desempenhar a tarefa);
- Manuseio do material;
- Resultado esperado;
- Ações corretivas;
- Habilidades esperadas.

## Desenvolvimento
### Status do projeto
O projeto ainda não está completamente concluído.

### Tecnologias utilizadas
- Backend desenvolvido em C#;
- Frontend desenvolvido com o framework React;
- Banco de dados projetado em MySQL.

### Roadmap
1. Inclusão de fluxos
2. Geração de organograma baseado nas atribuições cadastradas

## Autores
David Martins - Backend, Frontend e Banco de dados
