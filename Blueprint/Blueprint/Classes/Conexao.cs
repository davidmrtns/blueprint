namespace Blueprint.Classes
{
    public static class Conexao
    {
        //código de conexão do banco de dados
        public static readonly string codConexao = Environment.GetEnvironmentVariable("CONNECTION_STRING", EnvironmentVariableTarget.User);
    }
}
