using WebApplication1.Dto;

namespace WebApplication1.Repository.IRepository
{
    public interface IEmailSender
    {
        Task SendEmail(EmailDto request);
    }
}
