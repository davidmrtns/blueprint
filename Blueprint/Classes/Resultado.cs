using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class Resultado
    {
        private int numero, numPop, ordem;
        private string descricao;

        public int Numero { get { return numero; } set { numero = value; } }
        public int NumPop { get { return numPop; } set { numPop = value; } }
        public int Ordem { get { return ordem; } set { ordem = value; } }
        public string Descricao { get { return descricao; } set { descricao = value; } }

        public Resultado(int numero, string descricao, int ordem, int numPop)
        {
            Numero = numero;
            Descricao = descricao;
            Ordem = ordem;
            NumPop = numPop;
        }

        public static List<Resultado> BuscarResultados(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<Resultado> resultados = new List<Resultado>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM resultado WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Resultado resultado = new Resultado(
                                (int)leitor["numero"],
                                leitor["descricao"].ToString(),
                                (int)leitor["ordem"],
                                (int)leitor["pop"]
                            );

                        resultados.Add(resultado);
                    }
                }
                else
                {
                    resultados = null;
                }

                con.Close();
            }
            catch
            {
                resultados = null;
            }

            return resultados;
        }

        public static List<string> BuscarDescricaoResultados(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<string> resultados = new List<string>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT descricao FROM resultado WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        resultados.Add(leitor["descricao"].ToString());
                    }
                }
                else
                {
                    resultados = null;
                }

                con.Close();
            }
            catch
            {
                resultados = null;
            }

            return resultados;
        }

        public static bool AtualizarResultado(int index, string novaDescricao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("UPDATE resultado SET descricao = @novo WHERE numero = @numero", con);
                query.Parameters.AddWithValue("@novo", novaDescricao);
                query.Parameters.AddWithValue("@numero", index);

                query.ExecuteNonQuery();

                con.Close();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static void EditarResultados(int pop, string[] resultadosNovos)
        {
            List<Resultado> resultadosAntigos = BuscarResultados(pop);

            if (resultadosNovos.Length <= 0 && resultadosAntigos != null)
            {
                ExcluirTodosResultados(pop);
            }
            else if (resultadosAntigos == null && resultadosNovos.Length > 0)
            {
                foreach (string r in resultadosNovos)
                {
                    if (r != "")
                    {
                        int index = Array.IndexOf(resultadosNovos, r) + 1;
                        Resultado res = new Resultado(0, r, index, pop);
                        res.InserirResultado();
                    }
                }
            }
            else if (resultadosAntigos.Count > resultadosNovos.Length)
            {
                int ordem = 0;
                for (int i = 0; i < resultadosNovos.Length; i++)
                {
                    string descricaoAntiga = resultadosAntigos[i].Descricao;

                    if (descricaoAntiga != resultadosNovos[i] && resultadosNovos[i] != "")
                    {
                        AtualizarResultado(resultadosAntigos[i].Numero, resultadosNovos[i]);
                    }

                    ordem++;
                }

                ExcluirResultadosAposOrdem(pop, ordem);
            }
            else if (resultadosAntigos.Count < resultadosNovos.Length)
            {
                int ordem = 0;

                for (int i = 0; i < resultadosAntigos.Count; i++)
                {
                    string descricaoAntiga = resultadosAntigos[i].Descricao;

                    if (descricaoAntiga != resultadosNovos[i] && resultadosNovos[i] != "")
                    {
                        AtualizarResultado(resultadosAntigos[i].Numero, resultadosNovos[i]);
                    }
                    ordem++;
                }

                int tamanho = resultadosNovos.Length - ordem;
                string[] novoResultadosNovos = new string[tamanho];

                Array.Copy(resultadosNovos, ordem, novoResultadosNovos, 0, tamanho);
                ordem++;

                foreach (string r in novoResultadosNovos)
                {
                    if (r != "")
                    {
                        Resultado res = new Resultado(0, r, ordem, pop);
                        res.InserirResultado();
                        ordem++;
                    }
                }
            }
            else if (resultadosAntigos.Count == resultadosNovos.Length)
            {
                for (int i = 0; i < resultadosNovos.Length; i++)
                {
                    string descricaoAntiga = resultadosAntigos[i].Descricao;

                    if (descricaoAntiga != resultadosNovos[i] && resultadosNovos[i] != "")
                    {
                        AtualizarResultado(resultadosAntigos[i].Numero, resultadosNovos[i]);
                    }
                }
            }
        }

        public static bool ExcluirResultado(int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM resultado WHERE numero = @numero", con);
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

        public static bool ExcluirResultadosAposOrdem(int pop, int ordem)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM resultado WHERE pop = @pop AND ordem > @ordem", con);
                query.Parameters.AddWithValue("@pop", pop);
                query.Parameters.AddWithValue("@ordem", ordem);

                query.ExecuteNonQuery();

                con.Close();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool InserirResultado()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO resultado VALUES(@numero, @descricao, @ordem, @pop)", con);
                query.Parameters.AddWithValue("@numero", Numero);
                query.Parameters.AddWithValue("@descricao", Descricao);
                query.Parameters.AddWithValue("@ordem", Ordem);
                query.Parameters.AddWithValue("@pop", NumPop);

                query.ExecuteNonQuery();

                con.Close();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static void ExcluirTodosResultados(int numPop)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM resultado WHERE pop = @numero", con);
                query.Parameters.AddWithValue("@numero", numPop);

                query.ExecuteNonQuery();

                con.Close();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
