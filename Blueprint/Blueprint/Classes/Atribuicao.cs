using System.ComponentModel;
using System.Globalization;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class Atribuicao
    {
        private int numero, departamento, unidade;
        private string cargo, jornada, horario;
        private List<string> atividades, expectativas;

        public int Numero { get { return numero; } set { numero = value; } }
        public int Departamento { get { return departamento; } set { departamento = value; } }
        public int Unidade { get { return unidade; } set { unidade = value; } }
        public string Cargo { get { return cargo; } set { cargo = value; } }
        public string Jornada { get { return jornada; } set { jornada = value; } }
        public string Horario { get { return horario; } set { horario = value; } }
        public List<string> Atividades { get { return atividades; } set { atividades = value; } }
        public List<string> Expectativas { get { return expectativas; } set { expectativas = value; } }

        public Atribuicao(int numero, string cargo)
        {
            Numero = numero;
            Cargo = cargo;
        }

        public Atribuicao(int numero, int departamento, string cargo)
        {
            Numero = numero;
            Departamento = departamento;
            Cargo = cargo;
        }

        public Atribuicao(int numero, int departamento, string cargo, int unidade, string jornada, string horario)
        {
            Numero = numero;
            Departamento = departamento;
            Cargo = cargo;
            Unidade = unidade;
            Jornada = jornada;
            Horario = horario;
        }

        public long AdicionarAtribuicao()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            long numTemp;

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO atribuicao VALUES(@numero, @departamento, @cargo, @unidade, @jornada, @horario)", con);
                query.Parameters.AddWithValue("@numero", Numero);
                query.Parameters.AddWithValue("@departamento", Departamento);
                query.Parameters.AddWithValue("@cargo", Cargo);
                query.Parameters.AddWithValue("@unidade", Unidade);
                query.Parameters.AddWithValue("@jornada", Jornada);
                query.Parameters.AddWithValue("@horario", Horario);

                query.ExecuteNonQuery();

                numTemp = query.LastInsertedId;

                con.Close();
            }
            catch
            {
                numTemp = 0;
            }

            return numTemp;
        }

        public static Atribuicao BuscarAtribuicao(int numero)
        {
            Atribuicao atribuicao = null;
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM atribuicao WHERE numero = @numero", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        atribuicao = new Atribuicao(
                                 (int)leitor["numero"],
                                 (int)leitor["departamento"],
                                 leitor["cargo"].ToString(),
                                 (int)leitor["unidade"],
                                 leitor["jornada"].ToString(),
                                 leitor["horario"].ToString()
                             );
                    }
                }

                else
                {
                    atribuicao = null;
                }
                con.Close();
            }
            catch
            {
                atribuicao = null;
            }

            if (atribuicao != null)
            {
                atribuicao.BuscarExpectativas(atribuicao);
            }
            
            return atribuicao;
        }

        public static string BuscarResponsavelPop(int numero)
        {
            string cargo = null;
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT cargo FROM atribuicao WHERE numero = @numero", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        cargo = leitor["cargo"].ToString();
                    }
                }

                else
                {
                    cargo = null;
                }
                con.Close();
            }
            catch
            {
                cargo = null;
            }

            return cargo;
        }

        public static bool ExcluirAtribuicao(int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                Pop.ExcluirTodosPops(id);
                Atividade.ExcluirTodasAtividade(id);
                Expectativa.ExcluirTodasExpectativas(id);
                Subordinacao.ExcluirTodasSubordinacoes(id);

                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM atribuicao WHERE numero = @numero", con);
                query.Parameters.AddWithValue("@numero", id);

                query.ExecuteNonQuery();

                con.Close();

                return true;
            }
            catch
            {
                return false;
            }
        }

        private void BuscarExpectativas(Atribuicao atribuicao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<string> expectativas = new List<string>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM expectativa WHERE atribuicao = @numero", con);
                query.Parameters.AddWithValue("@numero", atribuicao.Numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        expectativas.Add(leitor["descricao"].ToString());
                    }
                }
                else
                {
                    expectativas.Add("Nenhuma expectativa");
                }

                con.Close();
            }
            catch
            {
                expectativas.Add("Nenhuma expectativa");
            }

            atribuicao.Expectativas = expectativas;
        }

        public static List<Atribuicao> GerarListaAtribuicoes()
        {
            List<Atribuicao> atribuicoes = new List<Atribuicao>();
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT numero, departamento, cargo FROM atribuicao ORDER BY departamento", con);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Atribuicao atribuicao = new Atribuicao(
                                (int)leitor["numero"],
                                (int)leitor["departamento"],
                                leitor["cargo"].ToString()
                            );

                        atribuicoes.Add(atribuicao);
                    }
                }
                else
                {
                    atribuicoes = null;
                }
                con.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                atribuicoes = null;
            }
            return atribuicoes;
        }

        public static List<Atribuicao> ListarAtribuicoesPorDepartamento(int id)
        {
            List<Atribuicao> atribuicoes = new List<Atribuicao>();
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM atribuicao WHERE departamento = @id", con);
                query.Parameters.AddWithValue("@id", id);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Atribuicao atribuicao = new Atribuicao(
                                (int)leitor["numero"],
                                (int)leitor["departamento"],
                                leitor["cargo"].ToString(),
                                (int)leitor["unidade"],
                                leitor["jornada"].ToString(),
                                leitor["horario"].ToString()
                            );

                        atribuicoes.Add(atribuicao);
                    }
                }
                else
                {
                    atribuicoes = null;
                }
                con.Close();
            }
            catch
            {
            }
            return atribuicoes;
        }

        public static bool EditarAtribuicao(Atribuicao atribuicaoAntiga, Atribuicao atribuicaoNova)
        {
            bool resultado = false;
                
            List<Tuple<string, string>> listaString = new List<Tuple<string, string>>();
            List<Tuple<int, string>> listaInt = new List<Tuple<int, string>>();

            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            if (atribuicaoAntiga.Departamento != atribuicaoNova.Departamento)
            {
                listaInt.Add(new Tuple<int, string>(atribuicaoNova.Departamento, "departamento"));
            }

            if (atribuicaoAntiga.Cargo != atribuicaoNova.Cargo)
            {
                listaString.Add(new Tuple<string, string>(atribuicaoNova.Cargo, "cargo"));
            }

            if (atribuicaoAntiga.Unidade != atribuicaoNova.Unidade)
            {
                listaInt.Add(new Tuple<int, string>(atribuicaoNova.Unidade, "unidade"));
            }

            if (atribuicaoAntiga.Jornada != atribuicaoNova.Jornada)
            {
                listaString.Add(new Tuple<string, string>(atribuicaoNova.Jornada, "jornada"));
            }

            if (atribuicaoAntiga.Horario != atribuicaoNova.Horario)
            {
                listaString.Add(new Tuple<string, string>(atribuicaoNova.Horario, "horario"));
            }

            //para cada dado a ser alterado,
            foreach (var item in listaString)
            {
                try
                {
                    //conexão aberta
                    con.Open();

                    //atualiza o campo de acordo com o dado informado
                    MySqlCommand query = new MySqlCommand(string.Format("UPDATE atribuicao SET {0} = @dado WHERE numero = @numero", item.Item2), con);
                    //os parâmetros são obtidos das tuplas da lista
                    query.Parameters.AddWithValue("@dado", item.Item1);
                    query.Parameters.AddWithValue("@numero", atribuicaoAntiga.Numero);
                    //execução do código
                    query.ExecuteNonQuery();
                    //conexão fechada
                    con.Close();

                    //resultado passa a ser verdadeiro
                    resultado = true;
                }
                catch
                {
                    //em caso de erro, o resultado continua a ser falso
                    resultado = false;
                }
            }

            foreach (var item in listaInt)
            {
                try
                {
                    //conexão aberta
                    con.Open();

                    //atualiza o campo de acordo com o dado informado
                    MySqlCommand query = new MySqlCommand(string.Format("UPDATE atribuicao SET {0} = @dado WHERE numero = @numero", item.Item2), con);
                    //os parâmetros são obtidos das tuplas da lista
                    query.Parameters.AddWithValue("@dado", item.Item1);
                    query.Parameters.AddWithValue("@numero", atribuicaoAntiga.Numero);
                    //execução do código
                    query.ExecuteNonQuery();
                    //conexão fechada
                    con.Close();

                    //resultado passa a ser verdadeiro
                    resultado = true;
                }
                catch
                {
                    //em caso de erro, o resultado continua a ser falso
                    resultado = false;
                }
            }
            //retorna o resultado
            return resultado;
        }

        public static List<string> BuscarCargos()
        {
            List<string> cargos = new List<string>();
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT cargo FROM atribuicao", con);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        cargos.Add(leitor["cargo"].ToString());
                    }
                }
                else
                {
                    cargos = null;
                }
                con.Close();
            }
            catch
            {
                cargos = null;
            }
            return cargos;
        }
    }
}
