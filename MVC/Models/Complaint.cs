using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace MVC.Models
{
    public class Complaint
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required, ForeignKey("Flight")]
        public int FlightId { get; set; }
        public Flight Flight { get; set; }

        [Required]
        public string Status { get; set; } // "Pending", "Approved", "Rejected"

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Document> Documents { get; set; } = new();
    }
}
