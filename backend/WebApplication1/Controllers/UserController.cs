using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class UserController : BaseControllerApi
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> getAllUser()
        {
            var query = _unitOfWork.ApplicationUserRepository.GetAll();
            return Ok(query);
        }

        [HttpGet("ById/{id}")]
        public async Task<ActionResult<ApplicationUser>> getUserById(string id)
        {
            var query = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.Id == id);
            return Ok(query);
        }

        [HttpGet("ByUserName/{userName}")]
        public async Task<ActionResult<ApplicationUser>> getAllUser(string userName)
        {
            var query = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.UserName == userName);
            return Ok(query);
        }
    }
}
