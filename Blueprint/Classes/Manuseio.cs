using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class Manuseio
    {
        private int numero, numPop, ordem;
        private string descricao;

        public int Numero { get { return numero; } set { numero = value; } }
        public int NumPop { get { return numPop; } set { numPop = value; } }
        public int Ordem { get { return ordem; } set { ordem = value; } }
        public string Descricao { get { return descricao; } set { descricao = value; } }

        public Manuseio(int numero, string descricao, int ordem, int numPop)
        {
            Numero = numero;
            Descricao = descricao;
            Ordem = ordem;
            NumPop = numPop;
        }

        public static List<Manuseio> BuscarManuseios(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<Manuseio> manuseios = new List<Manuseio>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM manuseio WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Manuseio manuseio = new Manuseio(
                                (int)leitor["numero"],
                                leitor["descricao"].ToString(),
                                (int)leitor["ordem"],
                                (int)leitor["pop"]
                            );

                        manuseios.Add(manuseio);
                    }
                }
                else
                {
                    manuseios = null;
                }

                con.Close();
            }
            catch
            {
                manuseios = null;
            }

            return manuseios;
        }

        public static List<string> BuscarDescricaoManuseios(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<string> manuseios = new List<string>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT descricao FROM manuseio WHERE pop = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        manuseios.Add(leitor["descricao"].ToString());
                    }
                }
                else
                {
                    manuseios = null;
                }

                con.Close();
            }
            catch
            {
                manuseios = null;
            }

            return manuseios;
        }

        public static bool AtualizarManuseio(int index, string novaDescricao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("UPDATE manuseio SET descricao = @novo WHERE numero = @numero", con);
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

        public static void EditarManuseios(int pop, string[] manuseiosNovos)
        {
            List<Manuseio> manuseiosAntigos = BuscarManuseios(pop);

            if (manuseiosNovos.Length <= 0 && manuseiosAntigos != null)
            {
                ExcluirTodosManuseios(pop);
            }
            else if (manuseiosAntigos == null && manuseiosNovos.Length > 0)
            {
                foreach (string m in manuseiosNovos)
                {
                    if (m != "")
                    {
                        int index = Array.IndexOf(manuseiosNovos, m) + 1;
                        Manuseio mat = new Manuseio(0, m, index, pop);
                        mat.InserirManuseio();
                    }
                }
            }
            else if (manuseiosAntigos.Count > manuseiosNovos.Length)
            {
                int ordem = 0;
                for (int i = 0; i < manuseiosNovos.Length; i++)
                {
                    string descricaoAntiga = manuseiosAntigos[i].Descricao;

                    if (descricaoAntiga != manuseiosNovos[i] && manuseiosNovos[i] != "")
                    {
                        AtualizarManuseio(manuseiosAntigos[i].Numero, manuseiosNovos[i]);
                    }

                    ordem++;
                }

                ExcluirManuseiosAposOrdem(pop, ordem);
            }
            else if (manuseiosAntigos.Count < manuseiosNovos.Length)
            {
                int ordem = 0;

                for (int i = 0; i < manuseiosAntigos.Count; i++)
                {
                    string descricaoAntiga = manuseiosAntigos[i].Descricao;

                    if (descricaoAntiga != manuseiosNovos[i] && manuseiosNovos[i] != "")
                    {
                        AtualizarManuseio(manuseiosAntigos[i].Numero, manuseiosNovos[i]);
                    }
                    ordem++;
                }

                int tamanho = manuseiosNovos.Length - ordem;
                string[] novoManuseiosNovos = new string[tamanho];

                Array.Copy(manuseiosNovos, ordem, novoManuseiosNovos, 0, tamanho);
                ordem++;

                foreach (string m in novoManuseiosNovos)
                {
                    if (m != "")
                    {
                        Manuseio man = new Manuseio(0, m, ordem, pop);
                        man.InserirManuseio();
                        ordem++;
                    }
                }
            }
            else if (manuseiosAntigos.Count == manuseiosNovos.Length)
            {
                for (int i = 0; i < manuseiosNovos.Length; i++)
                {
                    string descricaoAntiga = manuseiosAntigos[i].Descricao;

                    if (descricaoAntiga != manuseiosNovos[i] && manuseiosNovos[i] != "")
                    {
                        AtualizarManuseio(manuseiosAntigos[i].Numero, manuseiosNovos[i]);
                    }
                }
            }
        }

        public static bool ExcluirManuseio(int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM manuseio WHERE numero = @numero", con);
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

        public static bool ExcluirManuseiosAposOrdem(int pop, int ordem)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM manuseio WHERE pop = @pop AND ordem > @ordem", con);
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

        public bool InserirManuseio()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO manuseio VALUES(@numero, @descricao, @ordem, @pop)", con);
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

        public static void ExcluirTodosManuseios(int numPop)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM manuseio WHERE pop = @numero", con);
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
