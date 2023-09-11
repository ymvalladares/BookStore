using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dto;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Controllers
{
        
        public class EmailSenderController : BaseControllerApi
        {
            private readonly IEmailSender _emailSender;

            public EmailSenderController(IEmailSender emailSender)
            {
                _emailSender = emailSender;
            }

            [HttpPost]
            public async Task<ActionResult> SendEmail(EmailDto request)
            {
                await _emailSender.SendEmail(request);
                return Ok();
            }
        }
    
}
