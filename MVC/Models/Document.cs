using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MVC.Models
{
    public class Document
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey("Complaint")]
        public int ComplaintId { get; set; }
        public Complaint Complaint { get; set; }

        [Required]
        public string FilePath { get; set; }

        [Required]
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }
}
