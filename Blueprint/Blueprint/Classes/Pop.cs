using MySql.Data.MySqlClient;

namespace Blueprint.Classes
{
    public class Pop
    {
        private string atividade;
        private int numero, numRevisao, departamento, responsavel, numAtividade;
        private DateTime estabelecido, revisado;
        //private bool aprovOperacao, aprovSupervisao, aprovDiretoria;

        public int Numero { get { return numero; } set { numero = value; } }
        public int NumRevisao { get { return numRevisao; } set { numRevisao = value; } }
        public int Departamento { get { return departamento; } set { departamento = value; } }
        public int Responsavel { get { return responsavel; } set { responsavel = value; } }
        public DateTime Estabelecido { get { return estabelecido; } set { estabelecido = value; } }
        public DateTime Revisado { get { return revisado; } set { revisado = value; } }
        public int NumAtividade { get { return numAtividade; } set { numAtividade = value; } }
        public string Atividade { get { return atividade; } set { atividade = value; } }

        public Pop(int numero, int departamento, int responsavel, int numAtividade)
        {
            Numero = numero;
            Departamento = departamento;
            Responsavel = responsavel;
            NumAtividade = numAtividade;
        }

        public Pop(int numero, int departamento, DateTime estabelecido, DateTime revisado, int numRevisao, int responsavel, int numAtividade)
        {
            Numero = numero;
            Departamento = departamento;
            Estabelecido = estabelecido;
            Revisado = revisado;
            NumRevisao = numRevisao;
            Responsavel = responsavel;
            NumAtividade = numAtividade;
        }

        public Pop(int numero, int departamento, int numRevisao, int responsavel, string atividade)
        {
            Numero = numero;
            Departamento = departamento;
            NumRevisao = numRevisao;
            Responsavel = responsavel;
            Atividade = atividade;
        }

        public long AdicionarPop()
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);
            long numTemp;

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO pop VALUES(@numero, @departamento, @estabelecido, @revisado, @numRevisao, @numAtividade, @responsavel)", con);
                query.Parameters.AddWithValue("@numero", Numero);
                query.Parameters.AddWithValue("@departamento", Departamento);
                query.Parameters.AddWithValue("@estabelecido", Estabelecido);
                query.Parameters.AddWithValue("@revisado", Revisado);
                query.Parameters.AddWithValue("@numRevisao", NumRevisao);
                query.Parameters.AddWithValue("@responsavel", Responsavel);
                query.Parameters.AddWithValue("@numAtividade", NumAtividade);

                query.ExecuteNonQuery();

                numTemp = query.LastInsertedId;

                con.Close();
            }
            catch
            {
                numTemp = 0;
            }

            return numTemp;
        }

        public static Pop BuscarPop(int numero)
        {
            Pop pop = null;
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM pop WHERE numero = @numero", con);
                query.Parameters.AddWithValue("@numero", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        pop = new Pop(
                                (int)leitor["numero"],
                                (int)leitor["departamento"],
                                (DateTime)leitor["estabelecido"],
                                (DateTime)leitor["revisado"],
                                (int)leitor["numRevisao"],
                                (int)leitor["responsavel"],
                                (int)leitor["atividade"]
                            );
                    }
                }
                else
                {
                    pop = null;
                }
                con.Close();
            }
            catch
            {
                pop = null;
            }
            return pop;
        }

        public static int BuscarNumPopPorAtividade(int numero)
        {
            int numPop = 0;
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT numero FROM pop WHERE atividade = @atividade", con);
                query.Parameters.AddWithValue("@atividade", numero);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        numPop = (int)leitor["numero"];
                    }
                }
                else
                {
                    numPop = 0;
                }
                con.Close();
            }
            catch
            {
                numPop = 0;
            }
            return numPop;
        }

        public static bool EditarPop(Pop popAntigo, Pop popNovo)
        {
            bool resultado = false;
            string atividadeAntiga = Classes.Atividade.BuscarDescricaoAtividade(popAntigo.NumAtividade);
            List<Tuple<string, string>> listaString = new List<Tuple<string, string>>();
            List<Tuple<int, string>> listaInt = new List<Tuple<int, string>>();

            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            if (popAntigo.Departamento != popNovo.Departamento)
            {
                listaInt.Add(new Tuple<int, string>(popNovo.Departamento, "departamento"));
            }

            if (popAntigo.NumRevisao != popNovo.NumRevisao)
            {
                listaInt.Add(new Tuple<int, string>(popNovo.NumRevisao, "numRevisao"));
            }

            if (popAntigo.Responsavel != popNovo.Responsavel)
            {
                listaInt.Add(new Tuple<int, string>(popNovo.Responsavel, "responsavel"));
            }

            if (atividadeAntiga != popNovo.Atividade)
            {
                Classes.Atividade.AtualizarAtividade(popAntigo.NumAtividade, popNovo.Atividade);
            }

            //para cada dado a ser alterado,
            foreach (var item in listaString)
            {
                try
                {
                    //conexão aberta
                    con.Open();

                    //atualiza o campo de acordo com o dado informado
                    MySqlCommand query = new MySqlCommand(string.Format("UPDATE pop SET {0} = @dado WHERE numero = @numero", item.Item2), con);
                    //os parâmetros são obtidos das tuplas da lista
                    query.Parameters.AddWithValue("@dado", item.Item1);
                    query.Parameters.AddWithValue("@numero", popAntigo.Numero);
                    //execução do código
                    query.ExecuteNonQuery();
                    //conexão fechada
                    con.Close();

                    //resultado passa a ser verdadeiro
                    resultado = true;
                }
                catch
                {
                    //em caso de erro, o resultado continua a ser falso
                    resultado = false;
                }
            }

            foreach (var item in listaInt)
            {
                try
                {
                    //conexão aberta
                    con.Open();

                    //atualiza o campo de acordo com o dado informado
                    MySqlCommand query = new MySqlCommand(string.Format("UPDATE pop SET {0} = @dado WHERE numero = @numero", item.Item2), con);
                    //os parâmetros são obtidos das tuplas da lista
                    query.Parameters.AddWithValue("@dado", item.Item1);
                    query.Parameters.AddWithValue("@numero", popAntigo.Numero);
                    //execução do código
                    query.ExecuteNonQuery();
                    //conexão fechada
                    con.Close();

                    //resultado passa a ser verdadeiro
                    resultado = true;
                }
                catch
                {
                    //em caso de erro, o resultado continua a ser falso
                    resultado = false;
                }
            }
            //retorna o resultado
            return resultado;
        }

        public static bool ExcluirPop(int id)
        {
            Material.ExcluirTodosMateriais(id);
            PontoCritico.ExcluirTodosPontosCriticos(id);
            Manuseio.ExcluirTodosManuseios(id);
            Resultado.ExcluirTodosResultados(id);
            AcaoCorretiva.ExcluirTodasAcoesCorretivas(id);
            Habilidade.ExcluirTodasHabilidades(id);

            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM pop WHERE numero = @numero", con);
                query.Parameters.AddWithValue("@numero", id);

                query.ExecuteNonQuery();

                con.Close();

                return true;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public static bool ExcluirPopPorAtividade(int atividade)
        {
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);
            int id = 0;

            try
            {
                con.Open();
                MySqlCommand query = new MySqlCommand("SELECT numero FROM pop WHERE atividade = @atividade", con);
                query.Parameters.AddWithValue("@atividade", atividade);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        id = (int)leitor["numero"];
                    }
                }

                con.Close();

                Material.ExcluirTodosMateriais(id);
                PontoCritico.ExcluirTodosPontosCriticos(id);
                Manuseio.ExcluirTodosManuseios(id);
                Resultado.ExcluirTodosResultados(id);
                AcaoCorretiva.ExcluirTodasAcoesCorretivas(id);
                Habilidade.ExcluirTodasHabilidades(id);
                Pop.ExcluirPop(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public static bool ExcluirTodosPops(int numAtribuicao)
        {
            List<int> pops = new List<int>();
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT numero FROM pop WHERE responsavel = @numero", con);
                query.Parameters.AddWithValue("@numero", numAtribuicao);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        pops.Add((int)leitor["numero"]);
                    }
                }

                con.Close();

                foreach (int pop in pops)
                {
                    Pop.ExcluirPop(pop);
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public static List<Pop> GerarListaPops()
        {
            List<Pop> pops = new List<Pop>();
            MySqlConnection con = new MySqlConnection(Conexao.codConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM pop ORDER BY departamento", con);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Pop pop = new Pop(
                                (int)leitor["numero"],
                                (int)leitor["departamento"],
                                (int)leitor["responsavel"],
                                (int)leitor["atividade"]
                            );

                        pops.Add(pop);
                    }
                }
                else
                {
                    pops = null;
                }
                con.Close();
            }
            catch
            {
                pops = null;
            }
            return pops;
        }
    }
}
