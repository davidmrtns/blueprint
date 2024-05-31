using Microsoft.AspNetCore.Mvc;
using Blueprint.Classes;
using Blueprint.ViewModels;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;

namespace Blueprint.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        public IActionResult Autenticar([FromBody] UsuarioModel usuario)
        {
            Usuario u = Usuario.Autenticar(usuario.Username, usuario.Password);

            if (u != null)
            {
                string token = Token.CriarToken(u.NomeUsuario, u.Nome, u.Admin);

                HttpContext.Session.SetString("_LoggedUser", JsonSerializer.Serialize(u));
                HttpContext.Response.Cookies.Append("Authorization", token, new CookieOptions
                {
                    Expires = DateTime.Now.AddHours(1),
                    HttpOnly = true,
                    Secure = true,
                    IsEssential = true,
                    SameSite = SameSiteMode.Strict
                });
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [Authorize]
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

        [Authorize]
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

        [Authorize]
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

        [Authorize]
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

        [Authorize(Policy = "Admin")]
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
