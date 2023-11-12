using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class Material
    {
        private int numero, numPop, ordem;
        private string descricao;

        public int Numero { get { return numero; } set { numero = value; } }
        public int NumPop { get { return numPop; } set { numPop = value; } }
        public int Ordem { get { return ordem; } set { ordem = value; } }
        public string Descricao { get { return descricao; } set { descricao = value; } }

        public Material(int numero, string descricao, int ordem, int numPop)
        {
            Numero = numero;
            Descricao = descricao;
            Ordem = ordem;
            NumPop = numPop;
        }

        public static List<Material> BuscarMateriais(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);
            List<Material> materiais = new List<Material>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM material WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Material material = new Material(
                                (int)leitor["numero"],
                                leitor["descricao"].ToString(),
                                (int)leitor["ordem"],
                                (int)leitor["pop"]
                            );

                        materiais.Add(material);
                    }
                }
                else
                {
                    materiais = null;
                }

                con.Close();
            }
            catch
            {
                materiais = null;
            }

            return materiais;
        }

        public static List<string> BuscarDescricaoMateriais(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);
            List<string> materiais = new List<string>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT descricao FROM material WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        materiais.Add(leitor["descricao"].ToString());
                    }
                }
                else
                {
                    materiais = null;
                }

                con.Close();
            }
            catch
            {
                materiais = null;
            }

            return materiais;
        }

        public static bool AtualizarMaterial(int index, string novaDescricao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("UPDATE material SET descricao = @novo WHERE numero = @numero", con);
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

        public static void EditarMateriais(int pop, string[] materiaisNovos)
        {
            List<Material> materiaisAntigos = BuscarMateriais(pop);

            if (materiaisNovos.Length <= 0 && materiaisAntigos != null)
            {
                ExcluirTodosMateriais(pop);
            }
            else if (materiaisAntigos == null && materiaisNovos.Length > 0)
            {
                foreach (string m in materiaisNovos)
                {
                    if (m != "")
                    {
                        int index = Array.IndexOf(materiaisNovos, m) + 1;
                        Material mat = new Material(0, m, index, pop);
                        mat.InserirMaterial();
                    }
                }
            }
            else if (materiaisAntigos.Count > materiaisNovos.Length)
            {
                int ordem = 0;
                for (int i = 0; i < materiaisNovos.Length; i++)
                {
                    string descricaoAntiga = materiaisAntigos[i].Descricao;

                    if (descricaoAntiga != materiaisNovos[i] && materiaisNovos[i] != "")
                    {
                        AtualizarMaterial(materiaisAntigos[i].Numero, materiaisNovos[i]);
                    }

                    ordem++;
                }

                ExcluirMateriaisAposOrdem(pop, ordem);
            }
            else if (materiaisAntigos.Count < materiaisNovos.Length)
            {
                int ordem = 0;

                for (int i = 0; i < materiaisAntigos.Count; i++)
                {
                    string descricaoAntiga = materiaisAntigos[i].Descricao;

                    if (descricaoAntiga != materiaisNovos[i] && materiaisNovos[i] != "")
                    {
                        AtualizarMaterial(materiaisAntigos[i].Numero, materiaisNovos[i]);
                    }
                    ordem++;
                }

                int tamanho = materiaisNovos.Length - ordem;
                string[] novoMateriaisNovos = new string[tamanho];

                Array.Copy(materiaisNovos, ordem, novoMateriaisNovos, 0, tamanho);
                ordem++;

                foreach (string m in novoMateriaisNovos)
                {
                    if (m != "")
                    {
                        Material mat = new Material(0, m, ordem, pop);
                        mat.InserirMaterial();
                        ordem++;
                    }
                }
            }
            else if (materiaisAntigos.Count == materiaisNovos.Length)
            {
                for (int i = 0; i < materiaisNovos.Length; i++)
                {
                    string descricaoAntiga = materiaisAntigos[i].Descricao;

                    if (descricaoAntiga != materiaisNovos[i] && materiaisNovos[i] != "")
                    {
                        AtualizarMaterial(materiaisAntigos[i].Numero, materiaisNovos[i]);
                    }
                }
            }
        }

        public static bool ExcluirMaterial(int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM material WHERE numero = @numero", con);
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

        public static bool ExcluirMateriaisAposOrdem(int pop, int ordem)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM material WHERE pop = @pop AND ordem > @ordem", con);
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

        public bool InserirMaterial()
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO material VALUES(@numero, @descricao, @ordem, @pop)", con);
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

        public static void ExcluirTodosMateriais(int numPop)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM material WHERE pop = @numero", con);
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
