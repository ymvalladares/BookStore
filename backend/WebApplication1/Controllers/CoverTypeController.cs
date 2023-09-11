using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;
using WebApplication1.Utility;

namespace WebApplication1.Controllers
{
    [Authorize(Roles = Roles.Role_Admin)]
    public class CoverTypeController : BaseControllerApi
    {
        private readonly IUnitOfWork _unitOfWork;

        public CoverTypeController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        //GET

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CoverTypes>>> getAllCoverTypes()
        {
            var query = _unitOfWork.CoverTypeRepository.GetAll();
            return Ok(query);
        }


        [HttpGet("ById/{id}")]
        public async Task<ActionResult<CoverTypes>> getCoverTypeById(int id)
        {
            var query = _unitOfWork.CoverTypeRepository.GetFirstOrDefault(x => x.Id == id);
            return Ok(query);
        }

        [HttpPost("create")]
        public async Task<ActionResult> Create(CoverTypes coverTypes)
        {
            var query = _unitOfWork.CoverTypeRepository.GetFirstOrDefault(x => x.Name == coverTypes.Name);
            if(query != null)
            {
                return BadRequest("This category exist");
            }

            _unitOfWork.CoverTypeRepository.Add(coverTypes);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpPut("edit")]
        public async Task<ActionResult> Edit(CoverTypes coverTypes)
        {
            var query = _unitOfWork.CoverTypeRepository.GetFirstOrDefault(x => x.Id == coverTypes.Id);
            if (query == null)
            {
                return BadRequest("This CoverTypes not exist");
            }

            _unitOfWork.CoverTypeRepository.Update(coverTypes);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            var query = _unitOfWork.CoverTypeRepository.GetFirstOrDefault(x => x.Id == id);
            if (query == null)
            {
                return BadRequest("This CoverTypes not exist");
            }

            _unitOfWork.CoverTypeRepository.Remove(query);
            _unitOfWork.Save();
            return Ok();
        }
    }
}
