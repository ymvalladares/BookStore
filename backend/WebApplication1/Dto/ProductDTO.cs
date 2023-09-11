using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Dto
{
    public class ProductDTO
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string ISBC { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        [Range(1, 100000)]
        public double ListPrice { get; set; }
        [Required]
        [Range(1, 100000)]
        public double Price { get; set; }
        [Required]
        [Range(1, 100000)]
        public double Price50 { get; set; }
        [Required]
        [Range(1, 100000)]
        public double Price100 { get; set; }
        [Required]
        public int Category { get; set; }
        [Required]
        public int CoverType { get; set; }
    }
}
