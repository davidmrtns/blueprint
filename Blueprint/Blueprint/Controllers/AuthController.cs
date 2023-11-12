using Microsoft.AspNetCore.Mvc;
using Blueprint.Classes;
using Blueprint.ViewModels;
using System.Text.Json;
using static Mysqlx.Expect.Open.Types.Condition.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;

namespace Blueprint.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        public IActionResult Autenticar([FromBody] UsuarioModel usuario)
        {
            string username = usuario.Username;
            string password = usuario.Password;

            Usuario u = Usuario.Autenticar(username, password);

            if (u != null)
            {
                HttpContext.Session.SetString("_LoggedUser", JsonSerializer.Serialize(u));
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpGet]
        [Route("validar")]
        public bool Validar()
        {
            Usuario u = null;

            try
            {
                u = JsonSerializer.Deserialize<Usuario>(HttpContext.Session.GetString("_LoggedUser"))!;
            }
            catch
            {
                u = null;
            }

            if (u != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpGet]
        [Route("usuario")]
        public string BuscarUsuario()
        {
            string u = null;

            try
            {
                u = HttpContext.Session.GetString("_LoggedUser")!;
            }
            catch
            {
                u = null;
            }

            return u;
        }

        [HttpGet]
        [Route("desconectar")]
        public bool Desconectar()
        {
            try
            {
                HttpContext.Session.Clear();
                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpGet]
        [Route("admin")]
        public bool ChecarAdmin()
        {
            Usuario u = null;

            try
            {
                u = JsonSerializer.Deserialize<Usuario>(HttpContext.Session.GetString("_LoggedUser"))!;
            }
            catch
            {
                return false;
            }

            return u.Admin;
        }

        [HttpGet]
        [Route("listar-usuarios")]
        public string ListarUsuarios()
        {
            List<Usuario> usuarios = Usuario.GerarListaUsuarios();
            List<string> usuariosJson = new List<string>();

            if (usuarios != null)
            {
                foreach (Usuario usuario in usuarios)
                {
                    usuariosJson.Add(JsonSerializer.Serialize(usuario));
                }
            }
            else
            {
                usuariosJson = null;
            }

            return JsonSerializer.Serialize(usuariosJson);
        }
    }
}
