using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;
using WebApplication1.Utility;

namespace WebApplication1.Controllers
{
    [Authorize(Roles = Roles.Role_Admin)]
    public class RolesController : BaseControllerApi
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        public RolesController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<IdentityRole>>> GetAllOfRoles()
        {
            var rolesApp = await _roleManager.Roles.ToListAsync();
            return rolesApp;
        }


        [HttpPost]
        public async Task<IActionResult> AddRol(string role)
        {
            if (role != null)
            {
                _roleManager.CreateAsync(new IdentityRole(role)).GetAwaiter().GetResult();
            }
            return Ok();
        }


        [HttpGet("Rol")]
        [AllowAnonymous]
        public async Task<bool> getRole()
        {
            var role = User.IsInRole(Roles.Role_Admin);
            var isAuthenticated = User.Identity.IsAuthenticated;

            return role;
        }


        //private ApplicationUser GetUserCurrent()
        //{
        //    ApplicationUser applicationUsers;

        //       // var claims = HttpContext.User.Claims.ToList();

        //        var claim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

        //        applicationUsers = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.Id == claim);

        //    return applicationUsers;
        //}
    }
}
