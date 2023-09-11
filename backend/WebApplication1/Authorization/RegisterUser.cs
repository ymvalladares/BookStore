using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Authorization
{
    public class RegisterUser
    {
       [Required] public string Name { get; set; }
       [Required] public string UserName { get; set; }
       [Required] public string Email { get; set; }
       [Required] public string Password { get; set; }
       [Required][Compare("Password")] public string ConfirmPassword { get; set; }
       [Required] public string PhoneNumber { get; set; }
       [Required] public string City { get; set; }
       [Required] public string PostalCode { get; set; }
       [Required] public string StreetAddress { get; set; }
       [Required] public string State { get; set; }
       [Required] public string Role { get; set; }
    }
}
