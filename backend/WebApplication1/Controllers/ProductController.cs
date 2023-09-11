using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dto;
using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;
using WebApplication1.Utility;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class ProductController : BaseControllerApi
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ProductController(IUnitOfWork unitOfWork, IWebHostEnvironment hostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _hostEnvironment = hostEnvironment;
        }

        //GET

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> getAllProducts()
        {
            var query = _unitOfWork.ProductRepository.GetAll(null, x => x.Category, q => q.CoverTypes);
            return Ok(query);
        }

        [HttpGet("ById/{id}")]
        public async Task<ActionResult<Product>> getProductById(int id)
        {
            var query = _unitOfWork.ProductRepository.GetFirstOrDefault(x => x.Id == id, x => x.Category, q => q.CoverTypes);
            return Ok(query);
        }

        [Authorize(Roles = Roles.Role_Admin)]
        [HttpPost("upset")]       
        public async Task<ActionResult> createProduct([FromForm]ProductDTO obj)
        {
            IFormFile file = Request.Form.Files.FirstOrDefault();
            string wwwRootPath = _hostEnvironment.WebRootPath;

            var myProduct = _unitOfWork.ProductRepository.GetFirstOrDefault(x => x.Id == obj.Id);
            var product = new Product
                {
                    Id = obj.Id,
                    Author = obj.Author,
                    Description = obj.Description,
                    Title = obj.Title,
                    ISBC = obj.ISBC,
                    ListPrice = obj.ListPrice,
                    Price = obj.Price,
                    Price50 = obj.Price50,
                    Price100 = obj.Price100,
                    CategoryId = obj.Category,
                    CoverTypeId = obj.CoverType
                };
            

            if (file != null)
            {
                string fileName = Guid.NewGuid().ToString();

                var uploads = Path.Combine(wwwRootPath, @"images\products");

                var extension = Path.GetExtension(file.FileName);

                if (myProduct != null)
                {
                    var oldImagePath = Path.Combine(wwwRootPath, myProduct.ImageURL.TrimStart('\\'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                using (var fileStreams = new FileStream(Path.Combine(uploads, obj.Id + "-" + fileName + extension), FileMode.Create))

                {
                    file.CopyTo(fileStreams);
                }

                product.ImageURL = @"\images\products\" + obj.Id + "-" + fileName + extension;
            }

            if (obj.Id == 0)
            {
                _unitOfWork.ProductRepository.Add(product);
            }
            else
            {
                _unitOfWork.ProductRepository.Update(product);
            }

            _unitOfWork.Save();
            return Ok();
        }

        [Authorize(Roles = Roles.Role_Admin)]
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var obj = _unitOfWork.ProductRepository.GetFirstOrDefault(c => c.Id == id);
            if (obj == null)
            {
                return BadRequest("Imposible to delete this product");
            };

            var oldImagePath = Path.Combine(_hostEnvironment.WebRootPath, obj.ImageURL.TrimStart('\\'));
            if (System.IO.File.Exists(oldImagePath))
            {
                System.IO.File.Delete(oldImagePath);
            }

            _unitOfWork.ProductRepository.Remove(obj);
            _unitOfWork.Save();

            return Ok();
        }
    }
}
