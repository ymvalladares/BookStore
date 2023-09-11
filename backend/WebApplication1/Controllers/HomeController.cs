using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;
using WebApplication1.Utility;
using WebApplication1.ViewModels;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class HomeController : BaseControllerApi
    {
        private readonly IUnitOfWork _unitOfWork;
        public ShoppingCartVM shoppingCartVM { get; set; }

        public HomeController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("Add_Product_Car")]
        public async Task<ActionResult> AddNewShoppingCart(ShoppingCart shoppingCart)
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);

            shoppingCart.ApplicationUserId = claim.Value;

            ShoppingCart cartFromDb = _unitOfWork.ShoppingCartRepository.GetFirstOrDefault(
                u => u.ApplicationUserId == claim.Value && u.ProductId == shoppingCart.ProductId);
            if (cartFromDb == null)
            {
                _unitOfWork.ShoppingCartRepository.Add(shoppingCart);
            }
            else
            {
                _unitOfWork.ShoppingCartRepository.IncrementCount(cartFromDb, shoppingCart.Count);
            }

            _unitOfWork.Save();
            return Ok();
        }

        //[HttpPost("Summary_Car")]
        //public Task<ActionResult> SummaryShoppingCar(object[] items)
        //{
        //    var claimsIdentity = (ClaimsIdentity)User.Identity;
        //    var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);

        //    if (items == null)
        //    {

        //    }

        //    _unitOfWork.ShoppingCartRepository.RemoveRange(shoppingCartVM.ListCart);
        //    _unitOfWork.Save();
        //}
    }
}
