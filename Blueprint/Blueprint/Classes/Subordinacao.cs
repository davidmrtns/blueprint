using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class Subordinacao
    {
        private int id, subordinado, superior;

        public int Id { get { return id; } set { id = value; } }
        public int Subordinado { get { return subordinado; } set { subordinado = value; } }
        public int Superior { get { return superior; } set { superior = value; } }

        public Subordinacao(int id, int subordinado, int superior)
        {
            Id = id;
            Subordinado = subordinado;
            Superior = superior;
        }

        public bool InserirSubordinacao()
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO subordinacao VALUES(@id, @subordinado, @superior)", con);
                query.Parameters.AddWithValue("@id", Id);
                query.Parameters.AddWithValue("@subordinado", Subordinado);
                query.Parameters.AddWithValue("@superior", Superior);

                query.ExecuteNonQuery();

                con.Close();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public static List<Subordinacao> BuscarSubordinacoes(int id)
        {
            List<Subordinacao> subordinacoes = new List<Subordinacao>();
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();
                MySqlCommand query = new MySqlCommand("SELECT * FROM subordinacao WHERE subordinado = @subordinado", con);
                query.Parameters.AddWithValue("@subordinado", id);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Subordinacao subordinacao = new Subordinacao(
                                (int)leitor["id"],
                                (int)leitor["subordinado"],
                                (int)leitor["superior"]
                            );

                        subordinacoes.Add(subordinacao);
                    }
                }
                else
                {
                    subordinacoes = null;
                }
                con.Close();
            }
            catch
            {
                subordinacoes = null;
            }
            return subordinacoes;
        }

        /*public static void EditarSubordinacoes(int atribuicao, string[] superioresNovos)
        {
            List<Subordinacao> superioresAntigos = BuscarSubordinacoes(atribuicao);

            foreach (Subordinacao subordinacao in superioresAntigos)
            {
                for (int i = 0; i < superioresNovos.Length; i++)
                {
                    if (int.Parse(superioresNovos[i]) != subordinacao.Superior)
                    {
                        ExcluirSubordinacao(subordinacao.Id);
                    }
                }
            }
        }*/

        public static void ExcluirSubordinacao(int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM subordinacao WHERE id = @id", con);
                query.Parameters.AddWithValue("@id", id);

                query.ExecuteNonQuery();

                con.Close();
            }
            catch
            {
            }
        }

        public static void ExcluirTodasSubordinacoes(int numAtribuicao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM subordinacao WHERE subordinado = @numero", con);
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
