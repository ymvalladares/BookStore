using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Entitys
{
    public class TokenHistory
    {
        [Key]
        public int TokenId { get; set; }

        [Required]
        public string ApplicationUserId { get; set; }
        [ForeignKey("ApplicationUserId")]
        [ValidateNever]
        public ApplicationUser ApplicationUser { get; set; }


        [Range(1, 500)]
        public string Token { get; set; }
        [Range(1, 500)]
        public string RefreshToken { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; } 
        public DateTime ExpirationDate { get; set; }

        [NotMapped]
        public bool IsActive { get; set; }

    }
    
}
