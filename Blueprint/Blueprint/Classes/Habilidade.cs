using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class Habilidade
    {
        private int numero, numPop, ordem;
        private string descricao;

        public int Numero { get { return numero; } set { numero = value; } }
        public int NumPop { get { return numPop; } set { numPop = value; } }
        public int Ordem { get { return ordem; } set { ordem = value; } }
        public string Descricao { get { return descricao; } set { descricao = value; } }

        public Habilidade(int numero, string descricao, int ordem, int numPop)
        {
            Numero = numero;
            Descricao = descricao;
            Ordem = ordem;
            NumPop = numPop;
        }

        public static List<Habilidade> BuscarHabilidades(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);
            List<Habilidade> habilidades = new List<Habilidade>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM habilidade WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Habilidade habilidade = new Habilidade(
                                (int)leitor["numero"],
                                leitor["descricao"].ToString(),
                                (int)leitor["ordem"],
                                (int)leitor["pop"]
                            );

                        habilidades.Add(habilidade);
                    }
                }
                else
                {
                    habilidades = null;
                }

                con.Close();
            }
            catch
            {
                habilidades = null;
            }

            return habilidades;
        }

        public static List<string> BuscarDescricaoHabilidades(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);
            List<string> habilidades = new List<string>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT descricao FROM habilidade WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        habilidades.Add(leitor["descricao"].ToString());
                    }
                }
                else
                {
                    habilidades = null;
                }

                con.Close();
            }
            catch
            {
                habilidades = null;
            }

            return habilidades;
        }

        public static bool AtualizarHabilidade(int index, string novaDescricao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("UPDATE habilidade SET descricao = @novo WHERE numero = @numero", con);
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

        public static void EditarHabilidades(int pop, string[] habilidadesNovas)
        {
            List<Habilidade> habilidadesAntigas = BuscarHabilidades(pop);

            if (habilidadesNovas.Length <= 0 && habilidadesAntigas != null)
            {
                ExcluirTodasHabilidades(pop);
            }
            else if (habilidadesAntigas == null && habilidadesNovas.Length > 0)
            {
                foreach (string h in habilidadesNovas)
                {
                    if (h != "")
                    {
                        int index = Array.IndexOf(habilidadesNovas, h) + 1;
                        Habilidade hab = new Habilidade(0, h, index, pop);
                        hab.InserirHabilidade();
                    }
                }
            }
            else if (habilidadesAntigas.Count > habilidadesNovas.Length)
            {
                int ordem = 0;
                for (int i = 0; i < habilidadesNovas.Length; i++)
                {
                    string descricaoAntiga = habilidadesAntigas[i].Descricao;

                    if (descricaoAntiga != habilidadesNovas[i] && habilidadesNovas[i] != "")
                    {
                        AtualizarHabilidade(habilidadesAntigas[i].Numero, habilidadesNovas[i]);
                    }

                    ordem++;
                }

                ExcluirHabilidadesAposOrdem(pop, ordem);
            }
            else if (habilidadesAntigas.Count < habilidadesNovas.Length)
            {
                int ordem = 0;

                for (int i = 0; i < habilidadesAntigas.Count; i++)
                {
                    string descricaoAntiga = habilidadesAntigas[i].Descricao;

                    if (descricaoAntiga != habilidadesNovas[i] && habilidadesNovas[i] != "")
                    {
                        AtualizarHabilidade(habilidadesAntigas[i].Numero, habilidadesNovas[i]);
                    }
                    ordem++;
                }

                int tamanho = habilidadesNovas.Length - ordem;
                string[] novoHabilidadesNovas = new string[tamanho];

                Array.Copy(habilidadesNovas, ordem, novoHabilidadesNovas, 0, tamanho);
                ordem++;

                foreach (string h in novoHabilidadesNovas)
                {
                    if (h != "")
                    {
                        Habilidade hab = new Habilidade(0, h, ordem, pop);
                        hab.InserirHabilidade();
                        ordem++;
                    }
                }
            }
            else if (habilidadesAntigas.Count == habilidadesNovas.Length)
            {
                for (int i = 0; i < habilidadesNovas.Length; i++)
                {
                    string descricaoAntiga = habilidadesAntigas[i].Descricao;

                    if (descricaoAntiga != habilidadesNovas[i] && habilidadesNovas[i] != "")
                    {
                        AtualizarHabilidade(habilidadesAntigas[i].Numero, habilidadesNovas[i]);
                    }
                }
            }
        }

        public static bool ExcluirHablidade(int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM habilidade WHERE numero = @numero", con);
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

        public static bool ExcluirHabilidadesAposOrdem(int pop, int ordem)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM habilidade WHERE pop = @pop AND ordem > @ordem", con);
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

        public bool InserirHabilidade()
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO habilidade VALUES(@numero, @descricao, @ordem, @pop)", con);
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

        public static void ExcluirTodasHabilidades(int numPop)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM habilidade WHERE pop = @numero", con);
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
