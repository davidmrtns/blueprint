using Microsoft.AspNetCore.Mvc;
using Blueprint.Classes;
using Blueprint.ViewModels;
using System.Globalization;
using System.Text.Json;
using System.Linq;

namespace Blueprint.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        /*ADICIONAR*/

        [Route("adicionar-atribuicao")]
        [HttpPost]
        public IActionResult AdicionarAtribuicao([FromBody] AtribuicaoCompletaModel atribuicao)
        {
            long numTemp;
            int resultado = 0;
            string[] listaValores;

            int numero = atribuicao.Numero;
            int departamento = atribuicao.Departamento;
            int unidade = atribuicao.Unidade;
            string cargo = atribuicao.Cargo;
            string jornada = atribuicao.Jornada;
            string horario = atribuicao.Horario;

            try
            {
                Atribuicao a = new Atribuicao(numero, departamento, cargo, unidade, jornada, horario);
                numTemp = a.AdicionarAtribuicao();

                if (numTemp != null)
                {
                    int numFK = (int)numTemp;

                    listaValores = atribuicao.Atividades.Split(";");
                    InserirAtividades(listaValores, numFK);

                    listaValores = atribuicao.Expectativas.Split(";");
                    InserirExpectativas(listaValores, numFK);

                    listaValores = atribuicao.Superiores.Split(";");
                    InserirSubordinacoes(listaValores, numFK);

                    resultado = numFK;
                }
            }
            catch
            {
                resultado = 0;
            }

            return Ok(resultado);
        }

        [Route("adicionar-pop")]
        [HttpPost]
        public IActionResult AdicionarPop([FromBody] PopModel pop)
        {
            long numTemp;
            int resultado = 0;
            string[] listaValores;

            int numero = pop.Numero;
            int departamento = pop.Departamento;
            DateTime estabelecido = DateTime.ParseExact(pop.Estabelecido, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            DateTime revisado = DateTime.ParseExact(pop.Revisado, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            int numRevisao = pop.NumRevisao;
            int responsavel = pop.Responsavel;
            int numAtividade = pop.NumAtividade;

            try
            {
                Pop p = new Pop(numero, departamento, estabelecido, revisado, numRevisao, responsavel, numAtividade);
                numTemp = p.AdicionarPop();

                if (numTemp != null)
                {
                    int numFK = (int)numTemp;

                    listaValores = pop.Materiais.Split(";");
                    InserirMateriais(listaValores, numFK);

                    listaValores = pop.PontosCriticos.Split(";");
                    InserirPontosCriticos(listaValores, numFK);

                    listaValores = pop.Manuseios.Split(";");
                    InserirManuseios(listaValores, numFK);

                    listaValores = pop.Resultados.Split(";");
                    InserirResultados(listaValores, numFK);

                    listaValores = pop.AcoesCorretivas.Split(";");
                    InserirAcoesCorretivas(listaValores, numFK);

                    listaValores = pop.Habilidades.Split(";");
                    InserirHabilidades(listaValores, numFK);

                    resultado = numFK;
                }
            }
            catch
            {
                resultado = 0;
            }

            return Ok(resultado);
        }

        /*LISTAR*/

        [HttpGet]
        [Route("listar-atribuicoes")]
        public IActionResult ListarAtribuicoes()
        {
            List<Atribuicao> atribuicoes = Atribuicao.GerarListaAtribuicoes();

            if (atribuicoes != null)
            {
                return Ok(atribuicoes);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("listar-atribuicoes-departamento/{id}")]
        [Route("listar-atribuicoes-departamento")]
        public IActionResult ListarAtribuicoesPorDepartamento(int id)
        {
            List<Atribuicao> atribuicoes = Atribuicao.ListarAtribuicoesPorDepartamento(id);

            if (atribuicoes != null)
            {
                return Ok(atribuicoes);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet]
        [Route("listar-pops")]
        public IActionResult ListarPops()
        {
            List<Pop> pops = Pop.GerarListaPops();

            if (pops != null)
            {
                return Ok(pops);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet]
        [Route("listar-departamentos")]
        public IActionResult ListarDepartamentos()
        {
            List<Departamento> departamentos = Departamento.GerarListaDepartamentos();

            if (departamentos != null)
            {
                return Ok(departamentos);
            }
            else
            {
                return NoContent();
            }
        }

        /*BUSCAR*/

        [HttpGet("buscar-pop/{id}")]
        [Route("buscar-pop")]
        public IActionResult BuscarPop(int id)
        {
            Pop pop = Pop.BuscarPop(id);

            if (pop != null)
            {
                return Ok(pop);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-num-pop-atividade/{id}")]
        [Route("buscar-num-pop-atividade")]
        public IActionResult BuscarNumPopPorAtividade(int id)
        {
            int numPop = Pop.BuscarNumPopPorAtividade(id);

            if (numPop != 0)
            {
                return Ok(numPop);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-atribuicao/{id}")]
        [Route("buscar-atribuicao")]
        public IActionResult BuscarAtribuicao(int id)
        {
            Atribuicao atribuicao = Atribuicao.BuscarAtribuicao(id);

            if (atribuicao != null)
            {
                return Ok(atribuicao);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-materiais/{id}")]
        [Route("buscar-materiais")]
        public IActionResult BuscarMateriais(int id)
        {
            List<Material> materiais = Material.BuscarMateriais(id);

            if (materiais != null)
            {
                return Ok(materiais);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-descricao-materiais/{id}")]
        [Route("buscar-descricao-materiais")]
        public IActionResult BuscarDescricaoMateriais(int id)
        {
            List<string> materiais = Material.BuscarDescricaoMateriais(id);

            if (materiais != null)
            {
                return Ok(materiais);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-pontos-criticos/{id}")]
        [Route("buscar-pontos-criticos")]
        public IActionResult BuscarPontosCriticos(int id)
        {
            List<PontoCritico> pontos = PontoCritico.BuscarPontosCriticos(id);

            if (pontos != null)
            {
                return Ok(pontos);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-descricao-pontos-criticos/{id}")]
        [Route("buscar-descricao-pontos-criticos")]
        public IActionResult BuscarDescricaoPontosCriticos(int id)
        {
            List<string> pontos = PontoCritico.BuscarDescricaoPontosCriticos(id);

            if (pontos != null)
            {
                return Ok(pontos);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-manuseios/{id}")]
        [Route("buscar-manuseios")]
        public IActionResult BuscarManuseios(int id)
        {
            List<Manuseio> manuseios = Manuseio.BuscarManuseios(id);

            if (manuseios != null)
            {
                return Ok(manuseios);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-descricao-manuseios/{id}")]
        [Route("buscar-descricao-manuseios")]
        public IActionResult BuscarDescricaoManuseios(int id)
        {
            List<string> manuseios = Manuseio.BuscarDescricaoManuseios(id);

            if (manuseios != null)
            {
                return Ok(manuseios);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-resultados/{id}")]
        [Route("buscar-resultados")]
        public IActionResult BuscarResultados(int id)
        {
            List<Resultado> resultados = Resultado.BuscarResultados(id);

            if (resultados != null)
            {
                return Ok(resultados);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-descricao-resultados/{id}")]
        [Route("buscar-descricao-resultados")]
        public IActionResult BuscarDescricaoResultados(int id)
        {
            List<string> resultados = Resultado.BuscarDescricaoResultados(id);

            if (resultados != null)
            {
                return Ok(resultados);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-acoes-corretivas/{id}")]
        [Route("buscar-acoes-corretivas")]
        public IActionResult BuscarAcoesCorretivas(int id)
        {
            List<AcaoCorretiva> acoes = AcaoCorretiva.BuscarAcoesCorretivas(id);

            if (acoes != null)
            {
                return Ok(acoes);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-descricao-acoes-corretivas/{id}")]
        [Route("buscar-descricao-acoes-corretivas")]
        public IActionResult BuscarDescricaoAcoesCorretivas(int id)
        {
            List<string> acoes = AcaoCorretiva.BuscarDescricaoAcoesCorretivas(id);

            if (acoes != null)
            {
                return Ok(acoes);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-habilidades/{id}")]
        [Route("buscar-habilidades")]
        public IActionResult BuscarHabilidades(int id)
        {
            List<Habilidade> habilidades = Habilidade.BuscarHabilidades(id);

            if (habilidades != null)
            {
                return Ok(habilidades);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-descricao-habilidades/{id}")]
        [Route("buscar-descricao-habilidades")]
        public IActionResult BuscarDescricaoHabilidades(int id)
        {
            List<string> habilidades = Habilidade.BuscarDescricaoHabilidades(id);

            if (habilidades != null)
            {
                return Ok(habilidades);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-atividades/{id}")]
        [Route("buscar-atividades")]
        public IActionResult BuscarAtividades(int id)
        {
            List<Atividade> atividades = Atividade.BuscarAtividades(id);

            if (atividades != null)
            {
                return Ok(atividades);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-todas-atividades")]
        [Route("buscar-todas-atividades")]
        public IActionResult BuscarTodasAtividades()
        {
            List<Atividade> atividades = Atividade.BuscarTodasAtividades();

            if (atividades != null)
            {
                return Ok(atividades);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-descricao-atividade/{id}")]
        [Route("buscar-descricao-atividade")]
        public IActionResult BuscarDescricaoAtividade(int id)
        {
            string atividade = Atividade.BuscarDescricaoAtividade(id);

            if (atividade != null)
            {
                return Ok(JsonSerializer.Serialize(atividade));
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-descricao-atividades/{id}")]
        [Route("buscar-descricao-atividades")]
        public IActionResult BuscarDescricaoAtividades(int id)
        {
            List<string> atividades = Atividade.BuscarDescricaoAtividades(id);

            if (atividades != null)
            {
                return Ok(atividades);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-expectativas/{id}")]
        [Route("buscar-expectativas")]
        public IActionResult BuscarExpectativas(int id)
        {
            List<Expectativa> expectativas = Expectativa.BuscarExpectativas(id);

            if (expectativas != null)
            {
                return Ok(expectativas);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-descricao-expectativas/{id}")]
        [Route("buscar-descricao-expectativas")]
        public IActionResult BuscarDescricaoExpectativas(int id)
        {
            List<string> expectativas = Expectativa.BuscarDescricaoExpectativas(id);

            if (expectativas != null)
            {
                return Ok(expectativas);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-atividades-sem-pop/{id}")]
        [Route("buscar-atividades-sem-pop")]
        public IActionResult BuscarAtividadesSemPop(int id)
        {
            List<Atividade> atividades = Atividade.BuscarAtividadesSemPop(id);

            if (atividades != null)
            {
                return Ok(atividades);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("buscar-subordinacoes/{id}")]
        [Route("buscar-subordinacoes")]
        public IActionResult BuscarSubordinacoes(int id)
        {
            List<Subordinacao> subordinacoes = Subordinacao.BuscarSubordinacoes(id);

            if (subordinacoes != null)
            {
                return Ok(subordinacoes);
            }
            else
            {
                return NoContent();
            }
        }

        /*EXCLUIR*/

        [HttpGet("excluir-pop/{id}")]
        [Route("excluir-pop")]
        public IActionResult ExcluirPop(int id)
        {
            return Ok(Pop.ExcluirPop(id));
        }

        [HttpGet("excluir-atribuicao/{id}")]
        [Route("excluir-atribuicao")]
        public IActionResult ExcluirAtribuicao(int id)
        {
            return Ok(Atribuicao.ExcluirAtribuicao(id));
        }

        /*EDITAR*/

        [HttpGet("editar-pop")]
        [Route("editar-pop")]
        public IActionResult EditarPop([FromBody] PopModelEdicao pop)
        {
            string[] listaValores;

            int numero = pop.Numero;
            int departamento = pop.Departamento;
            int numRevisao = pop.NumRevisao;
            int responsavel = pop.Responsavel;
            string atividade = pop.Atividade;

            try
            {
                Pop popNovo = new Pop(numero, departamento, numRevisao, responsavel, atividade);
                Pop popAntigo = Pop.BuscarPop(numero);

                Pop.EditarPop(popAntigo, popNovo);

                listaValores = pop.Materiais.Split(";");
                listaValores = Array.FindAll(listaValores, s => !string.IsNullOrWhiteSpace(s));
                Material.EditarMateriais(numero, listaValores);

                listaValores = pop.PontosCriticos.Split(";");
                listaValores = Array.FindAll(listaValores, s => !string.IsNullOrWhiteSpace(s));
                PontoCritico.EditarPontosCriticos(numero, listaValores);

                listaValores = pop.Manuseios.Split(";");
                listaValores = Array.FindAll(listaValores, s => !string.IsNullOrWhiteSpace(s));
                Manuseio.EditarManuseios(numero, listaValores);

                listaValores = pop.Resultados.Split(";");
                listaValores = Array.FindAll(listaValores, s => !string.IsNullOrWhiteSpace(s));
                Resultado.EditarResultados(numero, listaValores);

                listaValores = pop.AcoesCorretivas.Split(";");
                listaValores = Array.FindAll(listaValores, s => !string.IsNullOrWhiteSpace(s));
                AcaoCorretiva.EditarAcoesCorretivas(numero, listaValores);

                listaValores = pop.Habilidades.Split(";");
                listaValores = Array.FindAll(listaValores, s => !string.IsNullOrWhiteSpace(s));
                Habilidade.EditarHabilidades(numero, listaValores);

                return Ok(true);
            }
            catch
            {
                return Ok(false);
            }
            
        }

        [Route("editar-atribuicao")]
        [HttpPost]
        public IActionResult Editar([FromBody] AtribuicaoCompletaModel atribuicao)
        {
            string[] listaValores;
            int numero = atribuicao.Numero;
            int departamento = atribuicao.Departamento;
            int unidade = atribuicao.Unidade;
            string cargo = atribuicao.Cargo;
            string jornada = atribuicao.Jornada;
            string horario = atribuicao.Horario;

            try
            {
                Atribuicao atribNova = new Atribuicao(numero, departamento, cargo, unidade, jornada, horario);
                Atribuicao atribAntiga = Atribuicao.BuscarAtribuicao(numero);

                Atribuicao.EditarAtribuicao(atribAntiga, atribNova);

                /*listaValores = atribuicao.Superiores.Split(";");
                InserirSubordinacoes(listaValores, numero);*/

                listaValores = atribuicao.Atividades.Split(";");
                listaValores = Array.FindAll(listaValores, s => !string.IsNullOrWhiteSpace(s));
                Atividade.EditarAtividades(numero, listaValores);

                listaValores = atribuicao.Expectativas.Split(";");
                listaValores = Array.FindAll(listaValores, s => !string.IsNullOrWhiteSpace(s));
                Expectativa.EditarExpectativas(numero, listaValores);

                return Ok(true);
            }
            catch
            {
                return Ok(false);
            }
        }

        /*TESTE*/
        [HttpGet("organograma")]
        [Route("organograma")]
        public IActionResult GerarOrganograma()
        {
            string organograma = Organograma.GerarOrganograma();

            if (organograma != null)
            {
                return Ok(organograma);
            }
            else
            {
                return NoContent();
            }
        }

        /*CORRIGIR (usar IActionResult)*/

        public bool InserirMateriais(string[] valores, int numFK)
        {
            try
            {
                foreach (string m in valores)
                {
                    if (m != "")
                    {
                        int index = Array.IndexOf(valores, m) + 1;
                        Material mat = new Material(0, m, index, numFK);
                        mat.InserirMaterial();
                    }
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool InserirPontosCriticos(string[] valores, int numFK)
        {
            try
            {
                foreach (string p in valores)
                {
                    if (p != "")
                    {
                        int index = Array.IndexOf(valores, p) + 1;
                        PontoCritico pt = new PontoCritico(0, p, index, numFK);
                        pt.InserirPontoCritico();
                    }
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool InserirManuseios(string[] valores, int numFK)
        {
            try
            {
                foreach (string m in valores)
                {
                    if (m != "")
                    {
                        int index = Array.IndexOf(valores, m) + 1;
                        Manuseio man = new Manuseio(0, m, index, numFK);
                        man.InserirManuseio();
                    }
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool InserirResultados(string[] valores, int numFK)
        {
            try
            {
                foreach (string r in valores)
                {
                    if (r != "")
                    {
                        int index = Array.IndexOf(valores, r) + 1;
                        Resultado res = new Resultado(0, r, index, numFK);
                        res.InserirResultado();
                    }
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool InserirAcoesCorretivas(string[] valores, int numFK)
        {
            try
            {
                foreach (string a in valores)
                {
                    if (a != "")
                    {
                        int index = Array.IndexOf(valores, a) + 1;
                        AcaoCorretiva ac = new AcaoCorretiva(0, a, index, numFK);
                        ac.InserirAcaoCorretiva();
                    }
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool InserirHabilidades(string[] valores, int numFK)
        {
            try
            {
                foreach (string h in valores)
                {
                    if (h != "")
                    {
                        int index = Array.IndexOf(valores, h) + 1;
                        Habilidade hab = new Habilidade(0, h, index, numFK);
                        hab.InserirHabilidade();
                    }
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool InserirAtividades(string[] valores, int numFK)
        {
            try
            {
                foreach (string a in valores)
                {
                    if (a != "")
                    {
                        int index = Array.IndexOf(valores, a) + 1;
                        Atividade atv = new Atividade(0, a, index, numFK);
                        atv.InserirAtividade();
                    }
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool InserirSubordinacoes(string[] valores, int numFk)
        {
            try
            {
                foreach (string s in valores)
                {
                    if (s != "")
                    {
                        int idSuperior = int.Parse(s);
                        Subordinacao sub = new Subordinacao(0, numFk, idSuperior);
                        sub.InserirSubordinacao();
                    }
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool InserirExpectativas(string[] valores, int numFK)
        {
            try
            {
                foreach (string e in valores)
                {
                    if (e != "")
                    {
                        int index = Array.IndexOf(valores, e) + 1;
                        Expectativa exp = new Expectativa(0, e, index, numFK);
                        exp.InserirExpectativa();
                    }
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpGet("buscar-cargo-responsavel/{id}")]
        [Route("buscar-cargo-responsavel")]
        public string CargoResponsavelPop(int id)
        {
            string cargo = Atribuicao.BuscarResponsavelPop(id);

            return JsonSerializer.Serialize(cargo);
        }

        [HttpGet("excluir-material/{id}")]
        [Route("excluir-material")]
        public bool ExcluirMaterial(int id)
        {
            return Material.ExcluirMaterial(id);
        }

        [HttpGet("excluir-ponto-critico/{id}")]
        [Route("excluir-ponto-critico")]
        public bool ExcluirPontoCritico(int id)
        {
            return PontoCritico.ExcluirPontoCritico(id);
        }

        [HttpGet("excluir-manuseio/{id}")]
        [Route("excluir-manuseio")]
        public bool ExcluirManuseio(int id)
        {
            return Manuseio.ExcluirManuseio(id);
        }

        [HttpGet("excluir-resultado/{id}")]
        [Route("excluir-resultado")]
        public bool ExcluirResultado(int id)
        {
            return Resultado.ExcluirResultado(id);
        }

        [HttpGet("excluir-acao-corretiva/{id}")]
        [Route("excluir-acao-corretiva")]
        public bool ExcluirAcaoCorretiva(int id)
        {
            return AcaoCorretiva.ExcluirAcaoCorretiva(id);
        }

        [HttpGet("excluir-habilidade/{id}")]
        [Route("excluir-habilidade")]
        public bool ExcluirHabilidade(int id)
        {
            return Habilidade.ExcluirHablidade(id);
        }

        [HttpGet("excluir-atividade/{id}")]
        [Route("excluir-atividade")]
        public bool ExcluirAtividade(int id)
        {
            return Atividade.ExcluirAtividade(id);
        }

        [HttpGet("excluir-expectativa/{id}")]
        [Route("excluir-expectativa")]
        public bool ExcluirExpectativa(int id)
        {
            return Expectativa.ExcluirExpectativa(id);
        }

        [HttpGet]
        [Route("listar-cargos")]
        public string ListarCargos()
        {
            List<string> cargos = Atribuicao.BuscarCargos();
            List<string> cargosJson = new List<string>();

            if (cargos != null)
            {
                foreach (string cargo in cargos)
                {
                    cargosJson.Add(JsonSerializer.Serialize(cargo));
                }
            }
            else
            {
                cargosJson = null;
            }

            return JsonSerializer.Serialize(cargosJson);
        }

        [Route("inserir-usuario")]
        [HttpPost]
        public bool InserirUsuario([FromBody] NovoUsuarioModel usuario)
        {
            string nome = usuario.Nome;
            string nomeUsuario = usuario.NomeUsuario;
            string senha = usuario.Senha;
            bool admin = usuario.Admin;

            Usuario u = new Usuario(nomeUsuario, senha, nome, admin);
            
            return u.InserirUsuario();
        }
    }
}
