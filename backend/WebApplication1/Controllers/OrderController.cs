using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PdfSharpCore;
using PdfSharpCore.Pdf;
using Rotativa.AspNetCore;
using System.Security.Claims;
using TheArtOfDev.HtmlRenderer.PdfSharp;
using WebApplication1.Dto;
using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;
using WebApplication1.Services;
using WebApplication1.Utility;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class OrderController : BaseControllerApi
    {
        private readonly IUnitOfWork _unitOfWork;

        public OrderController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<OrderHeader>>> GetAll(string status)
        {
            IEnumerable<OrderHeader> orderHeaders;

            if (User.IsInRole(Roles.Role_Admin))
            {
               orderHeaders =  _unitOfWork.OrderHeaderRepository.GetAll(null, x => x.ApplicationUser);
            }
            else
            {
                var claimsIdentity = (ClaimsIdentity)User.Identity;
                var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
                orderHeaders = _unitOfWork.OrderHeaderRepository.GetAll(x => x.ApplicationUserId == claim.Value, x => x.ApplicationUser);
            }

            switch (status)
            {
                case "Pending":
                    orderHeaders = orderHeaders.Where(x => x.OrderStatus == Roles.StatusPending);
                    break;
                case "InProcess":
                    orderHeaders = orderHeaders.Where(x => x.OrderStatus == Roles.StatusInProcess);
                    break;
                case "Shipped":
                    orderHeaders = orderHeaders.Where(x => x.OrderStatus == Roles.StatusShipped);
                    break;
                case "Approved":
                    orderHeaders = orderHeaders.Where(x => x.OrderStatus == Roles.StatusApproved);
                    break;
                case "All":
                    break;
            }

            return Ok(orderHeaders);
        }

        [Authorize(Roles = Roles.Role_Admin)]
        [HttpGet("ById/{id}")]
        public async Task<ActionResult<OrderHeader>> GetOrderById(int id)
        {
            OrderVM orderVM = new()
            {
                OrderHeader = _unitOfWork.OrderHeaderRepository.GetFirstOrDefault(x => x.Id == id),
                OrderDetails = _unitOfWork.OrderDetailsRepository.GetAll(x => x.OrderId == id, x => x.Product)
            };

            return Ok(orderVM);
        }

        [Authorize(Roles = Roles.Role_Admin)]
        [HttpPost("ProcessingOrder")]
        public async Task<ActionResult> Update([FromBody]ProcessingOrder processingOrder)
        {
            var query = _unitOfWork.OrderHeaderRepository.GetFirstOrDefault(x => x.Id == processingOrder.Id);

            if(query != null)
            {
                if (processingOrder.OrderStatus == Roles.StatusPending)
                {
                    query.OrderStatus = Roles.StatusInProcess;
                    query.Carrier = processingOrder.Carrier;
                    query.TrackingNumber = processingOrder.Tracking;
                }

                if (processingOrder.OrderStatus == Roles.StatusInProcess)
                {
                    query.OrderStatus = Roles.StatusShipped;
                    query.ShippingDate = DateTime.Now;
                }

                _unitOfWork.OrderHeaderRepository.Update(query);
                _unitOfWork.Save();
                return Ok();
            }

            return BadRequest("That order not exist"); 
        }

        
    }
}
