using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Entitys
{
    //Add DbContext
    public class Product
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
        public string ImageURL { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        [ValidateNever]
        public Category Category { get; set; }
        [Required]
        public int CoverTypeId { get; set; }
        [ValidateNever]
        [ForeignKey("CoverTypeId")]
        public CoverTypes CoverTypes { get; set; }
    }
}
