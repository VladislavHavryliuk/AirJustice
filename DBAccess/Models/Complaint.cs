using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace DBAccess.Models
{
    public enum ComplaintStatus
    {
        Submitted,
        InReview,
        Approved,
        Rejected,
        AwaitingDocuments
    }

    public class Complaint
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        [Required]
        public Guid FlightId { get; set; }
        public Flight Flight { get; set; } = null!;

        [Required]
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public ComplaintStatus Status { get; set; } = ComplaintStatus.Submitted;

        [MaxLength(1000)]
        public string? AdditionalInfo { get; set; }

        public ICollection<Document> Documents { get; set; } = new List<Document>();
    }
}
