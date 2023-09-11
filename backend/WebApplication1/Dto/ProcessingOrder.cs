using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Dto
{
    public class ProcessingOrder
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Carrier { get; set; }
        [Required]
        public string Tracking { get; set; }
        [Required]
        public string OrderStatus { get; set; }
    }
}
