using MySql.Data.MySqlClient;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
//https://mysqlconnector.net/tutorials/connect-to-mysql/

namespace Blueprint.Classes
{
    public class Usuario
    {
        private string nomeUsuario, senha, nome, salt;
        private bool admin;

        public string NomeUsuario { get {  return nomeUsuario; } set {  nomeUsuario = value; } }
        public string Senha { get { return senha; } set {  senha = value; } }
        public string Nome { get { return nome; } set { nome = value; } }
        public string Salt { get {  return salt; } set { salt = value; } }
        public bool Admin { get { return admin; } set { admin = value; } }

        [JsonConstructor]
        public Usuario() { }

        public Usuario(string nomeUsuario, string nome, bool admin)
        {
            NomeUsuario = nomeUsuario;
            Nome = nome;
            Admin = admin;
        }
        public Usuario(string nomeUsuario, string senha, string nome, bool admin)
        {
            NomeUsuario = nomeUsuario;
            Senha = senha;
            Nome = nome;
            Salt = salt;
            Admin = admin;
        }

        public bool InserirUsuario() {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(Senha);
            var hashedPassword = sha.ComputeHash(asByteArray);
            string senhaHash = Convert.ToBase64String(hashedPassword);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO usuario VALUES(@nomeUsuario, @senha, @nome, @admin)", con);
                query.Parameters.AddWithValue("@nomeUsuario", NomeUsuario);
                query.Parameters.AddWithValue("@senha", senhaHash);
                query.Parameters.AddWithValue("@nome", Nome);
                query.Parameters.AddWithValue("@admin", Admin);

                query.ExecuteNonQuery();
                con.Close();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public static Usuario Autenticar(string nomeUsuario, string senha)
        {
            Usuario u = null;
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            var sha = SHA256.Create();
            var asByteArray = Encoding.UTF8.GetBytes(senha);
            var hashedPassword = sha.ComputeHash(asByteArray);
            string senhaInformada = Convert.ToBase64String(hashedPassword);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM usuario WHERE nome_usuario = @nomeUsuario", con);
                query.Parameters.AddWithValue("@nomeUsuario", nomeUsuario);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        string senhaBanco = leitor["senha"].ToString();

                        if (senhaInformada == senhaBanco)
                        {
                            u = new Usuario(
                                leitor["nome_usuario"].ToString(),
                                leitor["nome"].ToString(),
                                (bool)leitor["admin"]
                                );
                        }
                        else
                        {
                            u = null;
                        }
                    }
                }
                con.Close();
            }
            catch
            {
                u = null;
            }
            return u;
        }

        public static List<Usuario> GerarListaUsuarios()
        {
            List<Usuario> usuarios = new List<Usuario>();
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM usuario", con);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        Usuario usuario = new Usuario(
                                leitor["nome_usuario"].ToString(),
                                leitor["nome"].ToString(),
                                (bool)leitor["admin"]
                                );

                        usuarios.Add(usuario);
                    }
                }
                else
                {
                    usuarios = null;
                }
                con.Close();
            }
            catch
            {
                usuarios = null;
            }

            return usuarios;
        }
    }
}
