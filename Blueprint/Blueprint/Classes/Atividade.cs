using MySql.Data.MySqlClient;
using System;

namespace Blueprint.Classes
{
    public class Atividade
    {
        private int numero, numAtribuicao, ordem;
        private string descricao;

        public int Numero { get { return numero; } set { numero = value; } }
        public int NumAtribuicao { get { return numAtribuicao; } set { numAtribuicao = value; } }
        public int Ordem { get { return ordem; } set { ordem = value; } }
        public string Descricao { get { return descricao; } set { descricao = value; } }

        public Atividade(int numero, string descricao, int ordem, int numAtribuicao)
        {
            Numero = numero;
            Descricao = descricao;
            Ordem = ordem;
            NumAtribuicao = numAtribuicao;
        }

        public static List<Atividade> BuscarAtividades(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<Atividade> atividades = new List<Atividade>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM atividade WHERE atribuicao = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Atividade atividade = new Atividade(
                                (int)leitor["numero"],
                                leitor["descricao"].ToString(),
                                (int)leitor["ordem"],
                                (int)leitor["atribuicao"]
                            );

                        atividades.Add(atividade);
                    }
                }
                else
                {
                    atividades = null;
                }

                con.Close();
            }
            catch
            {
                atividades = null;
            }

            return atividades;
        }

        public static List<Atividade> BuscarTodasAtividades()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<Atividade> atividades = new List<Atividade>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM atividade", con);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Atividade atividade = new Atividade(
                                (int)leitor["numero"],
                                leitor["descricao"].ToString(),
                                (int)leitor["ordem"],
                                (int)leitor["atribuicao"]
                            );

                        atividades.Add(atividade);
                    }
                }
                else
                {
                    atividades = null;
                }

                con.Close();
            }
            catch
            {
                atividades = null;
            }

            return atividades;
        }

        public static string BuscarDescricaoAtividade(int numero)
        {
            string nome = null;
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT descricao FROM atividade WHERE numero = @numero", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        nome = leitor["descricao"].ToString();
                    }
                }

                con.Close();
            }
            catch
            {
                nome = null;
            }

            return nome;
        }

        public static List<string> BuscarDescricaoAtividades(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<string> atividades = new List<string>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT descricao FROM atividade WHERE atribuicao = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        atividades.Add(leitor["descricao"].ToString());
                    }
                }
                else
                {
                    atividades = null;
                }

                con.Close();
            }
            catch
            {
                atividades = null;
            }

            return atividades;
        }

        public static List<Atividade> BuscarAtividadesSemPop(int numero)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<Atividade> atividades = new List<Atividade>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM atividade WHERE numero NOT IN (SELECT atividade FROM pop) AND atribuicao = @numero ORDER BY ordem", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Atividade atividade = new Atividade(
                                (int)leitor["numero"],
                                leitor["descricao"].ToString(),
                                (int)leitor["ordem"],
                                (int)leitor["atribuicao"]
                            );

                        atividades.Add(atividade);
                    }
                }
                else
                {
                    atividades = null;
                }

                con.Close();
            }
            catch
            {
                atividades = null;
            }

            return atividades;
        }

        public static bool AtualizarAtividade(int index, string novaDescricao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("UPDATE atividade SET descricao = @novo WHERE numero = @numero", con);
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

        public static void EditarAtividades(int atribuicao, string[] atividadesNovas)
        {
            List<Atividade> atividadesAntigas = BuscarAtividades(atribuicao);

            if (atividadesNovas.Length <= 0 && atividadesAntigas != null)
            {
                ExcluirTodasAtividade(atribuicao);
            }
            else if (atividadesAntigas == null && atividadesNovas.Length > 0)
            {
                foreach (string a in atividadesNovas)
                {
                    if (a != "")
                    {
                        int index = Array.IndexOf(atividadesNovas, a) + 1;
                        Atividade atv = new Atividade(0, a, index, atribuicao);
                        atv.InserirAtividade();
                    }
                }
            }
            else if (atividadesAntigas.Count > atividadesNovas.Length)
            {
                int ordem = 0;
                for (int i = 0; i < atividadesNovas.Length; i++)
                {
                    string descricaoAntiga = atividadesAntigas[i].Descricao;

                    if (descricaoAntiga != atividadesNovas[i] && atividadesNovas[i] != "")
                    {
                        AtualizarAtividade(atividadesAntigas[i].Numero, atividadesNovas[i]);
                    }

                    ordem++;
                }

                ExcluirAtividadesAposOrdem(atribuicao, ordem);
            }
            else if (atividadesAntigas.Count < atividadesNovas.Length)
            {
                int ordem = 0;

                for (int i = 0; i < atividadesAntigas.Count; i++)
                {
                    string descricaoAntiga = atividadesAntigas[i].Descricao;

                    if (descricaoAntiga != atividadesNovas[i] && atividadesNovas[i] != "")
                    {
                        AtualizarAtividade(atividadesAntigas[i].Numero, atividadesNovas[i]);
                    }
                    ordem++;
                }

                int tamanho = atividadesNovas.Length - ordem;
                string[] novoAtividadesNovas = new string[tamanho];

                Array.Copy(atividadesNovas, ordem, novoAtividadesNovas, 0, tamanho);
                ordem++;

                foreach (string a in novoAtividadesNovas)
                {
                    if (a != "")
                    {
                        Atividade atv = new Atividade(0, a, ordem, atribuicao);
                        atv.InserirAtividade();
                        ordem++;
                    }
                }
            }
            else if (atividadesAntigas.Count == atividadesNovas.Length)
            {
                for (int i = 0; i < atividadesNovas.Length; i++)
                {
                    string descricaoAntiga = atividadesAntigas[i].Descricao;

                    if (descricaoAntiga != atividadesNovas[i] && atividadesNovas[i] != "")
                    {
                        AtualizarAtividade(atividadesAntigas[i].Numero, atividadesNovas[i]);
                    }
                }
            }
        }

        public static bool ExcluirAtividade(int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM atividade WHERE numero = @numero", con);
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

        public static bool ExcluirAtividadesAposOrdem(int atribuicao, int ordem)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            List<int> atividadesExcluidas = new List<int>();

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT numero FROM atividade WHERE atribuicao = @atribuicao AND ordem > @ordem", con);
                query.Parameters.AddWithValue("@atribuicao", atribuicao);
                query.Parameters.AddWithValue("@ordem", ordem);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        atividadesExcluidas.Add((int)leitor["numero"]);
                    }
                }

                con.Close();

                foreach (int atividade in atividadesExcluidas)
                {
                    Pop.ExcluirPopPorAtividade(atividade);
                }

                con.Open();

                query = new MySqlCommand("DELETE FROM atividade WHERE atribuicao = @atribuicao AND ordem > @ordem", con);
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

        public bool InserirAtividade()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO atividade VALUES(@numero, @descricao, @ordem, @atribuicao)", con);
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

        public static void ExcluirTodasAtividade(int numAtribuicao)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM atividade WHERE atribuicao = @numero", con);
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
