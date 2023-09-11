using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Entitys
{
    //Add DbContext
    public class CoverTypes
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Display(Name = "Cover Type")]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
