using System.ComponentModel;
using System.Globalization;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class Departamento
    {
        private int id;
        private string nome, cor;

        public int Id { get { return id; } set { id = value; } }
        public string Nome { get { return nome; } set { nome = value; } }
        public string Cor { get { return cor; } set { cor = value; } }

        public Departamento(int id, string nome, string cor)
        {
            Id = id;
            Nome = nome;
            Cor = cor;
        }

        public static List<Departamento> GerarListaDepartamentos()
        {
            List<Departamento> departamentos = new List<Departamento>();
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM departamento", con);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Departamento departamento = new Departamento(
                                (int)leitor["id"],
                                leitor["nome"].ToString(),
                                leitor["cor"].ToString()
                            );

                        departamentos.Add(departamento);
                    }
                }
                else
                {
                    departamentos = null;
                }

                con.Close();
            }
            catch
            {
                departamentos = null;
            }
            return departamentos;
        }
    }
}
