namespace Blueprint.Classes
{
    public static class Conexao
    {
        //código de conexão do banco de dados
        private static readonly string codConexao = Environment.GetEnvironmentVariable("CONNECTION_STRING_BLUEPRINT", EnvironmentVariableTarget.User);
        private static readonly string issuer = Environment.GetEnvironmentVariable("TOKEN_ISSUER_BLUEPRINT", EnvironmentVariableTarget.User);
        private static readonly string audience = Environment.GetEnvironmentVariable("TOKEN_AUDIENCE_BLUEPRINT", EnvironmentVariableTarget.User);
        private static readonly string securityKey = Environment.GetEnvironmentVariable("TOKEN_SECURITY_KEY_BLUEPRINT", EnvironmentVariableTarget.User);
        
        public static string CodConexao { get { return codConexao; } }
        public static string Issuer { get { return issuer; } }
        public static string Audience { get { return audience; } }
        public static string SecurityKey { get { return securityKey; } }
    }
}
