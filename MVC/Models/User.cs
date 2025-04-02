using System.ComponentModel.DataAnnotations;

namespace MVC.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string Role { get; set; } // "Client", "Admin"

        public List<Complaint> Complaints { get; set; } = new();
    }
}
