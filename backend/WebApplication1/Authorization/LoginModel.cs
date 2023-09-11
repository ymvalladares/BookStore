using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Authorization
{
    public class LoginModel
    {
        [Required] public string Email { get; set; }
        [Required] public string Password { get; set; }
    }
}
