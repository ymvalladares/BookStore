using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;
using WebApplication1.Utility;

namespace WebApplication1.Controllers
{
    [Authorize(Roles = Roles.Role_Admin)]
    public class CategoryController : BaseControllerApi
    {
        private readonly IUnitOfWork _unitOfWork;

        public CategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        //GET

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> getAllCategories()
        {
            var query = _unitOfWork.CategoryRepository.GetAll();
            return Ok(query);
        }


        [HttpGet("ById/{id}")]
        public async Task<ActionResult<Category>> getCategoryById(int id)
        {
            var query = _unitOfWork.CategoryRepository.GetFirstOrDefault(x => x.Id == id);
            return Ok(query);
        }

        [HttpPost("create")]
        public async Task<ActionResult> Create(Category category)
        {
            var query = _unitOfWork.CategoryRepository.GetFirstOrDefault(x => x.Name == category.Name);
            if(query != null)
            {
                return BadRequest("This category exist");
            }

            _unitOfWork.CategoryRepository.Add(category);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpPut("edit")]
        public async Task<ActionResult> Edit(Category category)
        {
            var query = _unitOfWork.CategoryRepository.GetFirstOrDefault(x => x.Id == category.Id);
            if (query == null)
            {
                return BadRequest("This product not exist");
            }

            _unitOfWork.CategoryRepository.Update(category);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            var query = _unitOfWork.CategoryRepository.GetFirstOrDefault(x => x.Id == id);
            if (query == null)
            {
                return BadRequest("This product not exist");
            }

            _unitOfWork.CategoryRepository.Remove(query);
            _unitOfWork.Save();
            return Ok();
        }
    }
}
