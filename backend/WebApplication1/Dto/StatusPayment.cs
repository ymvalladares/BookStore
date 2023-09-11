using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Dto
{
    public class StatusPayment
    {
        [Required]
        public string? PaymentStatus { get; set; }
    }
}
