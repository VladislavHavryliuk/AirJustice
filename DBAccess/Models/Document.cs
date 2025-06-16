using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DBAccess.Models
{
    public class Document
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid ComplaintId { get; set; }
        public Complaint Complaint { get; set; } = null!;

        [Required, MaxLength(255)]
        public string FileName { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string ContentType { get; set; } = string.Empty;

        [Required]
        public byte[] FileData { get; set; } = Array.Empty<byte>();

        [Required]
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }
}
