using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using System.Security.Claims;
using WebApplication1.Dto;
using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;
using WebApplication1.Utility;
using WebApplication1.ViewModels;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class CartController : BaseControllerApi
    {
        private readonly IUnitOfWork _unitOfWork;
        public ShoppingCartVM shoppingCartVM { get; set; }

        public CartController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        //GET

        [HttpGet]
        public async Task<ActionResult<ShoppingCartVM>> getItemCart()
        {
            var claimIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimIdentity.FindFirst(ClaimTypes.NameIdentifier);

            shoppingCartVM = new ShoppingCartVM()
            {
                ListCart = _unitOfWork.ShoppingCartRepository.GetAll(x => x.ApplicationUserId == claim.Value, x => x.Product, x => x.ApplicationUser),
                OrderHeader=new()
            };

            foreach (var item in shoppingCartVM.ListCart)
            {
                item.Price = GetPriceBasedQuantity(item.Count, item.Product.Price, item.Product.Price50, item.Product.Price100);
                shoppingCartVM.OrderHeader.OrderTotal += (item.Count * item.Price);
            }
            return Ok(shoppingCartVM);
        }

        
        //[ValidateAntiForgeryToken]
        [HttpPost("Summary")]
        public async Task<ActionResult> SummaryPOST(OrderHeader orderHeader)
        {
            var claimidentity = (ClaimsIdentity)User.Identity;
            var claim = claimidentity.FindFirst(ClaimTypes.NameIdentifier);

            shoppingCartVM = new ShoppingCartVM()
            {
                ListCart = _unitOfWork.ShoppingCartRepository.GetAll(x => x.ApplicationUserId == claim.Value, x => x.Product),
                OrderHeader = new()
            };

            shoppingCartVM.ListCart = _unitOfWork.ShoppingCartRepository.GetAll(x => x.ApplicationUserId == claim.Value, x => x.Product);

            shoppingCartVM.OrderHeader.ApplicationUserId = orderHeader.ApplicationUserId;
            shoppingCartVM.OrderHeader.PaymentStatus = Roles.PaymentStatusPending;
            shoppingCartVM.OrderHeader.OrderStatus = Roles.StatusPending;
            shoppingCartVM.OrderHeader.OrderDate = DateTime.Now;
            shoppingCartVM.OrderHeader.ApplicationUserId = claim.Value;
            shoppingCartVM.OrderHeader.Name = orderHeader.Name;
            shoppingCartVM.OrderHeader.StreetAddress = orderHeader.StreetAddress;
            shoppingCartVM.OrderHeader.PhoneNumber = orderHeader.PhoneNumber;
            shoppingCartVM.OrderHeader.City = orderHeader.City;
            shoppingCartVM.OrderHeader.State = orderHeader.State;
            shoppingCartVM.OrderHeader.PostalCode = orderHeader.PostalCode;

            foreach (var cart in shoppingCartVM.ListCart)
            {
                cart.Price = GetPriceBasedQuantity(cart.Count, cart.Product.Price, cart.Product.Price50, cart.Product.Price100);
                shoppingCartVM.OrderHeader.OrderTotal += (cart.Price * cart.Count);
            }
            _unitOfWork.OrderHeaderRepository.Add(shoppingCartVM.OrderHeader);
            _unitOfWork.Save();

            foreach (var item in shoppingCartVM.ListCart)
            {
                OrderDetails orderDetails = new()
                {
                    ProductId = item.ProductId,
                    OrderId = shoppingCartVM.OrderHeader.Id,
                    Price = item.Price,
                    Count = item.Count,
                };
                _unitOfWork.OrderDetailsRepository.Add(orderDetails);
                _unitOfWork.Save();
            }

            //stripe settings
            var domain = "http://localhost:3000/";
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>(),
                Mode = "payment",
                SuccessUrl = domain + "OrderConfirmation/Success/" + shoppingCartVM.OrderHeader.Id,
                CancelUrl = domain + "OrderConfirmation/Failure",
            };

            foreach (var item in shoppingCartVM.ListCart)
            {

                var sessionLineItem = new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = (long)(item.Price * 100), //20 -> 2000
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = item.Product.Title,
                            
                        },
                    },
                    Quantity = item.Count,
                    
                };
                options.LineItems.Add(sessionLineItem);

            }

            var service = new SessionService();
            Session session = service.Create(options);
            Guid PaymentIntentId = Guid.NewGuid();

            _unitOfWork.OrderHeaderRepository.UpdateStripePaymentId(shoppingCartVM.OrderHeader.Id, session.Id, PaymentIntentId);
            _unitOfWork.Save();

            _unitOfWork.ShoppingCartRepository.RemoveRange(shoppingCartVM.ListCart);
            _unitOfWork.Save();

            Response.Headers.Add("Location", session.Url);

            return Ok(session.Url);
        }

        [HttpPut("PaymentSuccesfully/{id}")]
        public async Task<ActionResult> SuccesfullyPay(int id)
        {
            var query = _unitOfWork.OrderHeaderRepository.GetFirstOrDefault(x => x.Id == id);
            query.PaymentStatus = Roles.PaymentStatusApproved;
            query.PaymentDate = DateTime.Now;
            _unitOfWork.Save();

            return Ok();
        }

        [HttpPut("PaymentRefused/{id}")]
        public async Task<ActionResult> RefusedPayment(int id)
        {
            var claimidentity = (ClaimsIdentity)User.Identity;
            var claim = claimidentity.FindFirst(ClaimTypes.NameIdentifier);

            var query = _unitOfWork.OrderHeaderRepository.GetFirstOrDefault(x => x.Id == id);
            query.PaymentStatus = Roles.PaymentStatusRejected;
            _unitOfWork.Save();

            return Ok();
        }



        [HttpDelete]
        public async Task<ActionResult> Remove(int cartId)
        {
            var query = _unitOfWork.ShoppingCartRepository.GetFirstOrDefault(x => x.Id == cartId);
            if (query == null)
            {
                return BadRequest("This shop dont exist");
            }
            _unitOfWork.ShoppingCartRepository.Remove(query);
            _unitOfWork.Save();
            return Ok();
        }


        //Helps
        private static double GetPriceBasedQuantity(double quantity, double price, double price50, double price100)
        {
            if (quantity <= 50) return price;
            if (quantity <= 100) return price50;
            else return price100;
        }
    }
}
