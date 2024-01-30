using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class PontoCritico
    {
        private int numero, numPop, ordem;
        private string descricao;

        public int Numero { get { return numero; } set { numero = value; } }
        public int NumPop { get { return numPop; } set { numPop = value; } }
        public int Ordem { get { return ordem; } set { ordem = value; } }
        public string Descricao { get { return descricao; } set { descricao = value; } }

        public PontoCritico(int numero, string descricao, int ordem, int numPop)
        {
            Numero = numero;
            Descricao = descricao;
            Ordem = ordem;
            NumPop = numPop;
        }

        public static List<PontoCritico> BuscarPontosCriticos(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<PontoCritico> pontos = new List<PontoCritico>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM pontocritico WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        PontoCritico ponto = new PontoCritico(
                                (int)leitor["numero"],
                                leitor["descricao"].ToString(),
                                (int)leitor["ordem"],
                                (int)leitor["pop"]
                            );

                        pontos.Add(ponto);
                    }
                }
                else
                {
                    pontos = null;
                }

                con.Close();
            }
            catch
            {
                pontos = null;
            }

            return pontos;
        }

        public static List<string> BuscarDescricaoPontosCriticos(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<string> pontosCriticos = new List<string>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT descricao FROM pontocritico WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        pontosCriticos.Add(leitor["descricao"].ToString());
                    }
                }
                else
                {
                    pontosCriticos = null;
                }

                con.Close();
            }
            catch
            {
                pontosCriticos = null;
            }

            return pontosCriticos;
        }

        public static bool AtualizarPontoCritico(int index, string novaDescricao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("UPDATE pontocritico SET descricao = @novo WHERE numero = @numero", con);
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

        public static void EditarPontosCriticos(int pop, string[] pontosCriticosNovos)
        {
            List<PontoCritico> pontosCriticosAntigos = BuscarPontosCriticos(pop);

            if (pontosCriticosNovos.Length <= 0 && pontosCriticosAntigos != null)
            {
                ExcluirTodosPontosCriticos(pop);
            }
            else if (pontosCriticosAntigos == null && pontosCriticosNovos.Length > 0)
            {
                foreach (string p in pontosCriticosNovos)
                {
                    if (p != "")
                    {
                        int index = Array.IndexOf(pontosCriticosNovos, p) + 1;
                        PontoCritico pt = new PontoCritico(0, p, index, pop);
                        pt.InserirPontoCritico();
                    }
                }
            }
            else if (pontosCriticosAntigos.Count > pontosCriticosNovos.Length)
            {
                int ordem = 0;
                for (int i = 0; i < pontosCriticosNovos.Length; i++)
                {
                    string descricaoAntiga = pontosCriticosAntigos[i].Descricao;

                    if (descricaoAntiga != pontosCriticosNovos[i] && pontosCriticosNovos[i] != "")
                    {
                        AtualizarPontoCritico(pontosCriticosAntigos[i].Numero, pontosCriticosNovos[i]);
                    }

                    ordem++;
                }

                ExcluirPontosCriticosAposOrdem(pop, ordem);
            }
            else if (pontosCriticosAntigos.Count < pontosCriticosNovos.Length)
            {
                int ordem = 0;

                for (int i = 0; i < pontosCriticosAntigos.Count; i++)
                {
                    string descricaoAntiga = pontosCriticosAntigos[i].Descricao;

                    if (descricaoAntiga != pontosCriticosNovos[i] && pontosCriticosNovos[i] != "")
                    {
                        AtualizarPontoCritico(pontosCriticosAntigos[i].Numero, pontosCriticosNovos[i]);
                    }
                    ordem++;
                }

                int tamanho = pontosCriticosNovos.Length - ordem;
                string[] novoPontosCriticosNovos = new string[tamanho];

                Array.Copy(pontosCriticosNovos, ordem, novoPontosCriticosNovos, 0, tamanho);
                ordem++;

                foreach (string p in novoPontosCriticosNovos)
                {
                    if (p != "")
                    {
                        PontoCritico pt = new PontoCritico(0, p, ordem, pop);
                        pt.InserirPontoCritico();
                        ordem++;
                    }
                }
            }
            else if (pontosCriticosAntigos.Count == pontosCriticosNovos.Length)
            {
                for (int i = 0; i < pontosCriticosNovos.Length; i++)
                {
                    string descricaoAntiga = pontosCriticosAntigos[i].Descricao;

                    if (descricaoAntiga != pontosCriticosNovos[i] && pontosCriticosNovos[i] != "")
                    {
                        AtualizarPontoCritico(pontosCriticosAntigos[i].Numero, pontosCriticosNovos[i]);
                    }
                }
            }
        }

        public static bool ExcluirPontoCritico(int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM pontocritico WHERE numero = @numero", con);
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

        public static bool ExcluirPontosCriticosAposOrdem(int pop, int ordem)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM pontocritico WHERE pop = @pop AND ordem > @ordem", con);
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

        public bool InserirPontoCritico()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO pontocritico VALUES(@numero, @descricao, @ordem, @pop)", con);
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

        public static void ExcluirTodosPontosCriticos(int numPop)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM pontocritico WHERE pop = @numero", con);
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
