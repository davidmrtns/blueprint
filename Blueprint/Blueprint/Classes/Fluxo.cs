using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class Fluxo
    {
        private string nome, nodes, edges;
        private int id;

        public string Nome { get {  return nome; } set { nome = value; } }
        public string Nodes { get { return nodes; } set { nodes = value; } }
        public string Edges { get { return edges; } set { edges = value; } }
        public int Id { get { return id; } set { id = value; } }

        public Fluxo(int id, string nome, string nodes, string edges)
        {
            Id = id;
            Nome = nome;
            Nodes = nodes;
            Edges = edges;
        }

        public static Fluxo BuscarFluxo(int id)
        {
            Fluxo fluxo = null;
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM fluxo WHERE id = @id", con);
                query.Parameters.AddWithValue("@id", id);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        fluxo = new Fluxo(
                                (int)leitor["id"],
                                leitor["nome"].ToString(),
                                leitor["nodes"].ToString(),
                                leitor["edges"].ToString()
                            );
                    }
                }
                else
                {
                    fluxo = null;
                }
                con.Close();
            }
            catch
            {
                fluxo = null;
            }
            return fluxo;
        }

        public static List<Fluxo> GerarListaFluxos()
        {
            List<Fluxo> fluxos = new List<Fluxo>();
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM fluxo ORDER BY nome", con);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Fluxo fluxo = new Fluxo(
                                (int)leitor["id"],
                                leitor["nome"].ToString(),
                                leitor["nodes"].ToString(),
                                leitor["edges"].ToString()
                            );

                        fluxos.Add(fluxo);
                    }
                }
                else
                {
                    fluxos = null;
                }
                con.Close();
            }
            catch
            {
                fluxos = null;
            }
            return fluxos;
        }
    }
}
