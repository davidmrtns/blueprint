using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class Expectativa
    {
        private int numero, numAtribuicao, ordem;
        private string descricao;
        public int Numero { get { return numero; } set { numero = value; } }
        public int NumAtribuicao { get { return numAtribuicao; } set { numAtribuicao = value; } }
        public int Ordem { get { return ordem; } set { ordem = value; } }
        public string Descricao { get { return descricao; } set { descricao = value; } }

        public Expectativa(int numero, string descricao, int ordem, int numAtribuicao)
        {
            Numero = numero;
            Descricao = descricao;
            Ordem = ordem;
            NumAtribuicao = numAtribuicao;
        }

        public static List<Expectativa> BuscarExpectativas(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<Expectativa> expectativas = new List<Expectativa>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM expectativa WHERE atribuicao = @numero", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Expectativa expectativa = new Expectativa(
                                (int)leitor["numero"],
                                leitor["descricao"].ToString(),
                                (int)leitor["ordem"],
                                (int)leitor["atribuicao"]
                            );

                        expectativas.Add(expectativa);
                    }
                }
                else
                {
                    expectativas = null;
                }

                con.Close();
            }
            catch
            {
                expectativas = null;
            }

            return expectativas;
        }

        public static List<string> BuscarDescricaoExpectativas(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<string> expectativas = new List<string>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT descricao FROM expectativa WHERE atribuicao = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

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
                    expectativas = null;
                }

                con.Close();
            }
            catch
            {
                expectativas = null;
            }

            return expectativas;
        }

        public static bool AtualizarExpectativa(int index, string novaDescricao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("UPDATE expectativa SET descricao = @novo WHERE numero = @numero", con);
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

        public static void EditarExpectativas(int atribuicao, string[] expectativasNovas)
        {
            List<Expectativa> expectativasAntigas = BuscarExpectativas(atribuicao);

            if (expectativasNovas.Length <= 0 && expectativasAntigas != null)
            {
                ExcluirTodasExpectativas(atribuicao);
            }
            else if (expectativasAntigas == null && expectativasNovas.Length > 0)
            {
                foreach (string e in expectativasNovas)
                {
                    if (e != "")
                    {
                        int index = Array.IndexOf(expectativasNovas, e) + 1;
                        Expectativa exp = new Expectativa(0, e, index, atribuicao);
                        exp.InserirExpectativa();
                    }
                }
            }
            else if (expectativasAntigas.Count > expectativasNovas.Length)
            {
                int ordem = 0;
                for (int i = 0; i < expectativasNovas.Length; i++)
                {
                    string descricaoAntiga = expectativasAntigas[i].Descricao;

                    if (descricaoAntiga != expectativasNovas[i] && expectativasNovas[i] != "")
                    {
                        AtualizarExpectativa(expectativasAntigas[i].Numero, expectativasNovas[i]);
                    }

                    ordem++;
                }

                ExcluirExpectativasAposOrdem(atribuicao, ordem);
            }
            else if (expectativasAntigas.Count < expectativasNovas.Length)
            {
                int ordem = 0;

                for (int i = 0; i < expectativasAntigas.Count; i++)
                {
                    string descricaoAntiga = expectativasAntigas[i].Descricao;

                    if (descricaoAntiga != expectativasNovas[i] && expectativasNovas[i] != "")
                    {
                        AtualizarExpectativa(expectativasAntigas[i].Numero, expectativasNovas[i]);
                    }
                    ordem++;
                }

                int tamanho = expectativasNovas.Length - ordem;
                string[] novoExpectativasNovas = new string[tamanho];

                Array.Copy(expectativasNovas, ordem, novoExpectativasNovas, 0, tamanho);
                ordem++;

                foreach (string e in novoExpectativasNovas)
                {
                    if (e != "")
                    {
                        Expectativa exp = new Expectativa(0, e, ordem, atribuicao);
                        exp.InserirExpectativa();
                        ordem++;
                    }
                }
            }
            else if (expectativasAntigas.Count == expectativasNovas.Length)
            {
                for (int i = 0; i < expectativasNovas.Length; i++)
                {
                    string descricaoAntiga = expectativasAntigas[i].Descricao;

                    if (descricaoAntiga != expectativasNovas[i] && expectativasNovas[i] != "")
                    {
                        AtualizarExpectativa(expectativasAntigas[i].Numero, expectativasNovas[i]);
                    }
                }
            }
        }

        public static bool ExcluirExpectativa(int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM expectativa WHERE numero = @numero", con);
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

        public static bool ExcluirExpectativasAposOrdem(int atribuicao, int ordem)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM expectativa WHERE atribuicao = @atribuicao AND ordem > @ordem", con);
                query.Parameters.AddWithValue("@atribuicao", atribuicao);
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

        public bool InserirExpectativa()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO expectativa VALUES(@numero, @descricao, @ordem, @atribuicao)", con);
                query.Parameters.AddWithValue("@numero", Numero);
                query.Parameters.AddWithValue("@descricao", Descricao);
                query.Parameters.AddWithValue("@ordem", Ordem);
                query.Parameters.AddWithValue("@atribuicao", NumAtribuicao);

                query.ExecuteNonQuery();

                con.Close();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static void ExcluirTodasExpectativas(int numAtribuicao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM expectativa WHERE atribuicao = @numero", con);
                query.Parameters.AddWithValue("@numero", numAtribuicao);

                query.ExecuteNonQuery();

                con.Close();
            }
            catch
            {
            }
        }
    }
}
