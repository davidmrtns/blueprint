using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class AcaoCorretiva
    {
        private int numero, numPop, ordem;
        private string descricao;

        public int Numero { get { return numero; } set { numero = value; } }
        public int NumPop { get { return numPop; } set { numPop = value; } }
        public int Ordem { get { return ordem; } set { ordem = value; } }
        public string Descricao { get { return descricao; } set { descricao = value; } }

        public AcaoCorretiva(int numero, string descricao, int odem, int numPop)
        {
            Numero = numero;
            Descricao = descricao;
            Ordem = odem;
            NumPop = numPop;
        }

        public static List<AcaoCorretiva> BuscarAcoesCorretivas(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);
            List<AcaoCorretiva> acoes = new List<AcaoCorretiva>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM acaocorretiva WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        AcaoCorretiva acao = new AcaoCorretiva(
                                (int)leitor["numero"],
                                leitor["descricao"].ToString(),
                                (int)leitor["ordem"],
                                (int)leitor["pop"]
                            );

                        acoes.Add(acao);
                    }
                }
                else
                {
                    acoes = null;
                }

                con.Close();
            }
            catch
            {
                acoes = null;
            }

            return acoes;
        }

        public static List<string> BuscarDescricaoAcoesCorretivas(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);
            List<string> acoesCorretivas = new List<string>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT descricao FROM acaocorretiva WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        acoesCorretivas.Add(leitor["descricao"].ToString());
                    }
                }
                else
                {
                    acoesCorretivas = null;
                }

                con.Close();
            }
            catch
            {
                acoesCorretivas = null;
            }

            return acoesCorretivas;
        }

        public static bool EditarAcoesCorretivas(List<string> antigo, string[] novo, int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);
            bool iguais = true;

            if (novo.Length != antigo.Count)
            {
                iguais = false;
            }
            else
            {
                for (int i = 0; i < novo.Length; i++)
                {
                    if (novo[i] != antigo[i])
                    {
                        iguais = false;
                        break;
                    }
                }
            }

            if (!iguais)
            {
                ExcluirTodasAcoesCorretivas(id);
                try
                {
                    foreach (string a in novo)
                    {
                        if (a != "")
                        {
                            AcaoCorretiva ac = new AcaoCorretiva(0, a, 0, id);
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
            else
            {
                return true;
            }
        }

        public static bool AtualizarAcaoCorretiva(int index, string novaDescricao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("UPDATE acaocorretiva SET descricao = @novo WHERE numero = @numero", con);
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

        public static void EditarAcoesCorretivas(int pop, string[] acoesCorretivasNovas)
        {
            List<AcaoCorretiva> acoesCorretivasAntigas = BuscarAcoesCorretivas(pop);

            if (acoesCorretivasNovas.Length <= 0 && acoesCorretivasAntigas != null)
            {
                ExcluirTodasAcoesCorretivas(pop);
            }
            else if (acoesCorretivasAntigas == null && acoesCorretivasNovas.Length > 0)
            {
                foreach (string a in acoesCorretivasNovas)
                {
                    if (a != "")
                    {
                        int index = Array.IndexOf(acoesCorretivasNovas, a) + 1;
                        AcaoCorretiva ac = new AcaoCorretiva(0, a, index, pop);
                        ac.InserirAcaoCorretiva();
                    }
                }
            }
            else if (acoesCorretivasAntigas.Count > acoesCorretivasNovas.Length)
            {
                int ordem = 0;
                for (int i = 0; i < acoesCorretivasNovas.Length; i++)
                {
                    string descricaoAntiga = acoesCorretivasAntigas[i].Descricao;

                    if (descricaoAntiga != acoesCorretivasNovas[i] && acoesCorretivasNovas[i] != "")
                    {
                        AtualizarAcaoCorretiva(acoesCorretivasAntigas[i].Numero, acoesCorretivasNovas[i]);
                    }

                    ordem++;
                }

                ExcluirAcoesCorretivasAposOrdem(pop, ordem);
            }
            else if (acoesCorretivasAntigas.Count < acoesCorretivasNovas.Length)
            {
                int ordem = 0;

                for (int i = 0; i < acoesCorretivasAntigas.Count; i++)
                {
                    string descricaoAntiga = acoesCorretivasAntigas[i].Descricao;

                    if (descricaoAntiga != acoesCorretivasNovas[i] && acoesCorretivasNovas[i] != "")
                    {
                        AtualizarAcaoCorretiva(acoesCorretivasAntigas[i].Numero, acoesCorretivasNovas[i]);
                    }
                    ordem++;
                }

                int tamanho = acoesCorretivasNovas.Length - ordem;
                string[] novoMateriaisNovos = new string[tamanho];

                Array.Copy(acoesCorretivasNovas, ordem, novoMateriaisNovos, 0, tamanho);
                ordem++;

                foreach (string a in novoMateriaisNovos)
                {
                    if (a != "")
                    {
                        AcaoCorretiva ac = new AcaoCorretiva(0, a, ordem, pop);
                        ac.InserirAcaoCorretiva();
                        ordem++;
                    }
                }
            }
            else if (acoesCorretivasAntigas.Count == acoesCorretivasNovas.Length)
            {
                for (int i = 0; i < acoesCorretivasNovas.Length; i++)
                {
                    string descricaoAntiga = acoesCorretivasAntigas[i].Descricao;

                    if (descricaoAntiga != acoesCorretivasNovas[i] && acoesCorretivasNovas[i] != "")
                    {
                        AtualizarAcaoCorretiva(acoesCorretivasAntigas[i].Numero, acoesCorretivasNovas[i]);
                    }
                }
            }
        }

        public static bool ExcluirAcaoCorretiva(int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM acaocorretiva WHERE numero = @numero", con);
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

        public static bool ExcluirAcoesCorretivasAposOrdem(int pop, int ordem)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM acaocorretiva WHERE pop = @pop AND ordem > @ordem", con);
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

        public bool InserirAcaoCorretiva()
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO acaocorretiva VALUES(@numero, @descricao, @ordem, @pop)", con);
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

        public static void ExcluirTodasAcoesCorretivas(int numPop)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM acaocorretiva WHERE pop = @numero", con);
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
