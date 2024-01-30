namespace Blueprint.Classes
{
    public static class Conexao
    {
        //código de conexão do banco de dados
        private static readonly string codConexao = Environment.GetEnvironmentVariable("CONNECTION_STRING_BLUEPRINT", EnvironmentVariableTarget.User);
        
        public static string CodConexao { get { return codConexao; } }
    }
}
