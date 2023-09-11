using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebApplication1.Authorization;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Entitys;
using WebApplication1.Middleware;
using WebApplication1.Repository.IRepository;
using WebApplication1.Utility;

namespace WebApplication1.Controllers
{
    public class AccountController : BaseControllerApi
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ITokenService _tokenService;
        private readonly HttpClient _httpClient;

        //private readonly ILogger _logger;

        public AccountController(ApplicationDbContext db, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, RoleManager<IdentityRole> roleManager, ITokenService tokenService)
        {
            _db = db;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://www.googleapis.com/oauth2/v2/")
            };
            //_logger = logger;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterUser usuario)
        {
            //created roles in the DB
            if (!_roleManager.RoleExistsAsync(Roles.Role_Admin).GetAwaiter().GetResult())
            {
                _roleManager.CreateAsync(new IdentityRole(Roles.Role_Admin)).GetAwaiter().GetResult();
                _roleManager.CreateAsync(new IdentityRole(Roles.Role_User_Indi)).GetAwaiter().GetResult();
                _roleManager.CreateAsync(new IdentityRole(Roles.Role_User_Company)).GetAwaiter().GetResult();
                _roleManager.CreateAsync(new IdentityRole(Roles.Role_Employee)).GetAwaiter().GetResult();
            }

            if (await UserExist(usuario.Email)) return BadRequest("Name is token");

            var user = new ApplicationUser
            {
                UserName = usuario.UserName,
                Email = usuario.Email,
 
                PhoneNumber = usuario.PhoneNumber,
                City = usuario.City,
                Name = usuario.Name,
                PostalCode = usuario.PostalCode,
                State = usuario.State,
                StreetAddress = usuario.StreetAddress
            };

            

            var result = await _userManager.CreateAsync(user, usuario.Password);
            if (result.Succeeded)
            {
                if (usuario.Role == null)
                {
                    await _userManager.AddToRoleAsync(user, Roles.Role_User_Indi);
                }
                else
                {
                    await _userManager.AddToRoleAsync(user, usuario.Role);
                }

                //await _signInManager.SignInAsync(user, isPersistent: false);

                return new UserDto
                {
                    Name = user.Name,
                    UserName = user.UserName,
                    Email = user.Email,
                };
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginModel loginModel)
        {
            var userIdentity = await _userManager.FindByEmailAsync(loginModel.Email);
            if (userIdentity == null) return Unauthorized("Invalid user");

            var result = await _signInManager.CheckPasswordSignInAsync(userIdentity, loginModel.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized("Invalid password");
            }

            var user = await _db.ApplicationUsers.SingleOrDefaultAsync(u => u.Email == loginModel.Email);
            var roles = new List<string>(await _userManager.GetRolesAsync(user));

            string token = _tokenService.CreateToken(user, roles);

            return token;
        }

        [AllowAnonymous]
        [HttpPost("loginGoogle")]
        public async Task<ActionResult<string>> LoginGoogle(string token_google)
        {
            var verifyToken = await _httpClient.GetAsync($"userinfo?access_token={token_google}");

            if (!verifyToken.IsSuccessStatusCode) return Unauthorized("Please you might register before");


            var infoUser = await _httpClient.GetFromJsonAsync<GoogleDTO>($"userinfo?access_token={token_google}");

            var user = await _db.ApplicationUsers.SingleOrDefaultAsync(u => u.Email == infoUser.Email);
            var roles = new List<string>(await _userManager.GetRolesAsync(user));

            string token = _tokenService.CreateToken(user, roles);

            return token;

        }



        private async Task<bool> UserExist(string email)
        {
            return await _db.ApplicationUsers.AnyAsync(x => x.Email == email.ToLower());
        }
    }
}
