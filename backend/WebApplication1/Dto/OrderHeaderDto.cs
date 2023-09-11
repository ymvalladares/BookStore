using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Dto
{
    public class OrderHeaderDto
    {
        public double? OrderTotal { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string StreetAddress { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string? PaymentStatus { get; set; }
        public string? TrackingNumber { get; set; }
    }
}
